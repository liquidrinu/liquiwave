# liquiwave

### app.js

Declare the port you want to use at local ip
```
const port = [port]
```
Start the server 
```
node app.js
```

## client scripts
This contain the logic that traverses the JS object that shadows the filesystem. It also includes functions to create HTML elements and place them in a container. This file is also responsible for requesting the file to be played at the server, and keep search history in localstorage.
```
public/scripts/traverse.js
```
This contains code to control vlc from the client and get the xml data
```
public/scripts/client.js
```

## server scripts
This file spawn a child process to launch vlc on server on a separate thread
```
player/vlc.js
```
It's command [args]
```
player/vlc_config.js
```
This file translates client string types to their equivalent shell commands
```
player/commands.js
```
#### tree.js
This file takes a starting directory and creates a JSON object representing it's hierarchy recursively, consisting of nested object-arrays.
```
tree.js
```
