from collections import defaultdict
import pandas as pd
import re
import json

"""
We will look for the initial HTML document load (GET /):

    The initial request for / (or any other base URL path) is a be a strong indicator of a visit. This would be the first request when someone accesses the website.
    Example: GET / HTTP/1.1 or GET /index.html HTTP/1.1

We also need to exclude static asset requests:

    Static resources like .js, .css, .png, and API requests shouldn't be counted as individual visits. Filter those out to avoid inflating the visit count.
    Example paths to exclude: /static/, /assets/, /api/, or file extensions like .js, .css, .png.

"""


def update_visits():
    # Lab path
    # path = "/home/vicente/dec/Adversarial-Machine-Learning/back-end/"
    # logs = f"/var/log/nginx/production-server_access.log"
    #
    # json_file_path = f"{path}Data/visits.json"

    # Local path:
    path = "C:/Users/ramosv/Desktop/BDLab/AI Student Association/Github/Adversarial-Machine-Learning/back-end/"
    logs = f"{path}production-server_access.log"
    json_file_path = f"{path}Data/visits.json"

    # Read log file
    with open(logs, "r") as file:
        log_data = file.readlines()

    # Regex pattern to capture IP, Date, Method, Path, Status Code, and Response Size
    log_pattern = re.compile(
        r'(?P<ip>\d+\.\d+\.\d+\.\d+) - - \[(?P<date>\d{2}/\w{3}/\d{4}:\d{2}:\d{2}:\d{2} [+-]\d{4})\] "(?P<method>\w+) (?P<path>\S+) HTTP/\d\.\d" (?P<status>\d+) (?P<size>\d+)'
    )

    # Parse the log data
    parsed_data = []
    for log in log_data:
        match = log_pattern.match(log)
        if match:
            parsed_data.append(match.groupdict())

    # Convert parsed data into a pandas DataFrame
    df_parsed = pd.DataFrame(parsed_data)

    # Extract date (only the day part) for easier grouping
    df_parsed["date"] = pd.to_datetime(df_parsed["date"], format="%d/%b/%Y:%H:%M:%S %z")

    # Filter: Only count `GET /` requests, exclude static files and API calls
    df_filtered = df_parsed[
        (df_parsed["method"] == "GET")
        & (df_parsed["path"] == "/")  # Only initial page load
    ]

    # Group by date and count unique visits
    visits = df_filtered.groupby(df_filtered["date"].dt.date)["ip"].count().to_dict()

    # Initialize dictionaries to track metrics for uploads and unique visits
    uploads = defaultdict(int)
    unique_visits = defaultdict(set)

    # Loop through parsed data and update metrics for uploads and unique visits
    for _, row in df_parsed.iterrows():
        date = row["date"].strftime("%Y-%m-%d")  # Format the date as 'YYYY-MM-DD'
        method = row["method"]
        ip = row["ip"]

        # Count uploads (POST requests)
        if method == "POST":
            uploads[date] += 1

        # Track unique visitors by IP address
        unique_visits[date].add(ip)

    # Convert unique visits sets to counts
    unique_visits_count = {}

    for date, ips in unique_visits.items():
        unique_visits_count[date] = len(ips)

    # Load the existing JSON data
    with open(json_file_path, "r") as f:
        json_data = json.load(f)

    # Update the JSON data with the new metrics
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

    # Write the updated JSON data back to the file
    with open(json_file_path, "w") as f:
        json.dump(json_data, f, indent=4)

    print("JSON file updated successfully!")

if __name__ == "__main__":
    update_visits()
