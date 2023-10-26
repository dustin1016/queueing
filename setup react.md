To automatically start your React website's npm build command when your Ubuntu machine boots up, you can use systemd, a system and service manager for Linux. Here's a step-by-step guide on how to create a systemd service for your React project:

Create a Service File:
Open a terminal and create a systemd service file. Use a text editor to create a new service file for your React project. Replace <your-username> and <your-react-project> with your actual username and project details.

bash

sudo nano /etc/systemd/system/react-auto-start.service
Edit the Service File:
Inside the text editor, add the following content to the service file:

ini

[Unit]
Description=React Auto Start Service

[Service]
ExecStart=/usr/bin/npm start
WorkingDirectory=/path/to/your/react/project
Restart=always
User=<your-username>
Group=<your-username>

[Install]
WantedBy=multi-user.target
ExecStart: This is the command that will be executed when the service starts. Change it to the npm build command you want to use (e.g., /usr/bin/npm run build).

WorkingDirectory: Replace /path/to/your/react/project with the actual path to your React project.

User and Group: Replace <your-username> with your Ubuntu username.

Save and Exit:
In Nano, you can save and exit by pressing Ctrl+O, then Enter, and finally Ctrl+X.

Reload systemd:
After creating the service file, reload systemd to recognize the new service:


sudo systemctl daemon-reload
Enable and Start the Service:
Enable the service to start on boot and start it:


sudo systemctl enable react-auto-start
sudo systemctl start react-auto-start
Check the Status:
You can check the status of the service to ensure it's running:


sudo systemctl status react-auto-start
If everything was set up correctly, your React project's build process should automatically start when your Ubuntu machine boots up. You can also stop, restart, or check the status of the service using systemctl.


× react-start.service - React Auto Start Service
     Loaded: loaded (/etc/systemd/system/react-start.service; enabled; preset: enabled)
     Active: failed (Result: exit-code) since Thu 2023-10-26 16:13:59 +08; 1h 34min ago
   Duration: 8ms
    Process: 752 ExecStart=/usr/bin/npm run build (code=exited, status=200/CHDIR)
   Main PID: 752 (code=exited, status=200/CHDIR)
        CPU: 8ms

Oct 26 16:13:59 ubuntu-Aspire-XC-710 systemd[1]: react-start.service: Scheduled restart job, restart counter is at 4.
Oct 26 16:13:59 ubuntu-Aspire-XC-710 systemd[1]: Stopped react-start.service - React Auto Start Service.
Oct 26 16:13:59 ubuntu-Aspire-XC-710 systemd[1]: Started react-start.service - React Auto Start Service.
Oct 26 16:13:59 ubuntu-Aspire-XC-710 systemd[1]: react-start.service: Main process exited, code=exited, status=200/CHDIR
Oct 26 16:13:59 ubuntu-Aspire-XC-710 systemd[1]: react-start.service: Failed with result 'exit-code'.
Oct 26 16:13:59 ubuntu-Aspire-XC-710 systemd[1]: react-start.service: Scheduled restart job, restart counter is at 5.
Oct 26 16:13:59 ubuntu-Aspire-XC-710 systemd[1]: Stopped react-start.service - React Auto Start Service.
Oct 26 16:13:59 ubuntu-Aspire-XC-710 systemd[1]: react-start.service: Start request repeated too quickly.
Oct 26 16:13:59 ubuntu-Aspire-XC-710 systemd[1]: react-start.service: Failed with result 'exit-code'.
Oct 26 16:13:59 ubuntu-Aspire-XC-710 systemd[1]: Failed to start react-start.service - React Auto Start Service.
