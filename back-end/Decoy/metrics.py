import json
from datetime import datetime


def update_evalMetrics():
    # Prepare output array
    metric_labels = ['Success Rate', 'Perturbation Magnitude', 'Visual Similarity', 'Average Confidence',
                     'Confidence Gap']
    metrics = [{'title': label,
                'data': [],
                'interval': 'daily',
                'trend': ''} for label in metric_labels]

    # Open submissions data
    with open ('../Data/allSubmissions.json') as file:
        submissions = json.load(file)

    # Parse submissions, group by date
    history = {}
    for entry in submissions:
        parsed_timestamp = datetime.strptime(entry['time_stamp'], '%Y-%m-%d %H:%M:%S').date()
        if parsed_timestamp in history.keys():
            history[parsed_timestamp]['incorrect_ratio'].append(entry['incorrect_ratio'])
            history[parsed_timestamp]['avg_confidence_incorrect'].append(entry['avg_confidence_incorrect'])
            history[parsed_timestamp]['avg_l2_perturbation'].append(entry['avg_l2_perturbation'])
            history[parsed_timestamp]['avg_ssim'].append(entry['avg_ssim'])
            history[parsed_timestamp]['avg_confidence_gap'].append(entry['avg_confidence_gap'])
            history[parsed_timestamp]['score'].append(entry['score'])
            history[parsed_timestamp]['team_name'].append(entry['team_name'])
        else:
            history[parsed_timestamp] = {
                'incorrect_ratio': [entry['incorrect_ratio']],
                'avg_confidence_incorrect': [entry['avg_confidence_incorrect']],
                'avg_l2_perturbation': [entry['avg_l2_perturbation']],
                'avg_ssim': [entry['avg_ssim']],
                'avg_confidence_gap': [entry['avg_confidence_gap']],
                'score': [entry['score']],
                'team_name': [entry['team_name']]
            }

    # Sort by month & day, add max per day to metrics
    for date in sorted(history.keys(), key=lambda x: (x.month, x.day)):
        metrics[0]['data'].append(max(history[date]['incorrect_ratio']))
        metrics[1]['data'].append(max(history[date]['avg_l2_perturbation']))
        metrics[2]['data'].append(max(history[date]['avg_ssim']))
        metrics[3]['data'].append(max(history[date]['avg_confidence_incorrect']))
        metrics[4]['data'].append(max(history[date]['avg_confidence_gap']))

    # Update trend direction
    for entry in metrics:
        if entry['data'][-1] > entry['data'][-2]:
            entry['trend'] = 'up'
        elif entry['data'][-1] < entry['data'][-2]:
            entry['trend'] = 'down'
        else:
            entry['trend'] = 'neutral'

    # Save metrics
    with open('../Data/evalMetric.json', 'w') as outfile:
        outfile.write(json.dumps(metrics, indent=4))


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
