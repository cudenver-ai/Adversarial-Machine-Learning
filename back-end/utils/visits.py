from collections import defaultdict
import pandas as pd
import re
import json
import os
import logging
import gzip
from datetime import datetime
from pathlib import Path
from utils.utils import update_visit

update_visit((Path.cwd()).parent)

def update_visits():
    path = (Path.cwd()).parent
    json_file_path = f"{path}Data/visits.json"
    logs_paths = ["/var/log/nginx/"]

    log_pattern = re.compile(
        r'(?P<ip>\d+\.\d+\.\d+\.\d+) - - \[(?P<date>\d{2}/\w{3}/\d{4}:\d{2}:\d{2}:\d{2} [+-]\d{4})\] "(?P<method>\w+) (?P<path>\S+) HTTP/\d\.\d" (?P<status>\d+) (?P<size>\d+)'
    )

    parsed_data = []

    for logs_path in logs_paths:
        for filename in os.listdir(logs_path):
            file_path = os.path.join(logs_path, filename)

            try:
                if filename.startswith("production-server_access"):
                    if filename.endswith(".gz"):
                        with gzip.open(file_path, "rt", encoding="utf-8") as file:
                            log_data = file.readlines()
                            logging.info(f"Finished reading: {filename}")
                    else:
                        with open(file_path, "r") as file:
                            log_data = file.readlines()
                            logging.info(f"Finished reading: {filename}")

                    for log in log_data:
                        match = log_pattern.match(log)
                        if match:
                            parsed_data.append(match.groupdict())

            except Exception as e:
                logging.info(f"Error reading {filename}: {e}")

    df_parsed = pd.DataFrame(parsed_data)
    if df_parsed.empty:
        logging.info("No log data parsed.")
        return

    df_parsed["date"] = pd.to_datetime(df_parsed["date"], format="%d/%b/%Y:%H:%M:%S %z")
    df_parsed["date"] = df_parsed["date"].dt.tz_localize(None)

    min_date = df_parsed["date"].min().date()
    max_date = df_parsed["date"].max().date()
    logging.info(f"Log entries date range: {min_date} to {max_date}")

    # october_first_2024 = datetime(2024, 10, 1).date()
    october_15th_2024 = datetime(2024, 10, 15).date()
    end_date = datetime.now().date()

    old_visits_data = [30, 58, 68, 98, 80, 27, 107, 33, 9, 158, 18, 1, 3, 15]
    old_uploads_data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 6, 1, 7, 0]
    old_unique_data = [6, 14, 13, 13, 4, 4, 9, 6, 7, 33, 4, 1, 2, 10]

    visits_data = old_visits_data.copy()
    uploads_data = old_uploads_data.copy()
    unique_data = old_unique_data.copy()

    visits = defaultdict(int)
    uploads = defaultdict(int)
    unique_visits = defaultdict(set)

    for _, row in df_parsed.iterrows():
        date = row["date"].date()
        if date >= october_15th_2024:
            date_str = date.strftime("%Y-%m-%d")
            method = row["method"]
            path = row["path"]
            ip = row["ip"]

            if method == "GET" and path == "/":
                visits[date_str] += 1
                unique_visits[date_str].add(ip)
            elif method == "POST":
                uploads[date_str] += 1
                unique_visits[date_str].add(ip)

    unique_visits_count = {date: len(ips) for date, ips in unique_visits.items()}

    for date in pd.date_range(start=october_15th_2024, end=end_date):
        date_str = date.strftime("%Y-%m-%d")
        visits_data.append(visits.get(date_str, 0))
        uploads_data.append(uploads.get(date_str, 0))
        unique_data.append(unique_visits_count.get(date_str, 0))

    json_data = [
        {
            "id": "Visits",
            "label": "Visits",
            "showMark": False,
            "curve": "linear",
            "stack": "total",
            "area": True,
            "stackOrder": "ascending",
            "data": visits_data,
        },
        {
            "id": "Uploads",
            "label": "Uploads",
            "showMark": False,
            "curve": "linear",
            "stack": "total",
            "area": True,
            "stackOrder": "ascending",
            "data": uploads_data,
        },
        {
            "id": "Unique",
            "label": "Unique Visitors",
            "showMark": False,
            "curve": "linear",
            "stack": "total",
            "area": True,
            "stackOrder": "ascending",
            "data": unique_data,
        },
    ]

    with open(json_file_path, "w") as f:
        json.dump(json_data, f, indent=4)

    logging.info("JSON file updated successfully!")
    logging.info("-------------------------------")
