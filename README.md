
![Automatebound](https://github.com/darklysteamgear/automatebound/assets/61528531/7c8ed467-7938-43c6-8925-6ed3840ddfaa)
# Automatebound: Easy modded server setup
Automatebound is a tool for setting up and constantly updating a modded starbound server with your own personal workshop collection!
Automatebound interfaces directly with the steam workshop through steamcmd, and will automatically update your modded server on a set interval. it uses a caching system alongside nodejs to reduce mod updating downtime for your server! It will also handle initial setup of your modded server alongside your designated steam workshop collection.

Automatebound is designed for those of us who want to run a steam workshop collection on a dedicated server with our own dedicated hardware, and keep that server as updated as possible. This is my solution to this problem! Though there may be better ways of keeping the server constantly updated, I found that waiting and then trying to download new mods in a batch job is less taxing on the system and thus more efficient for larger collections. I have been able to have 3-4 minute downtimes with dialy updates for my large 400 mod workshop collection server by using this tool.

## TO GET STARTED:
DO NOT RUN THIS IN ANY DIRECTORY THAT HAS SPACES IN IT'S NAME, OR IT WILL NOT WORK (example: C:\\I Have Spaces\I\Won't\Work\)!!!

1.) First make sure you install SteamCMD inside of the main directory for this automation script by running steamcmd.exe inside of the SteamCMD folder. A copy of it is included in this project, but feel free to grab your own copy on steam's website

2.) Install nodejs

3.) Install python 3

4.) Make sure you have powershell installed as well if you are using some other system (WARNING: UNTESTED IN LINUX, DON'T EVEN TRY TO USE A MAC)

5.) Open up AAA_STARTSERVER_AAA and edit the file to direct to your Autoupdate.js file

6.) Open up Autoupdater.js, and edit to what you need it to do!

7.) Finally, run AASTART_SERVERAA.bat, and watch it automatically set up your server!

#### OPTIONAL:
-Create a shortcut to AASTART_SERVERAA somewhere on your desktop.

### This application is still in beta, but has worked from my personal tests and I have used it to run my server, evil penguin! Please report any problems. If you want to help out with a custom GUI/coding please let me know as well on discord or github!
