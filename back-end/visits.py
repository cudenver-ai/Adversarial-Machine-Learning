from collections import defaultdict
import pandas as pd
import re
import json
import os
import logging

"""
We will look for the initial HTML document load (GET /):

    The initial request for / (or any other base URL path) is a be a strong indicator of a visit. This would be the first request when someone accesses the website.
    Example: GET / HTTP/1.1 or GET /index.html HTTP/1.1

We also need to exclude static asset requests:

    Static resources like .js, .css, .png, and API requests shouldn't be counted as individual visits. Filter those out to avoid inflating the visit count.
    Example paths to exclude: /static/, /assets/, /api/, or file extensions like .js, .css, .png.

"""
log_file = "/home/vicente/dec/Adversarial-Machine-Learning/back-end/update_visits.log"
logging.basicConfig(
    filename=log_file,
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',  
    datefmt='%Y-%m-%d %H:%M:%S' 
)

def update_visits():
    # Local path:
    # path = "C:/Users/ramosv/Desktop/BDLab/AI Student Association/Github/Adversarial-Machine-Learning/back-end/"
    # logs = f"{path}production-server_access.log"
    # json_file_path = f"{path}Data/visits.json"
    #print(os.environ)


    # Lab path
    path = "/home/vicente/dec/Adversarial-Machine-Learning/back-end/"
    #logs = f"/var/log/nginx/production-server_access.log"
    json_file_path = f"{path}Data/visits.json"
    logs_path = "/var/log/nginx/"

    log_pattern = re.compile(
        r'(?P<ip>\d+\.\d+\.\d+\.\d+) - - \[(?P<date>\d{2}/\w{3}/\d{4}:\d{2}:\d{2}:\d{2} [+-]\d{4})\] "(?P<method>\w+) (?P<path>\S+) HTTP/\d\.\d" (?P<status>\d+) (?P<size>\d+)'
    )

    parsed_data = []

    for filename in os.listdir(logs_path):

        if filename.startswith("production-server_access"):
            file_path = os.path.join(logs_path, filename)

            try:
                with open(file_path, "r") as file:
                    log_data = file.readlines()
                    
                for log in log_data:
                    match = log_pattern.match(log)
                    if match:
                        parsed_data.append(match.groupdict())
                
            except Exception as e:
                print(f"Error reading {filename}: {e}")

    df_parsed = pd.DataFrame(parsed_data)


    df_parsed["date"] = pd.to_datetime(df_parsed["date"], format="%d/%b/%Y:%H:%M:%S %z")

    #print(df_parsed["date"])

    df_filtered = df_parsed[
        (df_parsed["method"] == "GET")
        & (df_parsed["path"] == "/")  
    ]

    visits = df_filtered.groupby(df_filtered["date"].dt.date)["ip"].count().to_dict()

    uploads = defaultdict(int)
    unique_visits = defaultdict(set)

    for _, row in df_parsed.iterrows():
        date = row["date"].strftime("%Y-%m-%d")  
        method = row["method"]
        ip = row["ip"]

        if method == "POST":
            uploads[date] += 1

        unique_visits[date].add(ip)

    unique_visits_count = {}

    for date, ips in unique_visits.items():
        unique_visits_count[date] = len(ips)

    with open(json_file_path, "r") as f:
        json_data = json.load(f)

    for metric in json_data:
        if metric["id"] == "Visits":
            metric["data"] = [visits.get(date, 0) for date in sorted(visits.keys())]
        elif metric["id"] == "Uploads":
            metric["data"] = [uploads.get(date, 0) for date in sorted(uploads.keys())]
        elif metric["id"] == "Unique":
            metric["data"] = [
                unique_visits_count.get(date, 0)
                for date in sorted(unique_visits_count.keys())
            ]

    with open(json_file_path, "w") as f:
        json.dump(json_data, f, indent=4)


    logging.info("JSON file updated successfully!")

