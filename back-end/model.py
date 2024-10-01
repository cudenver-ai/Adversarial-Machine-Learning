import os
import json
from datetime import datetime

TEAM_DATA_PATH = "C:/Users/ramosv/Desktop/BDLab/AI Student Association/Github/Adversarial-Machine-Learning/back-end/Data/TeamData.json"


def generate_team_data():
    upload_dir = "C:/Users/ramosv/Desktop/BDLab/AI Student Association/Github/Adversarial-Machine-Learning/back-end/uploads/"
    team_data = []

    for team_dir in os.listdir(upload_dir):
        team_path = os.path.join(upload_dir, team_dir)
        if os.path.isdir(team_path):
            results = evaluate_team_images(team_path)
            team_info = {
                "id": len(team_data) + 1,
                "TeamName": team_dir,
                "LastSubmission": f"{datetime.now().strftime('%d/%m/%Y %H:%M:%S')}",
                "SuccessRate": results["SuccessRate"],
                "PerturbationMagnitude": results["PerturbationMagnitude"],
                "VisualSimilarity": results["VisualSimilarity"],
                "TotalScore": results["TotalScore"],
                "Rank": results["Rank"],
            }
            team_data.append(team_info)

    with open(TEAM_DATA_PATH, "w") as f:
        json.dump(team_data, f, indent=4)

    return team_data


def evaluate_team_images(team_path):
    metrics = javad_model(team_path)
    return {
        "SuccessRate": metrics.get("success_rate", 0),
        "PerturbationMagnitude": metrics.get("perturbation_magnitude", 0),
        "VisualSimilarity": metrics.get("visual_similarity", 0),
        "TotalScore": metrics.get("total_score", "0m 0s"),
        "Rank": metrics.get("rank", 0),
    }


def javad_model(team_path):

    return {
        "success_rate": 0.75,
        "perturbation_magnitude": 0.2,
        "visual_similarity": 0.85,
        "total_score": "100m 30s",
        "rank": 1,
    }
