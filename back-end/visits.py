from collections import defaultdict
import pandas as pd
import re
import json
import os
import logging
import sqlite3
import gzip
from datetime import datetime

"""
We will look for the initial HTML document load (GET /):

    The initial request for / (or any other base URL path) is a be a strong indicator of a visit. This would be the first request when someone accesses the website.
    Example: GET / HTTP/1.1 or GET /index.html HTTP/1.1

We also need to exclude static asset requests:

    Static resources like .js, .css, .png, and API requests shouldn't be counted as individual visits. Filter those out to avoid inflating the visit count.
    Example paths to exclude: /static/, /assets/, /api/, or file extensions like .js, .css, .png.

"""

conn = sqlite3.connect('./back-end/Data/ml.db')
delete_visits_sql = '''
delete from DailyVisits
'''
daily_visits_insert_sql_template = '''
INSERT INTO DailyVisits ("DATE", IP_ADDRESS, "PATH", STATUS)
VALUES ("{date}", "{ip_address}", "{path}", {status})
'''

def update_visits():
    # CLEAR DailyVisits Table
    conn.execute(delete_visits_sql)
    # Local path:

    # Lab path
    # path = "/home/vicente/dec/Adversarial-Machine-Learning/back-end/"
    # #logs = f"/var/log/nginx/production-server_access.log"
    # json_file_path = f"{path}Data/visits.json"
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

    for _, row in df_parsed.iterrows():
        date = row["date"].strftime("%Y-%m-%d")
        route = row["path"]
        ip = row["ip"]
        status = row["status"]

        if route == "/" or route == "/api/upload-images":
            insert_sql = daily_visits_insert_sql_template.format(date=date, ip_address=ip, path=route, status=status)
            conn.execute(insert_sql)
            conn.commit()

    conn.close()