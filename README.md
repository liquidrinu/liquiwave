# liquiwave
Need to have installed
- VLC ( v2.2.7 )
- Nodejs ( v8+ )
- NPM ( v5+ ) 

Debian (jessie or higher)

Clone repo then..
#### install dependencies
```
npm install --save
```
#### Configure the port you want to use at local ip
```
nano app.js
```
```js
const port = 1337
```
#### Configure port and passwd for vlc server under [credentials]
```
nano player/vlc.js
```
```js

const vlcPort = 7331    // different port than above!
const vlcPasswd = "secret"
```
#### Start the server 
```
node app.js
```

# Add playlist from Filesystem
{under construction}


# Docs

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

