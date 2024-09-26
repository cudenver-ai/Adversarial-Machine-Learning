# Development Server Setup Guide

This guide covers the setup and workflow for developing the application in a local environment. Since a shell script is provided, most manual setup steps are now automated. This guide highlights what you may still need to adjust or monitor.

## Table of Contents

- Prerequisites
- Setup Instructions
  1. Clone the Repository
  2. Running the Setup Script
  3. Configuration Adjustments (Optional)
- Running the Application
  - Back-End Server
  - Front-End Client
- Switching Environments
- Workflow Summary
- Additional Notes
- Resources

## Prerequisites

- Python 3.7 or higher
- Node.js and npm
- Virtual Environment (optional but recommended)
- Git

## Setup Instructions

### 1. Clone the Repository

git clone https://your-repo-url.git
cd your-repo-name

2. Running the Setup Script

Run the provided shell script to set up the back-end, front-end, and install necessary dependencies:

bash

./setup.sh  # Ensure you have execution permissions, use chmod +x setup.sh if necessary

The script will handle:

    Creating and activating a Python virtual environment.
    Installing Python dependencies (requirements.txt).
    Installing Node.js dependencies (npm install).
    Starting the servers for both the back-end and front-end.

3. Configuration Adjustments (Optional)

If you need to make any specific adjustments to the development environment, you can still manually modify these files:

    Back-End:
        .flaskenv: Ensure the following settings are correct for your environment.

    ini

FLASK_APP=app.py
FLASK_DEBUG=1
FLASK_RUN_HOST=0.0.0.0
FLASK_RUN_PORT=5000

Front-End:

    .env.dev: Set the correct API base URL and proxy target.

ini

    VITE_API_BASE_URL=http://localhost:5000
    VITE_PROXY_TARGET=http://localhost:5000

Running the Application
Back-End Server

If the script did not automatically start the back-end server, you can do so manually:

bash

source venv/bin/activate  # On Windows: venv\Scripts\activate
flask run

The server will start on http://0.0.0.0:5000.
Front-End Client

To start the front-end development server:

bash

npm run dev

The application will be accessible at http://localhost:5173 or http://your-local-ip:5173.
Switching Environments

If you work from multiple locations (e.g., home and lab), adjust the configurations:

    In .env.dev, modify the API base URL and proxy target as needed:

ini

# For Home
VITE_API_BASE_URL=http://home-ip:5000
VITE_PROXY_TARGET=http://home-ip:5000

# For Lab
# VITE_API_BASE_URL=http://lab-ip:5000
# VITE_PROXY_TARGET=http://lab-ip:5000

In config.py, update CORS origins to accommodate the different environments:

python

class DevelopmentConfig(Config):
    DEBUG = True
    CORS_ORIGINS = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://your-local-ip:5173",
    ]

Workflow Summary

    Back-End:
        Use the shell script to automate setup and starting the server.
        If needed, run flask run manually.

    Front-End:
        Ensure .env.dev has the correct API URLs.
        Run npm run dev.

    Access the Application:
        Open http://localhost:5173 or http://your-local-ip:5173 in your browser.

Additional Notes

    No Need to Build:
        In development, you do not need to build the front-end.
        Hot reloading is enabled for rapid iteration.

    Debugging:
        Both front-end and back-end have debug modes enabled.
        Use console logs and error messages to troubleshoot.

    Team Collaboration:
        Keep configurations documented within the files.
        Use comments to indicate how to switch between settings.

Resources

    Flask Documentation
    Vite Documentation
    React Documentation