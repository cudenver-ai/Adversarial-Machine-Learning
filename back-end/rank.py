from datetime import datetime
import logging
import sqlite3
from Data.aml_database import fetch_all_submissions

log_file = "/home/vicente/dec/Adversarial-Machine-Learning/back-end/update_visits.log"
logging.basicConfig(
    filename=log_file,
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

data_path = '/home/vicente/dec/Adversarial-Machine-Learning/back-end/'
delete_team_data = '''delete from TeamData'''
conn = sqlite3.connect('./back-end/Data/ml.db')
insert_team_data_sql_template = '''
INSERT INTO TeamData ("TeamName", "LastSubmission", "SuccessRate", "PerturbationMagnitude", "AverageConfidence", "ConfidenceGap", "VisualSimilarity", "TotalScore", "Rank")
VALUES("{team_name}", "{last_submission}", {success_rate}, {perturbation_magnitude}, {average_confidence}, {confidence_gap}, {visual_similarity}, {total_score}, {rank})
'''

def calculate_rank():
    logging.info('Starting calculate_rank')
    team_data = []

    conn.execute(delete_team_data)
    submissions = fetch_all_submissions()

    # Accounting for no submissions
    logging.info('Outputting template due to zero submissions')
    if len(submissions) == 1:
        return

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

    try:
        for entry in team_data:
            insert_team_data_sql = insert_team_data_sql_template.format(
                team_name = entry['TeamName'],
                last_submission = entry['LastSubmission'],
                success_rate = entry['SuccessRate'],
                perturbation_magnitude = entry['PerturbationMagnitude'],
                average_confidence = entry['AverageConfidence'],
                confidence_gap = entry['ConfidenceGap'],
                visual_similarity = entry['VisualSimilarity'],
                total_score = entry['TotalScore'],
                rank = entry['Rank']
            )
            conn.execute(insert_team_data_sql)
            conn.commit()
    except Exception as e:
        logging.error('Error saving TeamData: {e}'.format(e))
    conn.close()