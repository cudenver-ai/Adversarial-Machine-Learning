from rank import calculate_rank
from eval import evaluate
from visits import update_visits

import logging

logging.basicConfig(
    filename="update.log", 
    level=logging.INFO, 
    format="%(asctime)s - %(levelname)s - %(message)s",
    datefmt='%Y-%m-%d %H:%M:%S' 
)

update_visits()

# evaluate will either return true or false depending if the uploads dir is populated. if it is then it run the folwoing functions
if evaluate():
    calculate_rank()
    logging.info("Evaluation and subsequent functions completed successfully.")
    logging.info("-----------------------------------------------------------")
else:
    logging.info("Evaluation did not proceed. Skipping subsequent functions.")
    logging.info("-----------------------------------------------------------")
