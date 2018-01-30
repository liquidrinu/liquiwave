# liquiwave
Need to have installed VLC on Debian and Node js

Clone repo then..

######Configure the port you want to use at local ip
```
nano app.js
```
```
const port = [port]
```
######Configure port and passwd for vlc server under [credentials]
```
nano player/vlc.js
```
```
const vlcPort = [string];
const vlcPasswd = [string];
```
######install dependencies
```
npm install --save
```
######Start the server 
```
node app.js
```

## client scripts
```
public/scripts/traverse.js
```
- This contain the logic that traverses the JS object that shadows the filesystem.
- includes functions to create HTML elements and place them in a container. 
- responsible for requesting the file to be played at the server.
- keep search history in localstorage.
```
public/scripts/client.js
```
- This contains code to control vlc from the client and get the xml data

## server scripts
```
player/vlc.js
```
- This file spawn a child process to launch vlc on server on a separate thread
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

