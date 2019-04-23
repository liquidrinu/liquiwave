### important! this repo is unmaintained

# liquiwave
Need to have installed:
- Debian v8.0-v9.0
- Wget
- VLC  v2.2.7
- Nodejs v8+
- NPM v5+

```bash
apt-get install wget vlc nodejs npm -y
````
## Description
local webclient to listen to audio, either from local filesystem or through say a youtube url pasted in the textbox.

###### ** livestreams not supported

## Installation

Clone repo then cd into it..
#### install dependencies
```
npm install
```
#### Configure the port you want to use at local ip
```
nano app.js
```
```js
const port = 1337
```
#### Configure port and set a password for vlc under [credentials]
```
nano player/vlc.js
```
```js
// use a different port than app.js!
const vlcPort = 7331 
const vlcPasswd = "secret"
```
#### Start the server 
```
node app.js
```
*Visit http://[local ip]:[port] using the port defined in app.js*

## Create playlist from a Local directory
To add local directory to app
```
nano tree.js
```
Enter path
```js
// absolute path preferred
const local = "/your/path/to/local/directory" 
```
Execute
```
node tree.js
```
*pro-tip: If it's a big directory you might want to grab a coffee*

enjoy!

###### ** Currently only one object is supported
###### ** Recommended to put everything under one directory, for example a "dummy" linux home directory "/home/media/"
###### ** files extensions will be sorted by the application code and need no pre-formatting
# Docs

## client scripts
```
public/scripts/traverse.js
```
- This contain the logic that traverses the JS object that shadows the filesystem.
- includes functions to create HTML elements and place them in a container. 
- responsible for requesting the file to be played at the server.
- keep search history in local storage of your browser.
```
public/scripts/client.js
```
- This contains code to control vlc from the client and get the xml data

## server scripts
```
player/vlc.js
```
- This file spawns a child process to launch vlc on server on a different process
```
player/vlc_config.js
```
- It's command [args]
```
player/commands.js
```
- This file translates client string types to their equivalent shell commands
## tree.js
```
tree.js
```

- This file takes a starting directory and creates a JSON object representing it's hierarchy recursively, consisting of nested object-arrays.

