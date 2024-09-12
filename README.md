# Adversarial Machine Learning challenge for the 5th Data Science and AI Symposium

## Before Contributing to This Project:

### Branching Strategy:

- Always create a separate branch for your changes.
- Never push your changes directly to the main branch.- Pull Requests:
- All changes must go through a pull request.
- Pull requests must be reviewed and approved before merging.
- Feel free to ask questions or seek clarification if needed.

### Prerequisites:

- Python: Version 3.10 or higher.
- Node.js / npm: You can install this via nvm (Node Version Manager) for better version control. You will need Node.js version 20 or higher
- nvm: Highly recommend you install nvm to manage your Node.js versions efficiently.

#### Create a Virtual Environment

**Python Virtual Environment**
- python -m venv .venv
- Activate it
  - Windows: .venv\Scripts\activate
  - Linux: source .venv/bin/activate

Alternatively, if you use Conda to manage your environments:

**Conda**
- conda create -n Adversarial-Machine-Learning python=3.10
- Activate it:
  - conda activate Adversarial-Machine-Learning

#### Install Python Dependencies:

- pip install -r requirements.txt
- As you install packages please add them to the requirements.txt

#### Install Node.js / npm Dependencies:

If you don't already have Node.js installed, follow [these instructions](https://nodejs.org/en/download/package-manager) to install.

- nvm use node (get the latest version of Node.js)
- npm --prefix ./amlchallenge install ./amlchallenge

#### Build the Project

Before running the app, you need to build the front end using Remix

- npm run build

#### Running the Application

Back-End:
Make sure the backend (Flask) is running on a separate port (I have it set to port 5000):

- python ./app/app.py

Front-End:
Start the Remix front end

- npm --prefix ./amlchallenge start

The Flask API will be available at http://<ip>:5000/
The Remix front end will be available at http://<ip>:3000/ or whatever port you specified

#### Project Structure (So far):

    /app: Contains the Flask backend code.
    /amlchallenge: Contains the Remix frontend code.
    amlchallenge/build: Build output for the Remix app.
    /app/uploads: This is where the uploaded files will be stored.
