import json


def update_evalMetrics():
    # Load the current metrics data
    with open("Data/metrics.json", "r") as f:
        metrics = json.load(f)

    # Update the metrics data
    metrics["total"] += 1
    metrics["daily"] += 1

    # Save the updated metrics data
    with open("Data/metrics.json", "w") as f:
        json.dump(metrics, f, indent=4)


def update_leaderBoard():
    # Load the current leaderBoard data
    with open("Data/leaderBoard.json", "r") as f:
        leaderBoard = json.load(f)

    # Update the leaderBoard data
    leaderBoard["total"] += 1
    leaderBoard["daily"] += 1

    # Save the updated leaderBoard data
    with open("Data/leaderBoard.json", "w") as f:
        json.dump(leaderBoard, f, indent=4)

# Hola, soy un comentario