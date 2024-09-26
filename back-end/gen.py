from robustbench.utils import clean_accuracy
from robustbench.data import load_cifar10
from robustbench.utils import load_model
import foolbox as fb
import torch
import pickle
import os


x_test, y_test = load_cifar10(n_examples=200)
# model = load_model(model_name='Bai2024MixedNUTS')

model = load_model(
    model_name="Kireev2021Effectiveness_RLATAugMix",
    dataset="cifar10",
    threat_model="corruptions",
)
# model = load_model(model_name='Kireev2021Effectiveness_RLATAugMix')

model_fb = fb.PyTorchModel(model, bounds=(0, 1))


# Check if GPU is available and set the device accordingly
if torch.cuda.is_available():
    device = torch.device("cuda")
    print("Using GPU:", torch.cuda.get_device_name(0))
else:
    device = torch.device("cpu")
    print("Using CPU")

model = model.to(device)
x_test = x_test.to(device)
y_test = y_test.to(device)

# !PYTORCH_CUDA_ALLOC_CONF=expandable_segments

_, advs, success = fb.attacks.LinfPGD(rel_stepsize=0.1, steps=20)(
    model_fb, x_test, y_test, epsilons=[8 / 255]
)
# _, advs, success = fb.attacks.LinfPGD(rel_stepsize=0.1, steps=20)(model_fb, x_test, y_test, epsilons=[8/255])

print("Robust accuracy: {:.1%}".format(1 - success.float().mean()))
print(clean_accuracy(model, x_test, y_test))


# Assuming 'advs' is the array of adversarial examples from your code.
# Create the 'challenge' directory if it doesn't exist
os.makedirs("challenge", exist_ok=True)

# Path to save the adversarial examples
file_path = os.path.join("challenge", "advs.pkl")

# Save the 'advs' object
with open(file_path, "wb") as f:
    pickle.dump(advs, f)
