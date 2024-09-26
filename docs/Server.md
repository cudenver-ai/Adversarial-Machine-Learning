# Server Setup and Architecture Overview

This document provides an overview of how the back-end server and front-end client interact in both development and production environments. It outlines the architecture and workflow, pointing you to detailed setup guides for each environment.

## Table of Contents

1. Architecture Overview
2. Development Environment
3. Production Environment
4. Additional Resources

---

## Architecture Overview

Our application consists of the following components:

- **Back-End Server**: A Flask application that provides APIs.
- **Front-End Client**: A React application built with Vite.

### Communication Flow:

- The front-end sends HTTP requests to the back-end APIs.
- In development, the front-end proxies API requests to the back-end.
- In production, the front-end is served as static files, with the back-end APIs accessed directly.

### Environments:

- **Development**: Optimized for testing and debugging during development.
- **Production**: Deployed on a server, optimized for end-users.

---

## Development Environment

In the development environment:

### Back-End:

- Run using `flask run`.
- Configured for fast iteration and debugging.

### Front-End:

- Run using `npm run dev`.
- Uses Vite's development server.
- No need to build static files.

### Workflow:

1. Start the back-end server using `flask run`.
2. Start the front-end using `npm run dev`.
3. Access the application via the front-end URL (e.g., `http://localhost:5173`).

For detailed setup instructions, refer to the **development-server.md** guide.

---

## Production Environment

In the production environment:

### Back-End:

- Run using Gunicorn, a WSGI server for Flask.
- Managed by `systemd` for process reliability and automatic restarts.

### Front-End:

- Built into static files using `npm run build`.
- Served by Nginx to deliver static content and proxy API requests to the back-end.

### Workflow:

1. Build the front-end static files with `npm run build`.
2. Set up Gunicorn to run the back-end application.
3. Configure Nginx to serve the front-end and proxy API requests to the back-end.
4. Start and manage services (Gunicorn, Nginx) using `systemd` to ensure reliable operation.

For detailed setup instructions, refer to the **production-server.md** guide.

---

## Additional Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [Vite Documentation](https://vitejs.dev/)
- [Gunicorn Documentation](https://docs.gunicorn.org/)
- [Nginx Documentation](https://nginx.org/)
