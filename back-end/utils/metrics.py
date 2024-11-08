import json
import os
from datetime import datetime, timedelta
import logging

log_file = "/home/vicente/dec/Adversarial-Machine-Learning/back-end/update_visits.log"
logging.basicConfig(
    filename=log_file,
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

data_path = '/home/vicente/dec/Adversarial-Machine-Learning/back-end/'


def update_evalMetrics():
    logging.info('Starting update_evalMetrics')
    # Prepare output array
    metric_labels = ['Success Rate', 'Perturbation Magnitude', 'Visual Similarity', 'Average Confidence',
                     'Confidence Gap']
    metrics = [{'title': label,
                'data': [],
                'interval': 'daily',
                'trend': ''} for label in metric_labels]

    # Open submissions data
    logging.info('Loading allSubmissions.json')
    try:
        with open (os.path.join(data_path, 'Data/allSubmissions.json')) as file:
            submissions = json.load(file)
    except Exception as e:
        logging.error('Error loading allSubmission.son: {}'.format(e))

    # Accounting for no submissions
    logging.info('Outputting template due to zero submissions')
    if len(submissions) == 1:
        return


    # Parse submissions, group by date
    logging.info('Parsing {} entries from allSubmissions.json'.format(len(submissions)))
    history = {}
    try:
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
    except Exception as e:
        logging.error('Error parsing allSubmissions.json: {}'.format(e))

    # Adding days when there weren't any submissions
    logging.info('Adding no-submission days.')
    try:
        today = datetime.now().date()
        start_date = datetime(2024, 10, 1).date()
        elapsed_days = [start_date + timedelta(days_elapsed) for days_elapsed in range((today - start_date).days + 1)]

        for date in elapsed_days:
            if date not in history.keys():
                history[date] = {
                        'incorrect_ratio': [0],
                        'avg_confidence_incorrect': [0],
                        'avg_l2_perturbation': [0],
                        'avg_ssim': [0],
                        'avg_confidence_gap': [0],
                        'score': [0],
                        'team_name': ['']
                    }
    except Exception as e:
        logging.error('Error adding no-submission days: {}'.format(e))

    # Sort by month & day, add max per day to metrics
    logging.info('Sorting and extracting metrics')
    try:
        for date in sorted(history.keys(), key=lambda x: (x.month, x.day)):
            metrics[0]['data'].append(max(history[date]['incorrect_ratio']))
            metrics[1]['data'].append(max(history[date]['avg_l2_perturbation']))
            metrics[2]['data'].append(max(history[date]['avg_ssim']))
            metrics[3]['data'].append(max(history[date]['avg_confidence_incorrect']))
            metrics[4]['data'].append(max(history[date]['avg_confidence_gap']))
    except Exception as e:
        logging.error('Error extracting metrics from submissions: {}'.format(e))

    # Update trend direction
    logging.info('Updating trendline')
    try:
        if len(entry) > 2:
            for entry in metrics:
                if entry['data'][-1] > entry['data'][-2]:
                    entry['trend'] = 'up'
                elif entry['data'][-1] < entry['data'][-2]:
                    entry['trend'] = 'down'
                else:
                    entry['trend'] = 'neutral'
        else:
            entry['trend'] = 'neutral'
    except Exception as e:
        logging.error('Error updating trend direction: {}'.format(e))

    # Save metrics
    logging.info('Saving evalMetric.json')
    try:
        with open(os.path.join(data_path, 'Data/evalMetric.json'), 'w') as outfile:
            outfile.write(json.dumps(metrics, indent=4))
    except Exception as e:
        logging.error('Error saving evalMetric.json: {}'.format(e))

    logging.info('Done with update_evalMetrics')


def update_leaderBoard():
    logging.info('Starting update_leaderBoard')
    k = 5  # Number of slots in leaderboard
    history = {}

    # Load submissions
    logging.info('Loading allSubmissions.json')
    try:
        with open(os.path.join(data_path, 'Data/allSubmissions.json')) as file:
            submissions = json.load(file)
    except Exception as e:
        logging.error('Error loading allSubmissions.json: {}'.format(e))

    # Extract scores + timestamps, and team names
    logging.info('Extracting scores, timestamps, and team names')
    try:
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
    except Exception as e:
        logging.error('Error extracting metrics: {}'.format(e))

    # Sorting each team's stats by score then timestamp
    logging.info('Sorting stats (teamwise)')
    teams = list(history.keys())
    top_scores = []
    top_timestamps = []
    try:
        for team in teams:
            sorted_team_metrics = sorted(zip(history[team]['score'], history[team]['timestamp']),
                                         key=lambda x: (x[0], -x[1].month, -x[1].day), reverse=True)
            top_scores.append(sorted_team_metrics[0][0])
            top_timestamps.append(sorted_team_metrics[0][1])
    except Exception as e:
        logging.error('Error sorting stats (teamwise): {}'.format(e))

    # Sorting stats for all teams
    logging.info('Sortings stats (overall)')
    try:
        sorted_overall_metrics = sorted(zip(teams, top_scores, top_timestamps),
                                        key=lambda x: (x[1], -x[2].month, -x[2].day), reverse=True)
    except Exception as e:
        logging.error('Error sorting stats (overall): {}'.format(e))

    # Populate leaderboard with top k teams
    logging.info('Populating leaderboard')
    num_teams = len(sorted_overall_metrics)
    try:
        leaderboard = [{'rank': index + 1,
                        'team': sorted_overall_metrics[index][0] if index < num_teams else '',
                        'score': sorted_overall_metrics[index][1] if index < num_teams else 0}
                       for index in range(k)]
    except Exception as e:
        logging.error('Error populating leaderboard: {}'.format(e))

    # Save leaderboard
    logging.info('Saving leaderboard.json')
    try:
        with open(os.path.join(data_path, 'Data/leaderboard.json'), 'w') as outfile:
            outfile.write(json.dumps(leaderboard, indent=4))
    except Exception as e:
        logging.error('Error saving loaderboard.json: {}'.format(e))

    k = 10
    # Populate top 10 with top 10 teams
    logging.info('Populating Top Ten')
    num_teams = len(sorted_overall_metrics)
    try:
        topTen = [{'rank': index + 1,
                        'team': sorted_overall_metrics[index][0] if index < num_teams else '',
                        'score': sorted_overall_metrics[index][1] if index < num_teams else 0}
                       for index in range(k)]
    except Exception as e:
        logging.error('Error populating Top Ten: {}'.format(e))

    # Save leaderboard
    logging.info('Saving topTen.json')
    try:
        with open(os.path.join(data_path, 'Data/topTen.json'), 'w') as outfile:
            outfile.write(json.dumps(topTen, indent=4))
    except Exception as e:
        logging.error('Error saving top 10.json: {}'.format(e))


if __name__ == "__main__":
    update_leaderBoard()