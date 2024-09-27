### Steps to run the python script using cron: 

Open the crontab file for editing:

`crontab -e`
* Add the following line to run the Python script every minute:

`* * * * * /usr/bin/python3 /path/to/your_script.py`

* The asterisks * * * * * represent minute, hour, day, month, and weekday respectively. This configuration will run the script every minute.
Replace /usr/bin/python3 with the path to your Python interpreter (you can find it using which python3), and /path/to/your_script.py with the actual path to your Python script.

* Don't forget to set the permissions to write for the python script: `chmod +w /path/to/parent-directory`