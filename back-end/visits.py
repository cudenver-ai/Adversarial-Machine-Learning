from collections import defaultdict
import pandas as pd
import re
import json


data = pd.read_csv('app.log', delimiter=' ', header=None)
data.fillna(" ", inplace=True)
cols = [0, 1, 3]
filtered_data = data[cols]

ip_pattern = r'\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b'

# Filtering rows where the 3rd column contains a valid IP address
filtered_data_ip = filtered_data[filtered_data[3].apply(lambda x: bool(re.match(ip_pattern, x)))]

filtered_data_ip.iloc[:, 1] = filtered_data_ip.iloc[:, 1].str.split(',').str[0]
filtered_data_ip= filtered_data_ip.drop_duplicates()

# this will keep order of the days
days = filtered_data_ip[0].unique()

views_per_day_list = []
for day in days: 
    views_per_day_list.append(filtered_data_ip[filtered_data_ip[0] == day].shape[0])
    
vistits_dict =   {
      "id": "Visits",
      "label": "Visits",
      "showMark": False,
      "curve": "linear",
      "stack": "total",
      "area": True,
      "stackOrder": "ascending",
  }
vistits_dict['data'] = views_per_day_list
    
    
# counts_all_visit_times_daily
counts_all_unique_visits_daily = []
filtered_data_date = filtered_data_ip[[0, 3]]
filtered_data_date = filtered_data_date.drop_duplicates()

for day in set(filtered_data_date[0]):
    counts_all_unique_visits_daily.append(filtered_data_date[filtered_data_date[0] == day].shape[0])

unique_vistits_dict =   {
      "id": "Unique",
      "label": "Unique",
      "showMark": False,
      "curve": "linear",
      "stack": "total",
      "area": True,
      "stackOrder": "ascending",
  }
unique_vistits_dict['data'] = counts_all_unique_visits_daily



# Create a defaultdict to store the counts for each day
post_request_counts = defaultdict(int)

# Open and read the log file line by line
with open('app.log', 'r') as file:
    for line in file:
        # Check if the line contains a "GET" request
        if "POST" in line:
            # Extract the date from the line (assuming the format is consistent)
            date_part = line.split()[0]  # This extracts the date (e.g., "2024-09-23")
            
            # Increment the count for this date
            post_request_counts[date_part] += 1

# Print the results for each day
uploads_list = []
for date, count in post_request_counts.items():
    uploads_list.append(count)

unique_uploads_dict =   {
      "id": "Uploads",
      "label": "Uploads",
      "showMark": False,
      "curve": "linear",
      "stack": "total",
      "area": True,
      "stackOrder": "ascending",
  }
unique_uploads_dict['data'] = uploads_list


# Save the result dictionary as w JSON file
with open('Data/visits.json', 'w') as f:
    tmp = [unique_vistits_dict, vistits_dict, unique_uploads_dict]
    json.dump(tmp, f, indent=4)

