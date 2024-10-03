import json
import os
from datetime import datetime
import logging

log_file = "/home/vicente/dec/Adversarial-Machine-Learning/back-end/update_visits.log"
logging.basicConfig(
    filename=log_file,
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

data_path = '/home/vicente/dec/Adversarial-Machine-Learning/back-end/'


def calculate_rank():
    logging.info('Starting calculate_rank')
    team_data = []

    # Load submissions
    logging.info('Loading allSubmissions.json')
    try:
        with open(os.path.join(data_path, 'Data/allSubmissions.json')) as file:
            submissions = json.load(file)
    except Exception as e:
        logging.error('Error loading allSubmissions.json: {}'.format(e))

    # Sort submission by timestamp, team name for tiebreaker
    logging.info('Sorting submissions by timestamp & team name')
    try:
        sorted_submissions = sorted(submissions, key=lambda x: (x['time_stamp'], x['team_name']), reverse=True)
    except Exception as e:
        logging.error('Error sorting submissions by timestamp: {}'.format(e))

    # Translate to front-end keys, assign ids
    logging.info('Converting back-end to front-end keys')
    try:
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
    except Exception as e:
        logging.error('Error converting keys: {}'.format(e))

    # Sort scores, keeping track of index. Timestamp for tiebreaker.
    logging.error('Sorting submissions by score')
    try:
        sorted_scores = sorted(zip([entry['TotalScore'] for entry in team_data],
                               [datetime.strptime(entry['LastSubmission'], '%Y-%m-%d %H:%M:%S') for entry in team_data],
                                   range(len(team_data))),
                               key=lambda x: (x[0], -x[1].month, -x[1].day), reverse=True)
    except Exception as e:
        logging.error('Error sorting submissions by score: {}'.format(e))

    # Update rank
    logging.error('Generating output')
    try:
        for index, score in enumerate(sorted_scores):
            team_data[score[2]]['Rank'] = index + 1
    except Exception as e:
        logging.error('Error generating output: {}'.format(e))

    # Save TeamData
    logging.error('Saving TeamData.json')
    try:
        with open(os.path.join(data_path, 'Data/TeamData.json'), 'w') as outfile:
            outfile.write(json.dumps(team_data, indent=4))
    except Exception as e:
        logging.error('Error saving TeamData.json: {}'.format(e))
