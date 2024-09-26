# Adversarial Machine Learning Challenge

Welcome to the **Adversarial Machine Learning Challenge** project! This repository contains the codebase for both the back-end (Flask API) and front-end (React with Vite) applications.

## Table of Contents
- [Before Contributing](#before-contributing)
  - [Branching Strategy](#branching-strategy)
  - [Pull Requests](#pull-requests)
  - [Prerequisites](#prerequisites)
- [Setup and Development](#setup-and-development)
  - [Running the Setup Script](#running-the-setup-script)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Key Files](#key-files)
  - [Front-End](#front-end)
  - [Back-End](#back-end)
- [Additional Resources](#additional-resources)
- [Important Notes](#important-notes)
- [Contact Information](#contact-information)

---

## Before Contributing

### Branching Strategy
- **Create Separate Branches**: Always create a separate branch for your changes.
- **No Direct Push to Main**: Never push your changes directly to the main branch.
- **Branch Naming**: Use descriptive names (e.g., `feature-login-page`, `bugfix-api-endpoint`).

### Pull Requests
- **Mandatory Pull Requests**: All changes must go through a pull request.
- **Review and Approval**: Pull requests must be reviewed and approved by at least one other team member.
- **Communication**: Feel free to ask questions or seek clarification.

### Prerequisites
- **Python**: Version 3.10 or higher.
- **Node.js / npm**: Node.js version 22 or higher.
  Use `nvm` for managing Node.js versions.
- **Git**: For version control.

---

## Setup and Development

### Running the Setup Script

1. **Clone the Repository**:

```bash
git clone https://github.com/cudenver-ai/Adversarial-Machine-Learning
cd Adversarial-Machine-Learning
```

2. **Run the Setup Script**:

You can now set up both the back-end and front-end automatically using the provided `setup.sh` script.

```bash
./setup.sh
```

This script will:
- Set up `nvm` and install Node.js version 22.
- Install front-end and back-end dependencies.
- Create and activate a Python virtual environment.
- Install Python dependencies.

3. **Activate Virtual Environment**:

After running the script, you can activate the virtual environment:

```bash
source .venv/bin/activate  # On Unix/Linux
# Or for Windows:
.venv\Scripts\activate
```

4. **Running Flask and React**:

To start the Flask back-end:

```bash
flask run
```

To start the React front-end:

```bash
cd front-end
npm run dev
```

---

## Deployment

For detailed deployment instructions, refer to `production-server.md`.

---

## Documentation

- **Server Architecture**: See `/docs/Server.md` for an overview.
- **Development Setup**: See `/docs/development-server.md` for detailed instructions.
- **Production Deployment**: See `/docs/production-server.md` for deployment steps.

---

## Key Files

### Front-End
- `src/App.jsx`: Main entry point for the React app.
- `src/config.js`: Contains global variables like `API_BASE_URL`.
- `.env.dev` and `.env.prod`: Environment variable files.
- `package.json`: Front-end dependencies and scripts.
- `vite.config.js`: Vite configuration.

### Back-End
- `app.py`: Main Flask application file.
- `config.py`: Environment-specific configurations.
- `.flaskenv`: Environment variables for Flask.
- `requirements.txt`: Python dependencies.

---

## Additional Resources

- **Python**:
  - [Official Site](https://www.python.org/)
  - [Virtual Environments Guide](https://docs.python.org/3/tutorial/venv.html)
- **Node.js and npm**:
  - [Node.js Official Site](https://nodejs.org/)
  - [npm Documentation](https://docs.npmjs.com/)
  - [nvm GitHub Repository](https://github.com/nvm-sh/nvm)
- **Frameworks and Libraries**:
  - [Flask Documentation](https://flask.palletsprojects.com/en/latest/)
  - [React Documentation](https://reactjs.org/)
  - [Vite Documentation](https://vitejs.dev/)
- **Deployment Tools**:
  - [Gunicorn Documentation](https://gunicorn.org/)
  - [Nginx Documentation](https://www.nginx.com/)
  - [Systemd Service Files](https://www.freedesktop.org/wiki/Software/systemd/)

---

## Important Notes

- **Environment Variables**:
  - Keep sensitive information out of version control.
  - Add `.env*` and `.flaskenv` to your `.gitignore`.

- **Switching Environments**:
  - **Development**:
    - Use `FLASK_DEBUG=1` in `.flaskenv`.
    - Run `npm run dev` for the front-end.
  - **Production**:
    - Set `FLASK_DEBUG=0` or remove it.
    - Build the front-end with `npm run build`.
    - Deploy using Gunicorn and Nginx.

- **Code Formatting**:
  - Prettier is set up to format code on each commit via Husky and lint-staged.
  - Configure your editor to format on save for a better development experience.

- **Team Collaboration**:
  - Document changes and use comments within configuration files to guide team members.
  - Ensure all team members run `npm install` at the root to set up Husky and lint-staged.

- **Testing**:
  - Always test both development and production setups after making changes.

---

By following this README and the accompanying documentation, you should be able to set up, develop, and deploy the application efficiently.