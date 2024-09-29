import torch
import torchvision
import numpy as np

def load_cifar10_test_data(samples_per_class=100):
    """
    Load the CIFAR-10 test set and select `samples_per_class` samples from each class.
    
    :param samples_per_class: Number of samples to select from each class (default is 100)
    :return: PyTorch tensors for the filtered test images and labels
    """
    
    # Load CIFAR-10 test dataset without any transformation
    testset = torchvision.datasets.CIFAR10(
        root='./data', train=False, download=True, transform=None
    )
    
    # Extract images and labels
    test_data = testset.data
    test_labels = np.array(testset.targets)
    
    # List to hold selected samples and labels
    selected_images = []
    selected_labels = []
    
    # Iterate over all classes (CIFAR-10 has 10 classes, indexed 0-9)
    for class_label in range(10):
        # Find the indices of all samples that belong to this class
        class_indices = np.where(test_labels == class_label)[0]
        
        # Randomly select `samples_per_class` samples from this class
        selected_class_indices = np.random.choice(class_indices, samples_per_class, replace=False)
        
        # Collect the selected images and labels
        selected_images.append(test_data[selected_class_indices])
        selected_labels.append(test_labels[selected_class_indices])
    
    # Convert the selected data into arrays
    selected_images = np.concatenate(selected_images, axis=0)
    selected_labels = np.concatenate(selected_labels, axis=0)
    
    # Convert images and labels to PyTorch tensors
    images_tensor = torch.tensor(selected_images).permute(0, 3, 1, 2).float()  # (1000, 3, 32, 32)
    labels_tensor = torch.tensor(selected_labels).long()  # (1000,)
    
    return images_tensor, labels_tensor

# Load 100 samples per class from CIFAR-10 test data
images_tensor, labels_tensor = load_cifar10_test_data(samples_per_class=100)

# Save the tensors as a single file using torch.save
torch.save({'images': images_tensor, 'labels': labels_tensor}, 'cifar10_test_100_per_class.pt')

print("Saved CIFAR-10 test samples (100 per class) as 'cifar10_test_100_per_class.pt'")

