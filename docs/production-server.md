# Production Server Deployment Guide

This guide covers the setup and deployment of the application in a production environment. It provides steps to configure the server, set up Gunicorn and Nginx, and ensure the application runs reliably.

## Table of Contents

- Prerequisites
- Server Setup
    1. Install Required Software
    2. Clone the Repository
- Back-End Setup
    1. Virtual Environment
    2. Install Dependencies
    3. Update Configuration Files
- Front-End Setup
    1. Install Dependencies
    2. Build the Front-End
- Gunicorn Setup
    1. Test Gunicorn Manually
    2. Configure systemd Service
- Nginx Configuration
    1. Install Nginx
    2. Configure Nginx Server Block
    3. Restart Nginx
- Firewall Configuration
- Ensuring Reliability
- Requesting a DNS Entry
- Workflow Summary
- Additional Notes
- Resources

## Prerequisites

- Ubuntu Server
- Static Private IP Address
- Access to Server via SSH
- User with sudo privileges

### Server Setup
##### 1. Install Required Software

Update the server and install necessary software packages.
``` bash
sudo apt update
sudo apt install python3 python3-venv python3-pip nginx git
``` 

##### 2. Clone the Repository

- Navigate to the desired directory and clone your application repository.

```bash
git clone https://github.com/cudenver-ai/Adversarial-Machine-Learning
cd Adversarial-Machine-Learning
```
### Back-End Setup
##### 1. Set Up Virtual Environment

- Create and activate a Python virtual environment.

``` bash
    python3 -m venv venv
    source venv/bin/activate
```

##### 2. Install Dependencies

- Install the Python dependencies for the project.
``` bash
pip install -r requirements.txt
```

##### 3. Update Configuration Files

- a. config.py

Ensure ProductionConfig includes the correct settings for your production environment.

``` python

class ProductionConfig(Config):
    DEBUG = False
    CORS_ORIGINS = [
        "http://10.18.22.224",
        "http://dns-name", # if we can get one 
    ]
```

- b. .flaskenv

For production, disable debug mode by setting:

``` ini

FLASK_APP=app.py
FLASK_DEBUG=0
FLASK_RUN_HOST=0.0.0.0
FLASK_RUN_PORT=5000

```

- c. app.py

Ensure the application loads the ProductionConfig when not in debug mode.

### Front-End Setup
##### 1. Install Dependencies

- Navigate to the front-end directory and install Node.js dependencies.

``` bash
cd ../front-end
npm install
```

##### 2. Build the Front-End

- Build the front-end static files.

``` bash
npm run build
```

- The build files will be placed in front-end/dist.

### Gunicorn Setup
##### 1. Test Gunicorn Manually

- Test Gunicorn by starting the application with 4 worker processes.


``` bash
cd ../back-end
source venv/bin/activate
gunicorn -w 4 -b 127.0.0.1:8000 app:app
```

##### 2. Configure systemd Service

- Create a systemd service file to run Gunicorn as a background service.

``` bash
sudo nano /etc/systemd/system/myapp.service
```

Add the following configuration:

``` ini

[Unit]
Description=Gunicorn instance to serve my Flask application
After=network.target
[Service]
User=vicente
Group=www-data
WorkingDirectory=/home/vicente/Challenge/Adversarial-Machine-Learning/back-end
Environment="PATH=/home/vicente/Challenge/Adversarial-Machine-Learning/back-end/venv/bin"
ExecStart=/home/vicente/Challenge/Adversarial-Machine-Learning/back-end/venv/bin/gunicorn -w 4 -b 127.0.0.1:8000 app:app

[Install]
WantedBy=multi-user.target
```

- Enable and start the service:

``` bash
sudo systemctl daemon-reload
sudo systemctl enable myapp
sudo systemctl start myapp
sudo systemctl status myapp
```

### Nginx Configuration
##### 1. Install Nginx

    - Install the Nginx web server.
    - sudo apt install nginx

##### 2. Configure Nginx Server Block

- Create a new server block configuration for Nginx.

``` bash
sudo nano /etc/nginx/sites-available/myapp
```

Add the following content:

``` bash
server {
    listen 80;
    server_name 10.18.22.224; 

    root /home/vicente/Challenge/Adversarial-Machine-Learning/front-end/dist;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
``` 

##### 3. Enable Nginx Configuration and Restart

- Enable the new configuration and restart Nginx:


``` bash
sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled
sudo nginx -t
sudo systemctl restart nginx
```

### Firewall Configuration

Allow traffic for HTTP and HTTPS via the firewall.

``` bash
sudo ufw allow 'Nginx Full'
sudo ufw status
``` 

### Ensuring Reliability

- Using systemd: Ensures that Gunicorn automatically restarts if it fails.

- Monitor Logs:

    - `journalctl -u myapp`
    - `sudo tail -f /var/log/nginx/access.log /var/log/nginx/error.log`

- Security Updates: Regularly update the server to keep it secure.

### Workflow Summary

- Back-End:
    - Set up virtual environment and install dependencies.
    - Configure app.py, config.py, and .flaskenv.
    - Set up Gunicorn and systemd service.

- Front-End:
    - Install dependencies.
    - Build static files with npm run build.

- Nginx:
    - Install and configure Nginx to serve the front-end and proxy the back-end.
    - Restart Nginx.

- Firewall:
    - Configure firewall to allow HTTP traffic.

- Testing:
    - Access the application via the server’s IP or DNS.
    - Ensure both front-end and back-end are functioning.

### Additional Notes

- SSL/TLS:
    - For HTTPS, obtain SSL certificates (e.g., using Let's Encrypt).
    - Update the Nginx configuration accordingly.

- Team Collaboration:
    - Document any changes made during deployment.
    - Share configuration details with team members.

- Maintenance:
    - Regularly check logs and monitor the application's performance.
