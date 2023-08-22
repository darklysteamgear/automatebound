//Automatebound: Easy modded server setup
//the start of a server application that interfaces with the steam web API to pull mods from workshop collections, and should check if an item has updated on the workshop in the collection
//or wait a specified amount of time to update the mods folder with up-to-date mods.
//Orginally By Darkly SteamGear
//Powershell script is a modified version of Archemedes' workshop file script

//THE SETUP PROCESS:
//First make sure you install SteamCMD inside of the main directory for this automation script by running steamcmd.exe inside of the SteamCMD folder.
//A copy of it is included in this project, but feel free to grab your own copy on steam's website
//Install nodejs
//Install python 3
//Make sure you have powershell installed as well if you are using some other system (WARNING: UNTESTED IN LINUX, DON'T EVEN TRY TO USE A MAC)
//there was an issue that occured when microsoft word was not installed alongside powershel, but that issue is resolved.
//Open up AAA_STARTSERVER_AAA and edit the file to direct and run this file
//Open up Autoupdater.js, and edit everything below this line to what you want:


//_________EDIT AS NEEDED_____________
//The name of the server
var nameOfServer = "NAMEOFSERVER";

//your steam username and password
var user = "USERNAME";
var pass = "PASSWORD";

//the ID of the game
var gameId = "211820";

//the ID of the game's dedicated server files
var serverId = "533830"

//the path of your server
var serverDir = "D:\\SERVER\\DIRECTORY\\NOSPACES\\";

//the ID of the collection you wish to use for your server
var collectionID = 12345678;

//The ID of the first workshop item (Because of file encoding weirdness)
var firstWorkshopID = 12345678;

//This will automatically set everything up for you to get started with a completely new modded starbound server.
var installServer = true;

//The time the script will wait before autoupdating again (in ms)
WAIT_TIME = 30000;

//DO NOT EDIT ANYTHING BELOW THIS




//Globals
//The server childprocess import
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const steamcmd_child = require("child_process");
const server_child = require("child_process");
const powershell_child = require("child_process");
const timer_child = require("child_process");
const copypaste_child = require("child_process");
const kill_child = require("child_process");
var psCode = [];
var a = "a";
var b = "b";
var out = "";
//set the first run to true
var firstRun = true;
var serverNotInstalled = true;

//the current location
var dir = process.cwd();

//the current directory
var steamCmdDir = String(dir) + "\\SteamCMD\\";

//the directory of the cache for steam
var serverCacheDir = String(dir) + "\\ServerCache\\";

//some random multithreading js tomfoolery
//probably summons the magic bananas that make the code good
process.chdir(steamCmdDir);
var fs = require("fs");



//this function was a pain in the butt to make
//HECK this function
//reads files and puts them into an array by line.
function read_file(fileDir){
	var array = [];

//I SAID THIS DAMMIT
this.array = fs.readFileSync(fileDir).toString().split("\n");
for(i in this.array) {
    //console.log(this.array[i]);
}
return this.array;
}


//this function basically gets the server ready by going into the server cache and updating all of the subbed workshop mods and the client.
//getting them ready for an endless loop of auto updating everytime a new mod updates.
function server_setup(){

//if no server directory exists
if (!fs.existsSync(serverDir)){
    console.log("NO SERVER DIRECTORY FOUND. MAKING ONE AT: " + String(serverDir));
    fs.mkdirSync(serverDir);
    }

//if the steamcmd exists
if (fs.existsSync(steamCmdDir)){
	read_ps_script(overwrite_ps_script)

	    if (!fs.existsSync(serverCacheDir)){
    	fs.mkdirSync(serverCacheDir);
    }
        console.log("please note that if this is your first time, run steamCMD manually");

        //you better run it manually you butt

     
}

//you heck, you don't have steamcmd. go get it
else{
	throw new Error("NO STEAMCMD FOLDER DETECTED! Please install steamcmd inside a folder called SteamCMD inside the same folder as the autoupdater server\n (.../autoupdater/SteamCMD)");
}
}


//this function will start up the server if there is no server running in the server child
//ARGUMENTS: serverExecutable: The exact name and directory of the server file
function run_server(server_dir){
	console.log("Here is the SERVER DIR: " + String(serverDir))

	if (fs.existsSync(serverDir)){
    
        //Check if this is the first time the server has been ran
        if (firstRun == false){
            start_server_again(String(serverDir));
            timerFunc = timer_child.spawn(String(dir) + "\\timer.bat",{shell:true, detached:true});
            timerFunc.on("exit", function() {
            	read_ps_script(overwrite_ps_script);
            });
        }

        else{
            //Run the server for the first time
            	start_server();
            	timerFunc = timer_child.spawn(String(dir) + "\\timer.bat",{shell:true, detached:true});
            	            timerFunc.on("exit", function() {
            	read_ps_script(overwrite_ps_script);
            });
        }
    }
    //else make a directory and add all necissary server files to the directory
    else{
        console.log("NO SERVER FOUND. MAKING ONE AT: " + String(serverDir))
    	fs.mkdir(serverDir);
    }
};


//this function starts up the very first instance of the server
function start_server(server_dir){
	console.log("THIS IS THE SERVER DIR " + String(serverDir))
	starboundServer = server_child.spawn(String(serverDir) + "\\run.bat",{shell:true, detached:true});
    starboundServer.on("data", args =>{ process.stdout.write("--" + String(nameOfServer) + "--\n"  + args[0])});
    output_data(starboundServer);
    process.stdin.pipe(starboundServer.stdin);
    firstRun = false;
}

//this function starts up every other instance of the server.
function start_server_again(server_dir){

    //if there is no server running in the child node. had to remove error thing.
        //Run the server
        starboundServer = server_child.spawn(String(serverDir)+ "\\run.bat",{shell:true, detached:true});
        starboundServer.on("data", args =>{ process.stdout.write("--" + nameOfServer + "--\n"  + args[0])});
        output_data(starboundServer);
        process.stdin.pipe(starboundServer.stdin);

};


//This function will kill the server inside the server child
function kill_server(){

        //End it's miserable life
        //it doesn't deserve to live
        //steamCmd.kill('SIGINT');
        serverKill = kill_child.spawn(String(dir) + "\\serverkiller.bat",{shell:true, detached:true});
        
};


//this function outputs server data to the console
function output_data(childpar){
// Echoes any command output 
childpar.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
});
// Error output
childpar.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});
// Process exit
childpar.on('close', function (code) {
  console.log('child process exited with code ' + code);
});
}


//complete insanity, callback functions for powershell stuff
function read_mod_text(){
var fs = require("fs");
var tex = fs.readFileSync(String(serverDir) +"mods_list.txt").toString("utf-16LE");
var modIds = tex.split("\n");
//console.log("TEXT 1: " + String(modIds));
return modIds;
}
	
//complete insanity, callback functions for powershell stuff
function read_ps_script(callback){
	psCode = read_file(String(dir) + "\\WorkshopSearcher.ps1");
	setTimeout(_=>{callback();},5000);
}

//overwrites the original powershell script with new data
function overwrite_ps_script(){
	setTimeout(_=>{psCode[16] = "$WorkshopCollectionURL = 'http://steamcommunity.com/sharedfiles/filedetails/?id=" + String(collectionID) +"'";
    psCode[20] = "$ModList = '"+ String(serverDir) +"mods_list.txt'";
    psCode[21] = "$ModDesc = '"+ String(serverDir) +"mods_desc.txt'";
    //console.log("This is pscode: " + psCode[16]);
    joinedPsCode = psCode.join("\n");
    fs.writeFileSync(String(dir) + "\\WorkshopSearcher.ps1",this.joinedPsCode,{encoding:'utf8',flag:'w'});
}, 100);
	execute_ps_script();
    
}

//this function executes the power shell script
function execute_ps_script(){
	console.log("EXECUTING POWERSHELL SCRIPT")
	psScript = powershell_child.spawn("powershell.exe", [" Set-ExecutionPolicy RemoteSigned; ", String(dir) + "\\WorkshopSearcher.ps1"],{shell:true, detached:true});
	output_data(psScript);
	psScript.on("exit", function() {
		get_steamcmd_commands(execute_steamcmd_commands);
})


}
//This function downloads all of the workshop files found in the collection by the powershell script
function get_steamcmd_commands(callback){
	      	  modIdList = read_mod_text();
	      	  out += "login "+ user + " " + pass + "\n" + "force_install_dir "  + serverCacheDir + "\napp_update " + String(serverId)
    return new Promise((resolve, reject) => {
      for (index = 0; index < (modIdList.length-1); index++) {
      	if (index == 0){
      		modder = modIdList[index].toString("");
      		out += " \nworkshop_download_item " + String(gameId)+ " " + firstWorkshopID+"\n";
      	}
      	else if (index == modIdList.length-2){
      			out += "workshop_download_item " + String(gameId)+ " " + modIdList[index] +"\nexit";
      		}
      	else{
      		out += "workshop_download_item " + String(gameId)+ " " + modIdList[index] +"\n";
      	}
         }
         fs.writeFileSync(String(dir) + "\\updatemods.txt",out,{encoding:'utf-8',flag:'w'});
         //console.log("THIS IS INITIAL OUT: " + String(out))
         resolve();
         setTimeout(_=>{callback();},5000);
         return out;

     })

    
}
//Executes commands using a steam command line child process. When the steam command line child process is finished, run the mod copy paste function.
function execute_steamcmd_commands(){
	out = "";
    steamCmd = steamcmd_child.spawn(steamCmdDir + "steamcmd.exe +runscript " + String(dir) + "\\updatemods.txt",{shell:true, detached:true})
    console.log("STEAM CMD CHILDTHREAD STARTED");
        output_data(steamCmd);
     steamCmd.on('exit', function() {
      		console.log("COPYING AND PASTING MODS FROM CACHE")
      		copy_paste_mods();
      		
      }); 
}
//This will run the python script to copy, paste, and update mods inside of the specified mods folder
function copy_paste_mods(){
	if (firstRun != true){
		kill_server()
	}
    console.log("What the hell");
    if (installServer == false){
            copyPaster = copypaste_child.spawn("py", [String(dir) + "\\copypaste.py", "-b=" + String(serverDir), "-c=" + String(serverCacheDir), "steamapps\\workshop\\content\\" + String(gameId) ,"-i=n", "-sid=" + String(serverId)],{shell:true, detached:true});
            console.log("COPYING MODS FROM CACHE TO SERVER MODS FOLDER");
    }
    if (installServer == true){
            copyPaster = copypaste_child.spawn("py", [String(dir) + "\\copypaste.py", "-b=" + String(serverDir), "-c=" + String(serverCacheDir) + "steamapps\\workshop\\content\\" + String(gameId) ,"-i=y", "-sid=" + String(serverId)],{shell:true, detached:true});
            console.log("NO SERVER FILES FOUND. COPYING MODS AND MAIN SERVER FILES FROM CACHE TO SERVER FOLDER");
            installServer = false;
    }
	copyPaster.on('exit', function(){
		run_server(serverDir);
	})
}

//oh wow Im tired
//I should probably do that actual project I was supposed to be doing for school. Hi past me, we passed school and now no more homework :D. If you are en employer I am looking for work
//In automation engineering for software or systems. I have a BS in computer engineering and experience in PLC logic.

//and the actual execution of the program

//read_ps_script(overwrite_ps_script);

server_setup();


console.log("Server started");

//yay