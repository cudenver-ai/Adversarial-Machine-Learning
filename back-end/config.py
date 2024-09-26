class Config:
    DEBUG = False
    TESTING = False


class DevelopmentConfig(Config):
    DEBUG = True
    CORS_ORIGINS = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://10.18.22.224:5173",
        # If you need to access the back-end from other devices on your home network, change FLASK_RUN_HOST to 0.0.0.0 inside .flaskenv
    ]


class ProductionConfig(Config):
    DEBUG = False
    CORS_ORIGINS = [
        "http://your-server-private-ip:5173",
        # If you get a DNS, include it here
        "http://your-dns-name",
    ]
