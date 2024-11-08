from werkzeug.utils import secure_filename
import os
import logging
from datetime import datetime
from utils.utils import update_visit
from pathlib import Path

update_visit(Path.cwd())

def load_pickle_file(file, teamName):
    timestamp = datetime.now().strftime("%H-%M-%S")
    dirName = secure_filename(teamName) + timestamp
    TEAM_UPLOAD = os.path.join("Uploads", dirName)

    try:
        os.makedirs(TEAM_UPLOAD, exist_ok=True)
        logging.info(f"Directory created: {TEAM_UPLOAD}")

        if file.filename.endswith(".pkl"):
            # Secure the file name and save the pickle file
            fileName = secure_filename(file.filename)
            filePath = os.path.join(TEAM_UPLOAD, fileName)
            file.save(filePath)

            # Create a .txt file with timestamp and team name
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            info = os.path.join(TEAM_UPLOAD, "upload_info.txt")
            with open(info, "w") as f:
                f.write(f"{timestamp}\n")
                f.write(f"{teamName}\n")

            logging.info(f"Upload successful - Teamname: {teamName} at{timestamp}")

            return "Upload Successful"
        else:
            logging.warning("Invalid file type provided.")
            return "Invalid file type"

    except Exception as e:
        logging.error(f"Error in load_pickle_file: {str(e)}")
        raise e
