class Config:
    DEBUG = True
    TESTING = False


class DevelopmentConfig(Config):
    DEBUG = True
    CORS_ORIGINS = ["http://127.0.0.1:5173", "http://localhost:5173", "http://10.18.22.224:5173"]
    # Add your local IP address to CORS_ORIGINS if you want to access the backend from another device
    # CORS_ORIGINS.append("http://<your_private_IP or local IP>:5173")


# Replace with your server's IP for production: This is what we are doing for the challenge
# 192.168.1.100 is just a placeholer
class ProductionConfig(Config):
    DEBUG = False
    CORS_ORIGINS = ["http://10.18.22.224:5173"]
