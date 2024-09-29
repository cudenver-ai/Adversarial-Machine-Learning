import json


def update_visits():

    # Load the current visits data
    with open("Data/visits.json", "r") as f:
        visits = json.load(f)

    # Update the visits data
    visits["total"] += 1
    visits["daily"] += 1

    # Save the updated visits data
    with open("Data/visits.json", "w") as f:
        json.dump(visits, f, indent=4)
