import os
import json
from datetime import datetime
import statistics
from model import (
    generate_team_data,
)  # Assuming model.py has a function generate_team_data
from eval import main

# # Paths
# TEAM_DATA_PATH = "C:/Users/ramosv/Desktop/BDLab/AI Student Association/Github/Adversarial-Machine-Learning/back-end/Data/TeamData.json"
# EVAL_DATA_PATH = "C:/Users/ramosv/Desktop/BDLab/AI Student Association/Github/Adversarial-Machine-Learning/back-end/Data/evalMetric.json"


# # Function to delete TeamData.json
# def delete_team_data():
#     if os.path.exists(TEAM_DATA_PATH):
#         os.remove(TEAM_DATA_PATH)
#         print(f"{TEAM_DATA_PATH} deleted at {datetime.now()}.")
#     else:
#         print(f"{TEAM_DATA_PATH} not found.")


# # Function to update TeamData.json using the model.py function
# def update_team_data():
#     # Call the model.py function to generate new team data
#     new_team_data = generate_team_data()

#     # Save the new data to TeamData.json
#     with open(TEAM_DATA_PATH, "w") as f:
#         json.dump(new_team_data, f, indent=4)
#     print(f"New {TEAM_DATA_PATH} created at {datetime.now()}.")


# # Function to regenerate evalMetric.json based on the new team data
# def generate_eval_data():
#     # Ensure the team data exists before generating eval data
#     if os.path.exists(TEAM_DATA_PATH):
#         generateEvalData(TEAM_DATA_PATH, EVAL_DATA_PATH)
#         print(f"{EVAL_DATA_PATH} regenerated at {datetime.now()}.")
#     else:
#         print(f"Cannot generate eval data: {TEAM_DATA_PATH} not found.")


# def generateEvalData(team_data_file, eval_data_file):
#     # Load the team data from the provided file
#     with open(team_data_file, "r") as f:
#         team_data = json.load(f)

#     # Prepare evalMetric data structure
#     eval_data = [
#         {"title": "Success Rate", "data": [], "interval": "weekly", "trend": ""},
#         {
#             "title": "Perturbation Magnitude",
#             "data": [],
#             "interval": "weekly",
#             "trend": "",
#         },
#         {"title": "Visual Similarity", "data": [], "interval": "weekly", "trend": ""},
#     ]

#     # Collect the last 30 entries
#     last_30_teams = team_data[-30:]

#     # Populate evaluation data
#     for team in last_30_teams:
#         eval_data[0]["data"].append(team["SuccessRate"])
#         eval_data[1]["data"].append(team["PerturbationMagnitude"])
#         eval_data[2]["data"].append(team["VisualSimilarity"])

#     # Calculate trends for each metric based on comparison between two periods
#     eval_data[0]["trend"] = calculate_trend(eval_data[0]["data"])
#     eval_data[1]["trend"] = calculate_trend(eval_data[1]["data"])
#     eval_data[2]["trend"] = calculate_trend(eval_data[2]["data"])

#     # Write the eval data to evalMetric.json
#     with open(eval_data_file, "w") as f:
#         json.dump(eval_data, f, indent=4)

#     print(f"Eval data successfully written to {eval_data_file}")


# def calculate_trend(data, period=7):
#     """
#     Calculates the trend based on comparing the average (or median) of the last period with the previous one.
#     Returns 'up', 'down', or 'neutral' based on the trend.
#     """

#     if len(data) < period * 2:
#         return "neutral"  # Not enough data to calculate trend

#     # Split the data into two periods
#     current_period = data[-period:]  # Last period
#     previous_period = data[-period * 2 : -period]  # Previous period

#     # Calculate averages (can use median instead of average)
#     current_avg = sum(current_period) / len(current_period)
#     previous_avg = sum(previous_period) / len(previous_period)

#     # Compare the averages to determine trend
#     if current_avg > previous_avg:
#         return "up"
#     elif current_avg < previous_avg:
#         return "down"
#     else:
#         return "neutral"


# # Task: Delete, update, and regenerate eval data
# delete_team_data()  # Delete the old team data
# update_team_data()  # Generate new team data
# generate_eval_data()  # Generate eval data based on the new team data

# to run the eval.py file
main()