import json
from datetime import datetime

def calculate_rank():
    team_data = []

    # Load submissions
    with open('../Data/allSubmissions.json') as file:
        submissions = json.load(file)

    sorted_submissions = sorted(submissions, key=lambda x: (x['time_stamp'], x['team_name']), reverse=True)
    
    for index, entry in enumerate(sorted_submissions):
        team_data.append({
            'id': index + 1,
            'TeamName': entry['team_name'],
            'LastSubmission': entry['time_stamp'],
            'SuccessRate': entry['incorrect_ratio'],
            'PerturbationMagnitude': entry['avg_l2_perturbation'],
            'AverageConfidence': entry['avg_confidence_incorrect'],
            'ConfidenceGap': entry['avg_confidence_gap'],
            'VisualSimilarity': entry['avg_ssim'],
            'TotalScore': entry['score'],
            'Rank': 0
        })

    sorted_scores = sorted(zip([entry['TotalScore'] for entry in team_data],
                           [datetime.strptime(entry['LastSubmission'], '%Y-%m-%d %H:%M:%S') for entry in team_data],
                               range(len(team_data))),
                           key=lambda x: (x[0], -x[1].month, -x[1].day), reverse=True)

    for index, score in enumerate(sorted_scores):
        team_data[score[2]]['Rank'] = index + 1

    with open('../Data/TeamData.json', 'w') as outfile:
        outfile.write(json.dumps(team_data, indent=4))
