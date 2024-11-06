#### SSL/TLS Setup Guide (Generic)

This guide covers how to set up SSL/TLS using Let's Encrypt for domains and self-signed certificates for static IPs. It assumes the Production Server Deployment Guide has been followed.
Table of Contents

    Prerequisites
    SSL Setup Options
        Option 1: Self-Signed Certificates with Static IP
        Option 2: Using Let's Encrypt with a Domain (DNS)
    Testing SSL Configuration
    Renewing Certificates
    Additional Notes

Prerequisites

    Nginx is installed and serving your application.
    Your production server is set up and running per the Production Server Deployment Guide.
    Your firewall allows HTTP (port 80) and HTTPS (port 443) traffic.


Option 1: Self-Signed Certificates with Static IP(This is our current configuration)
Setting Up SSL/TLS with Self-Signed Certificates
Step 1: Generate a Self-Signed Certificate

First, we'll generate a self-signed SSL certificate and a corresponding private key.

Commands:

```bash

sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
 -keyout /etc/ssl/private/nginx-selfsigned.key \
 -out /etc/ssl/certs/nginx-selfsigned.crt
```
Explanation:

    req -x509: Generates a self-signed certificate instead of a certificate request.
    -nodes: No DES encryption; the private key will not be password protected.
    -days 365: The certificate is valid for 365 days.
    -newkey rsa:2048: Generates a new 2048-bit RSA key.

During the process, you'll be prompted to enter information such as Country, State, Organization, etc. You can fill these out as appropriate or leave them blank.
Step 2: Create a Diffie-Hellman Group

Creating a Diffie-Hellman (DH) parameter adds additional security for negotiating Perfect Forward Secrecy with clients.

Command:

```bash

sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
```
Note: This process may take a few minutes due to the computational complexity.
Step 3: Configure Nginx to Use SSL
3.1: Create a New Nginx Configuration Snippet for SSL

Create a snippet for SSL settings to keep your configurations organized.

Command:

```bash

sudo nano /etc/nginx/snippets/self-signed.conf
```
Add the following content:

```bash

ssl_certificate /etc/ssl/certs/nginx-selfsigned.crt;
ssl_certificate_key /etc/ssl/private/nginx-selfsigned.key;
```
Save and exit (Ctrl+O, Enter, Ctrl+X).
3.2: Create a Strong SSL Configuration Snippet

Command:

```bash

sudo nano /etc/nginx/snippets/ssl-params.conf
```
Add the following content:

```bash

ssl_protocols TLSv1.2 TLSv1.3;
ssl_prefer_server_ciphers on;
ssl_dhparam /etc/ssl/certs/dhparam.pem;
ssl_ciphers EECDH+AESGCM:EDH+AESGCM;
ssl_ecdh_curve secp384r1;
ssl_session_timeout  10m;
ssl_session_cache shared:SSL:10m;
ssl_session_tickets off;
ssl_stapling on;
ssl_stapling_verify on;
resolver 8.8.8.8 8.8.4.4 valid=300s;
resolver_timeout 5s;
add_header X-Frame-Options SAMEORIGIN;
add_header X-Content-Type-Options nosniff;
```
Save and exit.
3.3: Modify Your Nginx Server Block

Edit your existing Nginx site configuration.

Command:

```bash

sudo nano /etc/nginx/sites-available/decoychallenge
```
Update your server block to include SSL settings:

```bash

server {
    listen 443 ssl;
    server_name decoychallenge.ucdenver.pvt;

    include snippets/self-signed.conf;
    include snippets/ssl-params.conf;

    root /home/vicente/prod-decoy-challenge/Adversarial-Machine-Learning/back-end;
    index templates/index.html;

    location /static/ {
        alias /home/vicente/prod-decoy-challenge/Adversarial-Machine-Learning/back-end/static/;
    }

    location / {
        try_files $uri $uri/ /templates/index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```
# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name decoychallenge.ucdenver.pvt;

    return 301 https://$host$request_uri;
}

Save and exit.
Step 4: Adjust Firewall Settings

If you have UFW (Uncomplicated Firewall) enabled, you'll need to allow HTTPS traffic.

Check if UFW is active:

```bash

sudo ufw status
```
Allow 'Nginx Full' Profile:

```bash

sudo ufw allow 'Nginx Full'
```
Delete 'Nginx HTTP' Profile if Needed:

```bash

sudo ufw delete allow 'Nginx HTTP'
```
Step 5: Test and Reload Nginx

Test Nginx Configuration:

```bash

sudo nginx -t
```
    If there are any errors, revisit the configuration files to correct them.

Reload Nginx:

```bash
sudo systemctl reload nginx
```
Step 6: Access Your Site Using HTTPS

    Open a web browser and navigate to https://decoychallenge.ucdenver.pvt.
    Note: Since this is a self-signed certificate, your browser will display a warning about the security certificate. You'll need to accept the risk and proceed.



### SSL Setup Options
Option 2: Using Let's Encrypt with a Domain (DNS)

If you have a domain name (either public or internal) pointing to your server, follow these steps to set up SSL with Let's Encrypt.
Steps:

    Install Certbot:

    ```bash

sudo apt update
sudo apt install certbot python3-certbot-nginx
```

Obtain SSL Certificates:

Use Certbot to request SSL certificates for your domain:

```bash

sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```
    Replace your-domain.com with your actual domain.
    Certbot will handle verification and configure Nginx for you.

Verify Nginx Configuration:

Certbot will automatically configure Nginx to use the SSL certificates. Your Nginx configuration should look something like this:

```bash

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
```
Restart Nginx:

Reload Nginx to apply the changes:

```bash

    sudo nginx -t
    sudo systemctl reload nginx
```
Additional Considerations
1. Browser Security Warnings

    Self-Signed Certificates: Browsers will warn users about the risks of self-signed certificates because they are not issued by a trusted Certificate Authority (CA).
    Solution: For internal networks, you can distribute your self-signed CA certificate to client machines to trust your certificates.
    For Public Access: Always use certificates from a trusted CA like Let's Encrypt.

2. Internal Certificate Authority (Optional)

    If you have control over the network and client machines, you can set up an internal CA and distribute the CA certificate to clients.

1. Understanding Browser Security Warnings with Self-Signed Certificates
Why the Warnings Occur

    Self-signed certificates are not trusted by browsers because they are not issued by a recognized Certificate Authority (CA).
    When a browser encounters a self-signed certificate, it cannot verify the authenticity of the server, hence it displays a security warning to the user.

Implications

    Users may be hesitant to proceed past the warning.
    Some browsers and environments may block access altogether or make it difficult to proceed.

I understand that you're encountering browser security warnings when accessing your site over HTTPS due to the use of self-signed certificates. You're also wondering if you need to rebuild your frontend application with new configurations, specifically regarding your Vite environment variables:

```ini

VITE_API_BASE_URL=http://decoychallenge.ucdenver.pvt
VITE_PROXY_TARGET=http://10.18.22.224:5000
```
Additionally, you've mentioned the potential solution of distributing your self-signed CA certificate to client machines to have them trust your certificates.

Let's address each of your concerns step by step:
1. Understanding Browser Security Warnings with Self-Signed Certificates
Why the Warnings Occur

    Self-signed certificates are not trusted by browsers because they are not issued by a recognized Certificate Authority (CA).
    When a browser encounters a self-signed certificate, it cannot verify the authenticity of the server, hence it displays a security warning to the user.

Implications

    Users may be hesitant to proceed past the warning.
    Some browsers and environments may block access altogether or make it difficult to proceed.

2. Solutions to Eliminate Browser Warnings

Given that your domain is likely internal (.pvt suggests a private domain), you have a few options:
Option A: Use a Certificate from a Trusted Internal CA

    Set up an internal CA (Certificate Authority) within your organization.
    Issue certificates for your internal domains using this CA.
    Distribute the CA's root certificate to all client machines, so browsers trust certificates issued by your internal CA.

Option B: Distribute the Self-Signed Certificate to Clients

    Export the self-signed certificate and distribute it to client machines.
    Install the certificate in the trusted root certificate store on each client machine.

Option C: Obtain a Certificate from a Trusted Public CA

    If possible, use a publicly accessible domain name and obtain a certificate from a trusted public CA (e.g., Let's Encrypt).
    Note: Let's Encrypt requires domain validation over the internet, which may not be feasible for a private domain.

Option D: Use HTTP Instead of HTTPS

    Not recommended for production environments due to security concerns.
    Use only if the application is in a secure, isolated network and security is not a concern.

    4. Distributing Self-Signed Certificate to Client Machines

To eliminate the browser security warnings, you can install the self-signed certificate on client machines to have them trust it.
Steps to Install the Certificate on Client Machines:
a. Export the Self-Signed Certificate

    Copy the certificate to a location accessible for distribution:

    ```bash

    sudo cp /etc/ssl/certs/nginx-selfsigned.crt /home/vicente/nginx-selfsigned.crt
    sudo chown vicente:vicente /home/vicente/nginx-selfsigned.crt
```
b. Distribute the Certificate

    Provide the nginx-selfsigned.crt file to users who need to access the application.

c. Install the Certificate on Client Machines

    On Windows:
        Double-click the .crt file.
        Click "Install Certificate."
        Choose "Local Machine" and click "Next."
        Select "Place all certificates in the following store."
        Browse and select "Trusted Root Certification Authorities."
        Complete the wizard.

    On macOS:
        Double-click the .crt file.
        It should open in Keychain Access.
        Install it under "System" keychain.
        Set the certificate to "Always Trust."

    On Linux:

        For Firefox:
            Open Firefox settings.
            Go to "Privacy & Security."
            Under "Certificates," click "View Certificates."
            Import the .crt file under "Authorities."

        For System-wide Trust:

            Copy the certificate to /usr/local/share/ca-certificates/:

            ```bash

sudo cp nginx-selfsigned.crt /usr/local/share/ca-certificates/
```
Update the CA certificates:

```bash

            sudo update-ca-certificates
```
d. Verify in Browser

    After installing the certificate, restart the browser and navigate to https://decoychallenge.ucdenver.pvt.
    The security warning should no longer appear.

5. Additional Considerations
Security Implications

    Distributing a self-signed certificate requires trusting the certificate on all client machines, which can be a manageable process in a controlled, internal environment.
    Ensure that the private key (nginx-selfsigned.key) remains secure and is not distributed.

Automating Certificate Distribution

    In larger environments, you can use group policies (e.g., Active Directory GPOs) or configuration management tools (e.g., Ansible, Puppet) to automate certificate installation.

Alternative: Use a Private CA

    Setting up your own internal Certificate Authority allows you to issue certificates for internal domains and manage trust more effectively.
    This involves generating a root CA certificate, installing it on client machines, and using it to sign server certificates.

6. Testing the Application
After Rebuilding with Updated Configurations:

    Clear Browser Cache: To ensure no old configurations are cached.

    Test API Calls:
        Open the developer tools in your browser.
        Navigate to the Network tab.
        Ensure that API calls are being made over HTTPS and succeeding.

    Monitor Logs:

        Gunicorn Logs:

        ```bash

journalctl -u decoychallenge -f
```
Nginx Logs:

```bash

        sudo tail -f /var/log/nginx/access.log /var/log/nginx/error.log
```
    Check for Mixed Content Warnings:
        Ensure that all resources (scripts, stylesheets, images) are loaded over HTTPS.
        Mixed content can cause browsers to block resources.

7. Updating API Endpoints

If your frontend is making API calls to http://10.18.22.224:5000, you'll need to update these to use HTTPS as well.
a. Update VITE_PROXY_TARGET

    Old:

    ini

VITE_PROXY_TARGET=http://10.18.22.224:5000

Updated:

ini

    VITE_PROXY_TARGET=https://decoychallenge.ucdenver.pvt

    Explanation:
        This ensures that during development, your proxy server is also using HTTPS.
        For production builds, you may not need VITE_PROXY_TARGET.

b. Use Relative Paths in API Calls

    If possible, use relative paths for API calls, such as /api/eval-data.
    This ensures that the calls use the same protocol and host as the frontend.

8. Summary of Steps

    Update Vite configurations to use HTTPS URLs.
    Rebuild the frontend application with updated configurations.
    Deploy the new build to your backend.
    Update backend configurations to use HTTPS where necessary.
    Restart backend services (Gunicorn and Nginx).
    Distribute and install the self-signed certificate on client machines.
    Test the application to ensure everything works over HTTPS without warnings.

9. Conclusion

By updating your configurations and distributing the self-signed certificate to client machines, you can eliminate browser security warnings and ensure secure communication over HTTPS. Rebuilding your frontend application with the new configurations is necessary to make sure all resources and API calls are using HTTPS.