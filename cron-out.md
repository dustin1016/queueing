Create a script file that contains the MySQL query to update the personelStatus column. For instance, create a file named update_personnel_status.sh:

#!/bin/bash

# MySQL query to update personelStatus to "out"
mysql -u your_username -p your_password your_database_name -e "UPDATE personnel SET personelStatus = 'out';"
Replace your_username, your_password, and your_database_name with your actual MySQL credentials and database name.

Make the script executable:

chmod +x update_personnel_status.sh
Open the crontab configuration:

crontab -e

Add a cron job entry to schedule the script to run at 5 pm every day. Add the following line to the crontab 
file:
0 17 * * * /path/to/update_personnel_status.sh
Replace /path/to/update_personnel_status.sh with the actual path where your script file is located.

This cron job will execute the script update_personnel_status.sh every day at 5 pm, which in turn will connect to your MySQL database and update the personelStatus column for all records in the personnel table to "out".

Make sure to test the script manually to ensure it works as expected before scheduling it with cron. Additionally, ensure that the MySQL credentials used in the script have the necessary permissions to perform the update operation on the personnel table.