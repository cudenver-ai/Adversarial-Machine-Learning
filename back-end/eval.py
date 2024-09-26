from werkzeug.utils import secure_filename
import json
import os
import logging
from skimage.metrics import structural_similarity as ssim
import torch
import torch.nn.functional as F
from robustbench.data import load_cifar10
from robustbench.utils import load_model
import foolbox as fb
import torch
import pickle
import os
import numpy as np


device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s %(levelname)s %(message)s",
    handlers=[
        logging.FileHandler("app.log"),
        logging.StreamHandler(),
    ],
)


def calculate_score(
    model,
    x_test,
    advs,
    y_test,
    alpha=0.1667,
    beta=0.1667,
    gamma=0.3,
    delta=0.2,
    epsilon=0.1667,
):
    # Pass the perturbed images through the model to get the logits
    with torch.no_grad():
        logits_adv = model(advs.to(device))
        logits_orig = model(x_test.to(device))

    # Get the predicted labels for the perturbed images
    predicted_labels_adv = torch.argmax(logits_adv, dim=1)

    # Find misclassified examples
    misclassified_indices = (predicted_labels_adv != y_test).nonzero(as_tuple=True)[0]

    # Number of incorrectly classified samples (normalized between 0 and 1)
    incorrect_ratio = len(misclassified_indices) / len(y_test)

    # Confidence of incorrect predictions (Softmax output is already between 0 and 1)
    softmax_logits_adv = F.softmax(logits_adv, dim=1)
    incorrect_confidences = softmax_logits_adv[
        misclassified_indices, predicted_labels_adv[misclassified_indices]
    ]
    avg_confidence_incorrect = incorrect_confidences.mean().item()

    # Calculate L2 norm of the perturbations and normalize it
    perturbations = (advs - x_test).view(advs.size(0), -1)
    l2_norms = torch.norm(perturbations, dim=1)
    avg_l2_perturbation = l2_norms[misclassified_indices].mean().item()

    # Calculate the maximum possible L2 perturbation for normalization
    max_perturbation = torch.norm(torch.ones_like(x_test[0]).view(-1)).item()

    # Calculate SSIM and use it as is (SSIM is already between 0 and 1)
    def compute_avg_ssim(original_images, perturbed_images):
        avg_ssim = 0
        for i in range(len(original_images)):
            original = original_images[i].permute(1, 2, 0).cpu().numpy()
            perturbed = perturbed_images[i].permute(1, 2, 0).cpu().numpy()

            smaller_dim = min(original.shape[0], original.shape[1])
            win_size = smaller_dim if smaller_dim % 2 != 0 else smaller_dim - 1
            data_range = 1.0  # Since images are normalized between 0 and 1
            ssim_val, _ = ssim(
                original,
                perturbed,
                win_size=win_size,
                channel_axis=2,
                data_range=data_range,
                full=True,
            )
            avg_ssim += ssim_val
        return avg_ssim / len(original_images)

    avg_ssim = compute_avg_ssim(
        x_test[misclassified_indices], advs[misclassified_indices]
    )

    # Confidence gap between original and perturbed predictions
    softmax_logits_orig = F.softmax(logits_orig, dim=1)
    confidence_correct_orig = softmax_logits_orig[range(len(x_test)), y_test]
    confidence_correct_orig = confidence_correct_orig[misclassified_indices]
    confidence_gap = confidence_correct_orig - incorrect_confidences
    avg_confidence_gap = confidence_gap.mean().item()

    # Final score calculation with normalized metrics
    score = (
        alpha * incorrect_ratio
        + beta
        * avg_confidence_incorrect  # No normalization needed, softmax is already in [0,1]
        + gamma * (1 - avg_l2_perturbation / max_perturbation)  # Normalized L2
        + delta * (1 - avg_ssim)  # SSIM is already between 0 and 1
        + epsilon * avg_confidence_gap
    )  # Confidence gap normalized to [0,1]

    return {
        "incorrect_ratio": round(float(incorrect_ratio), 4),
        "avg_confidence_incorrect": round(float(avg_confidence_incorrect), 4),
        "avg_l2_perturbation": round(float(avg_l2_perturbation), 4),
        "avg_ssim": round(float(avg_ssim), 4),
        "avg_confidence_gap": round(float(avg_confidence_gap), 4),
        "score": round(float(score), 4),
    }


def main():
    # Example usage:
    # file_path = os.path.join('challenge', 'advs.pkl')
    # import pdb; pdb.set_trace()
    current_directory = os.getcwd()
    dir_path = os.path.join(current_directory, "Uploads")
    for folder_name in os.listdir(dir_path):

        for name in os.listdir(os.path.join(dir_path, folder_name)):
            path_name = os.path.join(dir_path, folder_name, name)

            if name.endswith(".pkl"):
                with open(path_name, "rb") as f:
                    advs = pickle.load(f)

            if name.endswith(".txt"):
                with open(path_name, "r") as f:
                    tmp = f.readlines()
                    team_name = tmp[1].strip()
                    time_stamp = tmp[0].strip()

        x_test, y_test = load_cifar10(n_examples=200)
        model = load_model(
            model_name="Kireev2021Effectiveness_RLATAugMix",
            dataset="cifar10",
            threat_model="corruptions",
        )

        # Check if GPU is available and set the device accordingly
        # device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        print(f"Using device: {device}")

        model = model.to(device)
        x_test = x_test.to(device)
        y_test = y_test.to(device)

        score_metrics = calculate_score(model, x_test, advs[0], y_test)
        score_metrics["team_name"] = team_name
        score_metrics["time_stamp"] = time_stamp

        submission_json = os.path.join(current_directory, "Data", "allSubmisisons.json")
        # breakpoint()
        with open(submission_json, "r") as f:
            data = json.load(f)
            #  breakpoint()
            data.append(score_metrics)

        with open(submission_json, "w") as f:
            json.dump(data, f, indent=4)


if __name__ == "__main__":
    main()
