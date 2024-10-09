sudo systemctl start production-server (if needed)
sudo systemctl start nginx (if needed)

sudo systemctl restart production-server
sudo systemctl status production-server

sudo nginx -t
sudo systemctl restart nginx
sudo systemctl status nginx

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
- Workflow Summary
- Additional Notes
- Resources

## Prerequisites

- Ubuntu machine (desktop or server) on a local network
- Local IP address (find using `ifconfig` or `ip a` for Ubuntu)
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
    python3 -m venv .venv
    source .venv/bin/activate
```

##### 2. Install Dependencies

- Install the Python dependencies for the project.
``` bash
pip install -r requirements.txt
```

##### 3. Update Configuration Files

- a. `config.py`

Ensure `ProductionConfig` includes the correct settings for your production environment.

``` python

class ProductionConfig(Config):
    DEBUG = False
    CORS_ORIGINS = [
        "http://10.18.22.224",
        "http://dns-name", # if we can get one 
    ]
```

- b. `.flaskenv`

For production, disable debug mode and configure Flask to bind to all network interfaces (`0.0.0.0`):

``` ini

FLASK_APP=app.py
FLASK_DEBUG=0
FLASK_RUN_HOST=0.0.0.0
FLASK_RUN_PORT=5000

```

- c. `app.py`
Ensure the application loads the ProductionConfig when not in debug mode.

##### 4. Configure Flask Static Files

- Directory Structure: Create the `static/` and `templates/` directories inside the back-end directory.
    - `static/`: This folder will contain your CSS, JS, and image files.
    - `templates/`: This folder will contain your HTML files, including `index.html`.

```bash
mkdir -p back-end/static
mkdir -p back-end/templates
```

- **Move Files**: Move the files to the correct directories:
    - Move `index.html` to the templates/ directory.
    - Move your `logo.svg,` CSS, JS, and other assets to the `static/` directory.

For example:

```bash

mv front-end/dist/index.html back-end/templates/
mv front-end/dist/*.js back-end/static/
mv front-end/dist/*.css back-end/static/
mv front-end/dist/*.svg back-end/static/
```
- **Flask Route Update**: Ensure that your app.py has the correct routing to serve the HTML from the templates directory and static assets from static/:

```python

from flask import Flask, render_template

@app.route('/')
def index():
return render_template('index.html')  # This will render the HTML from templates

# Flask will automatically serve files from /static/
```

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

- The build files will be placed in `front-end/dist`.

#### 3. Move Files to `static` and `templates`

- After building the front-end, move the generated assets from `front-end/dist` into `back-end/static` and `back-end/templates`, as described in **Back-End Setup > Step 4**.

### Gunicorn Setup
##### 1. Test Gunicorn Manually

- To test the back-end with Gunicorn, start the application with 50 worker processes and bind it to all network interfaces (`0.0.0.0`):


``` bash
cd ../back-end
source .venv/bin/activate
gunicorn -w 50 -b 0.0.0.0:8000 app:app
```

##### 2. Configure systemd Service

- Create a systemd service file to run Gunicorn as a background service.

``` bash
sudo gedit /etc/systemd/system/production-server.service
```

Add the following configuration:

``` ini
[Unit]
Description=Gunicorn instance to serve my Flask application
After=network.target

[Service]
User=vicente
Group=www-data
WorkingDirectory=/home/vicente/dec/Adversarial-Machine-Learning/back-end
Environment="PATH=/home/vicente/dec/Adversarial-Machine-Learning/.venv/bin"
ExecStart=/home/vicente/dec/Adversarial-Machine-Learning/.venv/bin/gunicorn -w 40 -b 0.0.0.0:8000 app:app

[Install]
WantedBy=multi-user.target
```

- Enable and start the service:

``` bash
sudo systemctl daemon-reload
sudo systemctl enable production-server
sudo systemctl start production-server
sudo systemctl status production-server
```
OUTPUT
``` bash

```
### Nginx Configuration
##### 1. Install Nginx

Install the Nginx web server.
- `sudo apt install nginx`

##### 2. Configure Nginx Server Block

Create a new server block configuration for Nginx.
I like to use gedit but you can use a built in editor like nano or vim
- `pip install gedit`

``` bash
sudo gedit /etc/nginx/sites-available/production-server
```

Add the following content to support both http and https:
To set up a self-signed certificate look at docs SSL-TLS-Setup.md

``` bash
# HTTPS Server Block
server {
    listen 443 ssl;
    server_name decoychallenge.ucdenver.pvt;

    # SSL Configuration
    include snippets/self-signed.conf;
    include snippets/ssl-params.conf;

    # Logging
    access_log /var/log/nginx/production-server_access.log;
    error_log /var/log/nginx/production-server_error.log;

    # Root Directory
    root /home/vicente/dec/Adversarial-Machine-Learning/back-end;
    index templates/index.html;

    # Serve Static Assets with Caching
    location /static/ {
        alias /home/vicente/dec/Adversarial-Machine-Learning/back-end/static/;
        expires 1d;
        add_header Cache-Control "public";
    }

    # Handle Client-Side Routing for React
    location / {
        try_files $uri $uri/ /templates/index.html;
    }

    # Proxy API Requests to Backend Server
    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';" always;

}


# HTTP Server Block
server {
    listen 80;
    server_name decoychallenge.ucdenver.pvt;

    # Redirect All HTTP Requests to HTTPS
    return 301 https://$host$request_uri;
}

``` 

##### 3. Enable Nginx Configuration and Restart

- Enable the new configuration and restart Nginx:


``` bash
sudo ln -s /etc/nginx/sites-available/production-server /etc/nginx/sites-enabled
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

- **Using systemd**: Ensures that Gunicorn automatically restarts if it fails.

- **Monitor Logs**:
``` bash
journalctl -u production-server
sudo tail -f /var/log/nginx/production-server_access.log /var/log/nginx/production-server_error.log
```
real time logs
journalctl -u decoychallenge -f


- Security Updates: Regularly update the server to keep it secure.


### Thought the setup you may may be using these commands a lot:

Restart Services

Restart Gunicorn:

```bash
sudo systemctl daemon-reload
sudo systemctl enable 
sudo systemctl start 
sudo systemctl restart 
sudo systemctl status 
```
Reload Nginx:

```bash

sudo nginx -t
sudo systemctl reload nginx
```

Edit Nginx:
```bash
sudo gedit /etc/nginx/sites-available/decoychallenge
sudo gedit /etc/systemd/system/decoychallenge.service
```

Stop Services (Kill the server)


Stop Nginx:

```bash

sudo systemctl stop nginx
```
Stop Gunicorn (decoychallenge service):

```bash
sudo systemctl stop decoychallenge
```
```bash    KILLLL
sudo systemctl stop decoychallenge
sudo systemctl stop nginx
sudo pkill gunicorn
sudo pkill nginx
sudo rm -rf /var/cache/nginx/*
```


sudo systemctl daemon-reload
sudo systemctl start decoychallenge
sudo systemctl start nginx

sudo systemctl status decoychallenge
sudo systemctl status nginx

journalctl -u decoychallenge -f
sudo tail -f /var/log/nginx/access.log /var/log/nginx/error.log


sudo gedit /etc/systemd/system/decoychallenge.service




sudo chown -R vicente:www-data /home/vicente/prod-decoy-challenge/Adversarial-Machine-Learning/back-end/static
sudo chmod -R 755 /home/vicente/prod-decoy-challenge/Adversarial-Machine-Learning/back-end/static


sudo systemctl enable decoychallenge
sudo systemctl start decoychallenge
sudo systemctl restart decoychallenge
sudo systemctl reload nginx

sudo nginx -t
sudo systemctl restart nginx
sudo systemctl reload nginx


- **Monitor Logs**:
``` bash
journalctl -u decoychallenge
sudo tail -f /var/log/nginx/access.log /var/log/nginx/error.log
```
real time logs
journalctl -u decoychallenge -f


### Workflow Summary

- **Back-End**:
    - Set up the virtual environment and install dependencies.
    - Configure `app.py`, `config.py`, and `.flaskenv`.
    - Set up Gunicorn with 50 workers and the systemd service.

- **Front-End**:
    - Install Node.js dependencies and build static files using `npm run build`.
    - Move the generated files to the `static/` and `templates/` directories.

- **Nginx**:
    - Install and configure Nginx to serve the front-end and proxy requests to the back-end.
    - Restart Nginx.

- **Firewall**:
    - Configure the firewall to allow HTTP traffic on port 80.

- **Testing**:
    - Access the application from other devices on your network using your machine’s IP (h`ttp://10.18.22.224`).

### Additional Notes

- **SSL/TLS**: For HTTPS, obtain SSL certificates (e.g., using Let's Encrypt), and update the Nginx configuration accordingly.
- **Maintenance**: Regularly monitor logs and keep your system updated.



##### troubleshooting
sometimes you may experience ownership errors related to the static directory

1. solution
Change Ownership to Your User

If you're the only user on the machine, you can change the ownership of the static directory to you

Change Ownership:

```bash

sudo chown -R vicente:www-data /home/vicente/prod-decoy-challenge/Adversarial-Machine-Learning/back-end/static
```
Set Permissions:

```bash

sudo chmod -R 755 /home/vicente/prod-decoy-challenge/Adversarial-Machine-Learning/back-end/static
```
Explanation:

    The directory is now owned by vicente, with the group www-data.
    Nginx (running as www-data) can read the files because the permissions allow group read and execute.

1. Ensure Nginx User Has Access to Parent Directories

Since Nginx needs to traverse the directory structure to reach the static directory, ensure that the www-data user has execute permissions on parent directories.

Set Execute Permissions for Others:

```bash

sudo chmod o+x /home/vicente
sudo chmod o+x /home/vicente/prod-decoy-challenge
sudo chmod o+x /home/vicente/prod-decoy-challenge/Adversarial-Machine-Learning
sudo chmod o+x /home/vicente/prod-decoy-challenge/Adversarial-Machine-Learning/back-end
```
This grants execute permissions to others (which includes www-data) on the directories.
2. Final Steps

Restart Nginx:

```bash

sudo systemctl restart nginx
```
Test Application:

    Open your browser and navigate to http://decoychallenge.ucdenver.pvt.
    Verify that your application and static files are loading correctly.

2. solution
Delete the dirctory from the terminal and recreate it manually
`sudo rm -rf path/static/`
