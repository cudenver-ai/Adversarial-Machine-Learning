from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
from config import DevelopmentConfig, ProductionConfig
from parseData import loadData, load_pickle_file
import os
from datetime import datetime

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

if app.debug:
    app.config.from_object(DevelopmentConfig)
    print("Running in Development Mode")
else:
    app.config.from_object(ProductionConfig)
    print("Running in Production Mode")

CORS(app, resources={r"/api/*": {"origins": app.config["CORS_ORIGINS"]}})


# Serve the static frontend
# Route for the main page
@app.route("/")
def index():
    return render_template("index.html")


# Print environment and configuration info
print(f"FLASK_DEBUG: {os.environ.get('FLASK_DEBUG', 'Not Set')}")
print(f"App debug mode: {app.debug}")

# ensure your routes are prefixed with /api.
path = "/home/vicente/dec/Adversarial-Machine-Learning/back-end/"

UPLOAD_FOLDER = "Uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route("/api/upload-images", methods=["POST"])
def upload_images():
    if "file" not in request.files:
        return jsonify({"error": "No files provided"}), 400

    file = request.files["file"]
    teamName = request.form.get("teamName", "default_team")

    if not file.filename.endswith(".pkl"):
        return jsonify({"error": "Invalid file type. Please upload a .pkl file"}), 400

    message = load_pickle_file(file, teamName)

    return jsonify({"message": message, "uploaded": 1})


@app.route("/api/team-data", methods=["GET"])
def get_team_data():
    data = os.path.join(path, "Data/TeamData.json")

    # Load and return the parsed team data
    if os.path.exists(data):
        results = loadData(data)
        return jsonify(results)
    else:
        return jsonify({"error": "Evaluation data not found"}), 404


@app.route("/api/eval-data", methods=["GET"])
def get_eval_data():
    # Load and return the parsed team data
    data = f'{path}{"Data/evalMetric.json"}'

    if os.path.exists(data):
        results = loadData(data)
        return jsonify(results)
    else:
        return jsonify({"error": "Visits data not found"}), 404


@app.route("/api/organization", methods=["GET"])
def get_challenge_content():
    data = os.path.join(path, "Data/organization.json")

    if os.path.exists(data):
        results = loadData(data)
        return jsonify(results)
    else:
        return jsonify({"error": "Organization data not found"}), 404


@app.route("/api/leaderboard", methods=["GET"])
def get_leaderboard_data():
    data = os.path.join(path, "Data/leaderboard.json")

    if os.path.exists(data):
        results = loadData(data)
        return jsonify(results)
    else:
        return jsonify({"error": "Challenge data not found"}), 404


@app.route("/api/visits", methods=["GET"])
def get_site_visits():
    data = os.path.join(path, "Data/visits.json")

    if os.path.exists(data):
        results = loadData(data)
        return jsonify(results)
    else:
        return jsonify({"error": "Challenge data not found"}), 404


@app.route("/api/example-code", methods=["GET"])
def get_example_code():
    data = os.path.join(path, "Data/exampleCode.json")

    if os.path.exists(data):
        results = loadData(data)
        return jsonify(results)
    else:
        return jsonify({"error": "Example Code content not found"}), 404


@app.route("/api/download-notebook", methods=["GET"])
def download_notebook():
    notebook = os.path.join(path, "Data/Decoy.ipynb")

    if os.path.exists(notebook):
        return send_from_directory(notebook, as_attachment=True)
    else:
        return jsonify({"error": "Notebook not found"}), 404

@app.route("/api/update-timestamp", methods=["GET"])
def update_timestamp():
    data = os.path.join(path, "Data/visits.json")

    if os.path.isfile(data):
        timestamp = datetime.fromtimestamp(os.path.getmtime(data)).strftime('%Y-%m-%d %H:%M:%S')

        output = {'success': True, 'timestamp': timestamp}
    else:
        output = {'success': False, 'timstamp': ''}

    return jsonify(output)