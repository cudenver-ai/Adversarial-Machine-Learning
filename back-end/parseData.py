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



def load_pickle_file(file, teamName):
    dirName = secure_filename(teamName)
    TEAM_UPLOAD = os.path.join("Uploads", dirName)
    os.makedirs(TEAM_UPLOAD, exist_ok=True)

    if file.filename.endswith(".pkl"):
        fileName = secure_filename(file.filename)
        filePath = os.path.join(TEAM_UPLOAD, fileName)
        file.save(filePath)

    return "Upload Successful"
