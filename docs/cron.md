### Steps to run the python script using cron:

Open the crontab file for editing:

```bash
crontab -e

chmod +x /home/vicente/dec/Adversarial-Machine-Learning/back-end/update.py

every hour
0 * * * * /usr/bin/python3 /home/vicente/dec/Adversarial-Machine-Learning/back-end/update.py

every 10 min
*/10 * * * * /usr/bin/python3 /home/vicente/dec/Adversarial-Machine-Learning/back-end/update.py

```
This will run your script every hour at the start of the hour.