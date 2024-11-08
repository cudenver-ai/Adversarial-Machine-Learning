from metrics import update_evalMetrics, update_leaderBoard
from rank import calculate_rank
from eval import evaluate
import logging
from utils.utils import update_visit
from pathlib import Path

update_visit((Path.cwd()).parent)

# evaluate will either return true or false depending if the uploads dir is populated. if it is then it run the folwoing functions
if evaluate():
    update_evalMetrics()
    update_leaderBoard()
    calculate_rank()
    logging.info("Evaluation and subsequent functions completed successfully.")
    logging.info("-----------------------------------------------------------")
else:
    logging.info("Evaluation did not proceed. Skipping subsequent functions.")
    logging.info("-----------------------------------------------------------")
