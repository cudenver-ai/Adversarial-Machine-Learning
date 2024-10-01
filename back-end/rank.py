import json


def calculate_rank():
    # Load the team data
    with open("Data/TeamData.json", "r") as f:
        team_data = json.load(f)

    # Calculate the rank for each team
    for team in team_data:
        team["rank"] = sum(team["scores"])

    # Sort the team data by rank
    team_data.sort(key=lambda x: x["rank"], reverse=True)

    # Save the updated team data
    with open("Data/TeamData.json", "w") as f:
        json.dump(team_data, f, indent=4)
