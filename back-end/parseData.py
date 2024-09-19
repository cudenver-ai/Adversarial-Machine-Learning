from werkzeug.utils import secure_filename
import json
import os
import logging

logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s %(levelname)s %(message)s",
    handlers=[
        logging.FileHandler("app.log"),
        logging.StreamHandler(),
    ],
)


def loadData(file):
    with open(file, "r") as f:
        data = json.load(f)
    return data


def load_image_dir(images, teamName):

    dirName = secure_filename(teamName)
    TEAM_UPLOAD = os.path.join("uploads", dirName)
    os.makedirs(TEAM_UPLOAD, exist_ok=True)

    # Process each uploaded image
    for img in images:
        if img.filename.endswith(".png"):
            imageName = secure_filename(img.filename)
            imagePath = os.path.join(TEAM_UPLOAD, imageName)
            img.save(imagePath)

    return "Upload Successful"
