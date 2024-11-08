import json
import os
import logging
from datetime import datetime
import shutil
import pickle
import torch
import torch.nn.functional as F
from robustbench.utils import load_model
from skimage.metrics import structural_similarity as ssim
from datetime import datetime
from pathlib import Path
from utils.utils import update_visit

update_visit((Path.cwd()).parent)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

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
        + delta * (avg_ssim)  # SSIM is already between 0 and 1
        + epsilon * avg_confidence_gap
    )  # Confidence gap normalized to [0,1]

    print(f"Incorrect ratio: {incorrect_ratio:.4f}")
    print(f"Avg confidence of incorrect predictions: {avg_confidence_incorrect:.4f}")
    print(f"Avg L2 perturbation: {avg_l2_perturbation:.4f}")
    print(f"Avg SSIM: {avg_ssim:.4f}")
    print(f"Avg confidence gap: {avg_confidence_gap:.4f}")
    print(f"Score: {score:.4f}")

    return {
        "incorrect_ratio": round(float(incorrect_ratio), 4),
        "avg_confidence_incorrect": round(float(avg_confidence_incorrect), 4),
        "avg_l2_perturbation": round(float(avg_l2_perturbation), 4),
        "avg_ssim": round(float(avg_ssim), 4),
        "avg_confidence_gap": round(float(avg_confidence_gap), 4),
        "score": round(float(score), 4),
    }


# uploads_dir = "/home/vicente/dec/Adversarial-Machine-Learning/back-end/Uploads"


def evaluate():
    # Get current directory
    path = (Path.cwd()).parent
    start_time = datetime.now()
    logging.info("Starting evaluation script")
    logging.info(f"Evaluation started at: {start_time}")
    # current_directory = os.getcwd()

    # Check if 'Uploads' directory exists and is not empty
    uploads_dir = os.path.join(path, "Uploads")
    if not os.path.exists(uploads_dir):
        logging.warning("Uploads directory does not exist.")
        os.makedirs(uploads_dir, exist_ok=True)
        logging.info(f"Created Uploads directory at: {uploads_dir}")
        return False

    if len(os.listdir(uploads_dir)) == 0:
        logging.info("Uploads directory is empty. Skipping evaluation.")
        return False

    logging.info(
        f"Starting evaluation. Files found in Uploads: {os.listdir(uploads_dir)}"
    )

    # Create the 'evaluated' directory if it doesn't exist
    evaluated_dir = os.path.join(path, "evaluated")
    if not os.path.exists(evaluated_dir):
        logging.warning("Evaluated directory does not exist.")
        os.makedirs(evaluated_dir, exist_ok=True)
        logging.info(f"Created 'evaluated' directory at: {evaluated_dir}")

    # Create a timestamped folder inside 'evaluated'
    timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    timestamped_folder = os.path.join(evaluated_dir, timestamp)
    os.makedirs(timestamped_folder, exist_ok=True)
    logging.info(f"Created timestamped folder: {timestamped_folder}")

    # Move all folders from 'Uploads' to the timestamped folder
    # uploads_dir = os.path.join(current_directory, "Uploads")

    for folder_name in os.listdir(uploads_dir):
        src_folder = os.path.join(uploads_dir, folder_name)
        dest_folder = os.path.join(timestamped_folder, folder_name)
        shutil.move(src_folder, dest_folder)
        logging.info(f"Moved folder from {src_folder} to {dest_folder}")

    logging.info(f"Finished Moving folders")

    # Now process the folders in the timestamped folder

    for folder_name in os.listdir(timestamped_folder):
        folder_path = os.path.join(timestamped_folder, folder_name)

        try:
            logging.info(f"Processing folder: {folder_name}")
            team_name = ""
            time_stamp = ""

            for name in os.listdir(folder_path):
                path_name = os.path.join(folder_path, name)

                if name.endswith(".pkl"):
                    with open(path_name, "rb") as f:
                        advs = pickle.load(f)
                    logging.info(f"Loaded adversarial examples from {path_name}")

                if name.endswith(".txt"):
                    with open(path_name, "r") as f:
                        tmp = f.readlines()
                        time_stamp = tmp[0].strip()
                        team_name = tmp[1].strip()
                    logging.info(
                        f"Loaded team name: {team_name}, time stamp: {time_stamp} from {path_name}"
                    )

            # Load CIFAR-10 data

            cifar_data = torch.load(f"{path}cifar10_test_100_per_class.pt")
            x_test = cifar_data["images"] / 255.0
            y_test = cifar_data["labels"]
            logging.info("Loaded CIFAR-10 test data.")

            # Load the model
            model = load_model(
                model_name="Kireev2021Effectiveness_RLATAugMix",
                dataset="cifar10",
                threat_model="corruptions",
            )
            model = model.to(device)
            x_test = x_test.to(device)
            y_test = y_test.to(device)
            logging.info(f"Model loaded and moved to device: {device}\n")

            logging.info("Checking the Shape of the Upload!")

            # Evaluate and calculate the score
            if not isinstance(advs[0], torch.Tensor):
                logging.info(f"Not a PyTorch Tensor: {advs[0].shape}")
                continue

            # Checks if the shape is not the expected [1000, 3, 32, 32]
            if list(advs[0].shape) != [1000, 3, 32, 32]:
                logging.info(f"Submission shape does not match: {advs[0].shape}")
                continue

            score_metrics = calculate_score(model, x_test, advs[0], y_test)
            score_metrics["team_name"] = team_name
            score_metrics["time_stamp"] = time_stamp
            logging.info(f"Score calculated for team: {team_name}")

            # Append the results to the JSON file
            submission_json = os.path.join(path, "Data/allSubmissions.json")

            with open(submission_json, "r") as f:
                data = json.load(f)
                # data.append could also be placed outside this with open block (I think)
                data.append(score_metrics)
                logging.info(f"Loaded existing submission data from {submission_json}")

            with open(submission_json, "w") as f:
                json.dump(data, f, indent=4)
                logging.info(f"Updated submission data saved to {submission_json}")

        except Exception as e:
            logging.error(
                f"Error processing folder {folder_name}: {str(e)}", exc_info=True
            )

    end_time = datetime.now()
    logging.info(f"Evaluation ended at: {end_time}")

    duration = end_time - start_time
    logging.info(f"Evaluation ran for: {duration}")

    return True


# Not needed


def reEvaluate():
    # Get current directory
    path = "C:/Users/Elyas/OneDrive - The University of Colorado Denver/Desktop/AI_Club/Adversarial-Machine-Learning/back-end/"
    start_time = datetime.now()
    logging.info("Starting re-evaluation script")
    logging.info(f"Re-evaluation started at: {start_time}")

    # Check if 'evaluated' directory exists and is not empty
    uploads_dir = os.path.join(path, "evaluated")
    if not os.path.exists(uploads_dir):
        logging.warning("evaluated directory does not exist.")
        os.makedirs(uploads_dir, exist_ok=True)
        logging.info(f"Created evaluated directory at: {uploads_dir}")
        return False

    if len(os.listdir(uploads_dir)) == 0:
        logging.info("Re-evaluated directory is empty. Skipping re-evaluation.")
        return False

    logging.info(
        f"Starting re-evaluation. Files found in evaluated: {os.listdir(uploads_dir)}"
    )

    for timestamped_folder_name in os.listdir(uploads_dir):
        timestamped_folder = os.path.join(uploads_dir, timestamped_folder_name)
        for folder_name in os.listdir(timestamped_folder):
            folder_path = os.path.join(timestamped_folder, folder_name)

            try:
                logging.info(f"Processing folder: {folder_name}")
                team_name = ""
                time_stamp = ""

                for name in os.listdir(folder_path):
                    path_name = os.path.join(folder_path, name)

                    if name.endswith(".pkl"):
                        with open(path_name, "rb") as f:
                            advs = pickle.load(f)
                        logging.info(f"Loaded adversarial examples from {path_name}")

                    if name.endswith(".txt"):
                        with open(path_name, "r") as f:
                            tmp = f.readlines()
                            time_stamp = tmp[0].strip()
                            team_name = tmp[1].strip()
                        logging.info(
                            f"Loaded team name: {team_name}, time stamp: {time_stamp} from {path_name}"
                        )

                # Load CIFAR-10 data

                cifar_data = torch.load(f"{path}cifar10_test_100_per_class.pt")
                x_test = cifar_data["images"] / 255.0
                y_test = cifar_data["labels"]
                logging.info("Loaded CIFAR-10 test data.")

                # Load the model
                model = load_model(
                    model_name="Kireev2021Effectiveness_RLATAugMix",
                    dataset="cifar10",
                    threat_model="corruptions",
                )
                model = model.to(device)
                x_test = x_test.to(device)
                y_test = y_test.to(device)
                logging.info(f"Model loaded and moved to device: {device}")

                # Evaluate and calculate the score
                if not isinstance(advs[0], torch.Tensor):
                    logging.info(f"Submission shape: {advs[0].shape}")
                    continue
                if list(advs[0].shape) != [1000, 3, 32, 32]:
                    logging.info(f"Submission shape does not match: {advs[0].shape}")
                    continue

                score_metrics = calculate_score(model, x_test, advs[0], y_test)
                score_metrics["team_name"] = team_name
                score_metrics["time_stamp"] = time_stamp
                logging.info(f"Score calculated for team: {team_name}")

                # Append the results to the JSON file
                submission_json = os.path.join(
                    path, "Data/reevaluatedSubmissions2.json"
                )

                with open(submission_json, "r") as f:
                    data = json.load(f)
                    # data.append could also be placed outside this with open block (I think)
                    data.append(score_metrics)
                    logging.info(
                        f"Loaded existing submission data from {submission_json}"
                    )

                with open(submission_json, "w") as f:
                    json.dump(data, f, indent=4)
                    logging.info(f"Updated submission data saved to {submission_json}")

            except Exception as e:
                logging.error(
                    f"Error processing folder {folder_name}: {str(e)}", exc_info=True
                )

    end_time = datetime.now()
    logging.info(f"Evaluation ended at: {end_time}")

    duration = end_time - start_time
    logging.info(f"Evaluation ran for: {duration}")

    return True
