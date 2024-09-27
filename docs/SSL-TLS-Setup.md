SSL/TLS Setup Guide

This guide covers how to set up SSL/TLS using Let's Encrypt for domains and self-signed certificates for static IPs. It assumes the Production Server Deployment Guide has been followed.
Table of Contents

    Prerequisites
    SSL Setup Options
        Option 1: Using Let's Encrypt with a Domain (DNS)
        Option 2: Self-Signed Certificates with Static IP
    Testing SSL Configuration
    Renewing Certificates
    Additional Notes

Prerequisites

    Nginx is installed and serving your application.
    Your production server is set up and running per the Production Server Deployment Guide.
    Your firewall allows HTTP (port 80) and HTTPS (port 443) traffic.

SSL Setup Options
Option 1: Using Let's Encrypt with a Domain (DNS)

If you have a domain name (either public or internal) pointing to your server, follow these steps to set up SSL with Let's Encrypt.
Steps:

    Install Certbot:

    bash

sudo apt update
sudo apt install certbot python3-certbot-nginx

Obtain SSL Certificates:

Use Certbot to request SSL certificates for your domain:

bash

sudo certbot --nginx -d your-domain.com -d www.your-domain.com

    Replace your-domain.com with your actual domain.
    Certbot will handle verification and configure Nginx for you.

Verify Nginx Configuration:

Certbot will automatically configure Nginx to use the SSL certificates. Your Nginx configuration should look something like this:

nginx

server {
    listen 443 ssl;
    server_name your-domain.com www.your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

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

server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    return 301 https://$host$request_uri;
}

Restart Nginx:

Reload Nginx to apply the changes:

bash

    sudo nginx -t
    sudo systemctl reload nginx

Option 2: Self-Signed Certificates with Static IP

For local networks or internal testing, you can use self-signed certificates to encrypt traffic without needing a domain. This will display a browser warning since it's not validated by a trusted authority.
Steps:

    Generate a Self-Signed Certificate:

    bash

sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt

Create a Diffie-Hellman Group:

bash

sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048

Configure Nginx for Self-Signed SSL:

Update your Nginx configuration to use the self-signed certificate:

nginx

server {
    listen 443 ssl;
    server_name 10.18.22.224;  # Replace with your static IP

    ssl_certificate /etc/ssl/certs/nginx-selfsigned.crt;
    ssl_certificate_key /etc/ssl/private/nginx-selfsigned.key;
    ssl_dhparam /etc/ssl/certs/dhparam.pem;

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

server {
    listen 80;
    server_name 10.18.22.224;

    return 301 https://$host$request_uri;
}

Reload Nginx:

bash

    sudo nginx -t
    sudo systemctl reload nginx

Note: You will see a browser warning for self-signed certificates, but traffic will be encrypted.
Testing SSL Configuration

    For Let's Encrypt: Visit your domain (e.g., https://your-domain.com) to verify that SSL is working without browser warnings.
    For Self-Signed Certificates: Visit your static IP (e.g., https://10.18.22.224), and accept the browser warning.

Renewing Certificates
Let's Encrypt Certificates

Let's Encrypt certificates are valid for 90 days. Certbot automatically sets up a cron job for renewal, but you can manually test it with:

bash

sudo certbot renew --dry-run

This checks the renewal process without actually renewing the certificate.
Self-Signed Certificates

For self-signed certificates, you will need to regenerate them manually when they expire (based on the validity set during creation, e.g., 365 days).
Additional Notes

    SSL for Multiple Domains: If you have multiple domains, Certbot can generate certificates for all of them by adding -d flags (e.g., -d domain1.com -d domain2.com).
    Browser Warnings: Self-signed certificates will trigger warnings in browsers because they are not verified by a trusted certificate authority.
    Security: Always prefer using trusted SSL certificates (e.g., from Let's Encrypt) for production environments, especially for external-facing services.