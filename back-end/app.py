from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from config import DevelopmentConfig, ProductionConfig
import os
from parseData import loadData, load_image_dir

app = Flask(__name__)

if app.debug:
    app.config.from_object(DevelopmentConfig)
    print("Running in Development Mode")
else:
    app.config.from_object(ProductionConfig)
    print("Running in Production Mode")

CORS(app, resources={r"/api/*": {"origins": app.config["CORS_ORIGINS"]}})

# Serve the static frontend
# Route for the main page
@app.route('/')
def index():
    return render_template('index.html')

# Print environment and configuration info
print(f"FLASK_DEBUG: {os.environ.get('FLASK_DEBUG', 'Not Set')}")
print(f"App debug mode: {app.debug}")

# ensure your routes are prefixed with /api.
path = "/home/vicente/Challenge/Adversarial-Machine-Learning/back-end/"
#path = "C:/Users/ramosv/Desktop/BDLab/AI Student Association/Github/Adversarial-Machine-Learning/back-end/"

UPLOAD_FOLDER = "Uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/api/upload-images", methods=["POST"])
def upload_images():
    # Check if files are provided
    if "files" not in request.files:
        return jsonify({"error": "No files provided"}), 400

    # Get the list of uploaded files and team name
    files = request.files.getlist("files")
    teamName = request.form.get("teamName", "default_team")

    # Call the logic function to handle the image upload
    message = load_image_dir(files, teamName)

    return jsonify({"message": message, "uploaded": len(files)})


@app.route("/api/team-data", methods=["GET"])
def get_team_data():

    # data = f'{path}{"Data/TeamData.json"}'
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


@app.route("/api/challenge", methods=["GET"])
def get_challenge_content():
    # data = f'{path}{"Data/challenge.json"}'
    data = os.path.join(path, "Data/challenge.json")

    if os.path.exists(data):
        results = loadData(data)
        return jsonify(results)
    else:
        return jsonify({"error": "Challenge data not found"}), 404


@app.route("/api/leaderboard", methods=["GET"])
def get_leaderboard_data():
    # data = f'{path}{"Data/leaderboard.json"}'
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
