import os
import json
from flask import jsonify
import logging
from pathlib import Path


def loadData(file):
    with open(file, "r") as f:
        data = json.load(f)
    return data


def check_data(data, data_type):
    if os.path.exists(data):
        results = loadData(data)
        return jsonify(results)
    else:
        return jsonify({"error": f"{data_type} not found"}), 404

def update_visit(cwd_dir):
    log_file = cwd_dir / "logs" / "update_visits.log"
    logging.basicConfig(
        filename=log_file,
        level=logging.INFO,
        format="%(asctime)s - %(levelname)s - %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
)