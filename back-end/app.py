from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
from config import DevelopmentConfig, ProductionConfig
from parseData import load_pickle_file
import os
from datetime import datetime
import logging
from utils.utils import check_data, update_visit
from pathlib import Path

app = Flask(__name__)
app.config["SEND_FILE_MAX_AGE_DEFAULT"] = 0

if app.debug:
    app.config.from_object(DevelopmentConfig)
    print("Running in Development Mode")
else:
    app.config.from_object(ProductionConfig)
    print("Running in Production Mode")

CORS(app, resources={r"/api/*": {"origins": app.config["CORS_ORIGINS"]}})


# Print environment and configuration info
print(f"FLASK_DEBUG: {os.environ.get('FLASK_DEBUG', 'Not Set')}")
print(f"App debug mode: {app.debug}")

# Ensure your routes are prefixed with /api.
path = Path.cwd()

update_visit(path)


@app.route("/api/upload-images", methods=["POST"])
def upload_images():
    if "file" not in request.files:
        return jsonify({"error": "No files provided"}), 400

    file = request.files["file"]
    teamName = request.form.get("teamName", "default_team")

    if not file.filename.endswith(".pkl"):
        return jsonify({"error": "Invalid file type. Please upload a .pkl file"}), 400

    try:
        message = load_pickle_file(file, teamName)

        return jsonify({"message": message, "uploaded": 1})
    except Exception as e:
        logging.error(f"Error during upload: {str(e)}")
        return jsonify({"error": "Upload failed"}), 500


@app.route("/api/team-data", methods=["GET"])
def get_team_data():
    data = os.path.join(path, "Data/TeamData.json")
    return check_data(data, "Evaluation data")


@app.route("/api/eval-data", methods=["GET"])
def get_eval_data():
    data = f'{path}{"Data/evalMetric.json"}'
    return check_data(data, "Visits data")


@app.route("/api/organization", methods=["GET"])
def get_challenge_content():
    data = os.path.join(path, "Data/organization.json")
    return check_data(data, "Organization data")


@app.route("/api/leaderboard", methods=["GET"])
def get_leaderboard_data():
    data = os.path.join(path, "Data/leaderboard.json")
    return check_data(data, "Challenge data")


@app.route("/api/topTen", methods=["GET"])
def get_topTen_data():
    data = os.path.join(path, "Data/topTen.json")
    return check_data(data, "Top Ten data")


@app.route("/api/visits", methods=["GET"])
def get_site_visits():
    data = os.path.join(path, "Data/visits.json")
    return check_data(data, "Visits data")


@app.route("/api/example-code", methods=["GET"])
def get_example_code():
    data = os.path.join(path, "Data/exampleCode.json")
    return check_data(data, "example-code content")


@app.route("/api/download-notebook", methods=["GET"])
def download_notebook():
    notebook_dir = os.path.join(path, "Data/downloads")
    notebook = "Decoy.ipynb"

    if os.path.exists(os.path.join(notebook_dir, notebook)):
        return send_from_directory(notebook_dir, notebook, as_attachment=True)
    else:
        return jsonify({"error": "Notebook not found"}), 404


@app.route("/api/download-data", methods=["GET"])
def download_data():
    dataset_dir = os.path.join(path, "Data/downloads")
    dataset = "cifar10.pt"

    if os.path.exists(os.path.join(dataset_dir, dataset)):
        return send_from_directory(dataset_dir, dataset, as_attachment=True)
    else:
        return jsonify({"error": "Data not found"}), 404


@app.route("/api/update-timestamp", methods=["GET"])
def update_timestamp():
    data = os.path.join(path, "Data/visits.json")

    if os.path.isfile(data):
        timestamp = datetime.fromtimestamp(os.path.getmtime(data)).strftime(
            "%Y-%m-%d %H:%M:%S"
        )

        output = {"success": True, "timestamp": timestamp}
    else:
        output = {"success": False, "timstamp": ""}

    response = jsonify(output)
    response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
    return response
