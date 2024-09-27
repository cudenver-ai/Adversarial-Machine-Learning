# Server Setup and Architecture Overview

This document provides an overview of how the back-end server and front-end client interact in both development and production environments. It outlines the architecture and workflow, pointing you to detailed setup guides for each environment.

## Table of Contents

1. Architecture Overview
2. Development Environment
3. Production Environment
4. Explanation of Development vs. Production Servers
5. Additional Resources

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
### Explanation of Development vs. Production Servers
#### Development: Flask Development Server (port 5000)

When you run Flask directly using the command `flask run`, it defaults to port 5000. This is useful for `development` purposes but should not be used in production as it lacks optimizations for performance and security.

Example:

```bash
flask run
```

This serves the Flask app at `http://127.0.0.1:5000` (or `0.0.0.0:5000` if configured to allow external connections).

#### Production: Gunicorn WSGI Server (port 8000)

Gunicorn is a production-grade WSGI server, designed for handling high traffic and running multiple worker processes. It is commonly used to serve Flask applications in production environments.

Example:

```bash
gunicorn -w 50 -b 0.0.0.0:8000 app:app
```
This starts the Flask app on Gunicorn at `http://0.0.0.0:8000`, using 50 worker processes for better concurrency.
#### Why Different Ports?

- **Development (flask run)**: Uses port 5000 and is designed for ease of development, not performance or security.
- **Production (gunicorn)**: Uses port 8000 or another configurable port and can handle much higher loads with multiple worker processes.

#### Gunicorn with Nginx for Production

In production, it’s common to have **Nginx** running on port 80 (HTTP) or port 443 (HTTPS). Nginx serves static files (like CSS, JavaScript, images) and acts as a **reverse proxy** to pass API requests to Gunicorn running the Flask application.

Example Flow:

1. **Client request**: A client makes a request to `http://10.18.22.224` (your server IP) on port 80.
2. **Nginx**: Nginx forwards requests to Gunicorn on port 8000 (for API requests) while serving static files directly.
3. **Gunicorn**: Gunicorn processes the Flask application and returns the response to Nginx.
4. **Nginx to Client**: Nginx sends the response back to the client.

#### Important Points:

- **Nginx runs on port 80** (or 443 for HTTPS).
- **Gunicorn runs on port 8000** (or a different configurable port).
- **Flask development server runs on port 5000**, but should not be used in production.

#### In Summary:

- **Development Mode**: Use `flask run` (typically on port 5000).
- **Production Mode**: Use Gunicorn (typically on port 8000) behind Nginx (on port 80 or 443).

## Additional Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [Vite Documentation](https://vitejs.dev/)
- [Gunicorn Documentation](https://docs.gunicorn.org/)
- [Nginx Documentation](https://nginx.org/)
