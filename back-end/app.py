from flask import Flask, request, jsonify
from flask_cors import CORS
from config import DevelopmentConfig, ProductionConfig
import os


from parseData import loadData, load_image_dir
"""
Frontend URL: http://192.168.1.100:5173
Backend API: Proxied via Vite from /api to http://192.168.1.100:5000/api"""


app = Flask(__name__)

if os.environ.get("FLASK_ENV") == "development":
    app.config.from_object(DevelopmentConfig)
else:
    app.config.from_object(ProductionConfig)

CORS(app, resources={r"/api/*": {"origins": app.config["CORS_ORIGINS"]}})

print(os.environ.get("FLASK_ENV"))

UPLOAD_FOLDER = "Uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ensure your routes are prefixed with /api.


@app.route("/api/upload-images", methods=["POST"])
def upload_images():
    # Check if files are provided
    if "files" not in request.files:
        return jsonify({"error": "No files provided"}), 400

    # Get the list of uploaded files and team name
    files = request.files.getlist("files")
    teamName = request.form.get('teamName', 'default_team')

    # Call the logic function to handle the image upload
    message = load_image_dir(files, teamName)

    return jsonify({"message": message, "uploaded": len(files)})



@app.route("/api/team-data", methods=["GET"])
def get_team_data():
    path = "C:/Users/ramosv/Desktop/BDLab/AI Student Association/Github/Adversarial-Machine-Learning/back-end/"
    data = f"{path}{"Data/TeamData.json"}"
    # Load and return the parsed team data
    if os.path.exists(data):
        results = loadData(data)
        return jsonify(results)
    else:
        return jsonify({"error": "Evaluation data not found"}), 404


@app.route("/api/eval-data", methods=["GET"])
def get_eval_data():
    path = "C:/Users/ramosv/Desktop/BDLab/AI Student Association/Github/Adversarial-Machine-Learning/back-end/"
    # Load and return the parsed team data
    data = f"{path}{"Data/evalMetric.json"}"

    if os.path.exists(data):
        results = loadData(data)
        return jsonify(results)
    else:
        return jsonify({"error": "Evaluation data not found"}), 404

@app.route("/api/visits", methods=["GET"])
def get_visits_data():
    path = "C:/Users/ramosv/Desktop/BDLab/AI Student Association/Github/Adversarial-Machine-Learning/back-end/"
    data = f"{path}{"Data/visits.json"}"

    if os.path.exists(data):
        results = loadData(data)
        return jsonify(results)
    else:
        return jsonify({"error": "Visits data not found"}), 404

@app.route('/api/challenge', methods=['GET'])
def get_challenge_content():
    path = "C:/Users/ramosv/Desktop/BDLab/AI Student Association/Github/Adversarial-Machine-Learning/back-end/"
    data = f"{path}{"Data/challenge.json"}"

    if os.path.exists(data):
        results = loadData(data)
        return jsonify(results)
    else:
        return jsonify({"error": "Challenge data not found"}), 404

@app.route("/api/leaderboard", methods=["GET"])
def get_leaderboard_data():
    path = "C:/Users/ramosv/Desktop/BDLab/AI Student Association/Github/Adversarial-Machine-Learning/back-end/"
    data = f"{path}{"Data/leaderboard.json"}"

    if os.path.exists(data):
        results = loadData(data)
        return jsonify(results)
    else:
        return jsonify({"error": "Challenge data not found"}), 404
# Run the Flask app on port 5000
if __name__ == "__main__":
    # For local development, you can run on localhost
    app.run(port=5000, debug=True)

    # If you want to access this from other devices on your network, uncomment the line below
    # Replace '0.0.0.0' with your machine's local IP address if needed (e.g., 192.168.x.x)
    # app.run(host='0.0.0.0', port=5000)
