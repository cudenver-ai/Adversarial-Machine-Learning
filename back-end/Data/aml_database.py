import sqlite3
import json
import os
from datetime import timedelta, datetime

path = os.getcwd()

def create_db_if_not_exists():
    sqlite3.connect(f'{path}/back-end/Data/ml.db')

def create_daily_visits_table_if_not_exists():
    with open(f'{path}/back-end/Data/deploy_db/CREATE_TABLE_DailyVisits.sql') as sql_file:
        sql_script = sql_file.read()
        connection = sqlite3.connect(f'{path}/back-end/Data/ml.db')
        connection.execute(sql_script)
        connection.commit()
        connection.close()

def get_daily_visits():
    connection = sqlite3.connect(f'{path}/back-end/Data/ml.db')
    cursor = connection.cursor()
    cursor.execute('''
        SELECT * FROM DailyVisits
        ''')
    rows = cursor.fetchall()
    column_names = [description[0] for description in cursor.description]
    result = [dict(zip(column_names, row)) for row in rows]
    unique_dates = set()
    for row in result:
        date = row["DATE"]
        date_obj = datetime.strptime(date, "%Y-%m-%d")
        unique_dates.add(date_obj)
    sorted_unique_dates = sorted(unique_dates)
    first_date = sorted_unique_dates[0]
    last_date = sorted_unique_dates[-1]
    date_range = []
    delta = last_date - first_date
    for i in range(delta.days + 1):
        current_date = first_date + timedelta(days=i)
        date_range.append(current_date)

    visits = []
    unique_visits = []
    uploads = []
    
    for date in date_range:
        formatted_date = date.strftime("%Y-%m-%d")
        visits_for_day = [row for row in result if row["DATE"] == formatted_date and row["PATH"] == "/"]
        unique_visits_for_day = {row["IP_ADDRESS"] for row in visits_for_day}
        uploads_for_day = [row for row in result if row["DATE"] == formatted_date and row["PATH"] == "/api/upload-images"]
        visits.append(len(visits_for_day))
        uploads.append(len(uploads_for_day))
        unique_visits.append(len(unique_visits_for_day))

    json_file_path = f"{path}/back-end/Data/visits.json"
    with open(json_file_path, "r") as f:
        json_data = json.load(f)

    for metric in json_data:
        if metric["id"] == "Visits":
            metric["data"] = visits
        elif metric["id"] == "Uploads":
            metric["data"] = uploads
        elif metric["id"] == "Unique":
            metric["data"] = unique_visits
    response = json.dumps(json_data, indent=4)
    connection.close()
    return response


def deploy_ML_DB():
    create_db_if_not_exists()
    create_daily_visits_table_if_not_exists()