from metrics import update_evalMetrics, update_leaderBoard
from rank import calculate_rank
from eval import evaluate
from visits import update_visits

import logging

#Logging
log_file = "/home/vicente/dec/Adversarial-Machine-Learning/back-end/update_visits.log"
logging.basicConfig(
    filename=log_file,
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',  
    datefmt='%Y-%m-%d %H:%M:%S' 
)


# update_visits()

# # evaluate will either return true or false depending if the uploads dir is populated. if it is then it run the folwoing functions
# if evaluate():
#     update_evalMetrics()
#     update_leaderBoard()
#     calculate_rank()
#     logging.info("Evaluation and subsequent functions completed successfully.")
#     logging.info("-----------------------------------------------------------")
# else:
#     logging.info("Evaluation did not proceed. Skipping subsequent functions.")
#     logging.info("-----------------------------------------------------------")
