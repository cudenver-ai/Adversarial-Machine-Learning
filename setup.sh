#!/bin/bash

echo "Starting project setup..."

# Load nvm
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

# 1. Check if nvm is installed
if command -v nvm >/dev/null 2>&1; then
    echo "Setting Node.js version to 22..."
    nvm install 22
    nvm use 22
else
    echo "nvm is not installed. Please ensure Node.js version 22 is installed and in use."
fi

# Verify Node.js version
NODE_VERSION=$(node -v)
echo "Current Node.js version: $NODE_VERSION"

# 2. Install root npm dependencies
echo "Installing root npm dependencies..."
npm install

# 3. Set up Husky and lint-staged
echo "Setting up Husky and lint-staged..."
npx husky install
npx husky set .husky/pre-commit "npx lint-staged"

# 4. Install front-end npm dependencies
echo "Installing front-end npm dependencies..."
cd front-end
npm install
cd ..

# 5. Create Python virtual environment using venv
#  always use python or python3 depending on your setup
echo "Setting up Python virtual environment..."
python3 -m venv .venv

# 6. Activate the virtual environment and install Python dependencies
echo "Activating virtual environment and installing Python dependencies..."
if [[ -d ".venv/bin" ]]; then
    # Unix/Linux virtual environment
    source .venv/bin/activate
elif [[ -d ".venv/Scripts" ]]; then
    # Windows virtual environment
    source .venv/Scripts/activate
else
    echo "Error: Could not find virtual environment activation script."
    exit 1
fi

# Install Python dependencies
pip install -r requirements.txt

# Deactivate virtual environment
deactivate
echo "Virtual environment deactivated."


# Anaconda Setup
# Uncomment the following lines if you prefer to use Anaconda for the Python environment

# echo "Creating Anaconda environment..."
# conda create --name decoychallenge python=3.10 -y

# echo "Activating Anaconda environment..."
# source ~/anaconda3/etc/profile.d/conda.sh
# conda activate decoychallenge

# echo "Installing Python dependencies in Anaconda environment..."
# pip install -r requirements.txt

# echo "Deactivating Anaconda environment..."
# conda deactivate

echo "Setup complete!"
echo "Please activate the virtual environment before running the back-end:"
echo "Unix/Linux: source .venv/bin/activate"
echo "Windows:   source .venv/Scripts/activate"
echo "To deactivate, simply run: deactivate"
