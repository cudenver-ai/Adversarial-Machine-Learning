from flask import Flask, send_from_directory, request, jsonify
from app.model import pre_processing
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route("/")
def send_page():
    return send_from_directory("", path="index.html")


@app.route("/<path:filename>")
def index(filename):
    return send_from_directory("", filename)


@app.route("/process-files", methods=["POST"])
def process_files():
    if "files" not in request.files:
        return jsonify({"error": "No files provided"}), 400

    files = request.files.getlist("files")
    print(files)
    upload = {}

    for file in files:
        filename = secure_filename(file.filename.split("/")[-1])
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)
        upload[filename] = "Uploaded successfully"

    output = pre_processing(UPLOAD_FOLDER)

    return jsonify({"Uploaded Files": upload, "Model Output": output})


if __name__ == "__main__":
    app.run(port=5000, debug=True)
