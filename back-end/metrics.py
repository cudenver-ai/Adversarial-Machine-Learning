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
    with open ('Data/allSubmissions.json') as file:
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
    k = 5  # Number of slots in leaderboard
    history = {}

    # Load submissions
    with open('Data/allSubmissions.json') as file:
        submissions = json.load(file)

    # Extract scores + timestamps, and team names
    for entry in submissions:
        if entry['team_name'] in history:
            history[entry['team_name']]['score'].append(entry['score'])
            history[entry['team_name']]['timestamp'].append(datetime.strptime(entry['time_stamp'],
                                                                              '%Y-%m-%d %H:%M:%S'))
        else:
            history[entry['team_name']] = {
                'score': [entry['score']],
                'timestamp': [datetime.strptime(entry['time_stamp'], '%Y-%m-%d %H:%M:%S')]
            }

    # Sorting each team's stats by score then timestamp
    teams = list(history.keys())
    top_scores = []
    top_timestamps = []
    for team in teams:
        sorted_team_metrics = sorted(zip(history[team]['score'], history[team]['timestamp']),
                                     key=lambda x: (x[0], -x[1].month, -x[1].day), reverse=True)
        top_scores.append(sorted_team_metrics[0][0])
        top_timestamps.append(sorted_team_metrics[0][1])

    # Sorting stats for all teams
    sorted_overall_metrics = sorted(zip(teams, top_scores, top_timestamps),
                                    key=lambda x: (x[1], -x[2].month, -x[2].day), reverse=True)

    # Populate leaderboard with top k teams
    leaderboard = [{'rank': index + 1,
                    'team': sorted_overall_metrics[index][1],
                    'score': sorted_overall_metrics[index][0]} for index in range(k)]

    # Save leaderboard
    with open('../Data/leaderboard.json', 'w') as outfile:
        outfile.write(json.dumps(leaderboard, indent=4))

