# liquiwave

### app.js

Declare the port you want to use at local ip

```
const port = [port]
```
Start the server and declare route using:
```
node app.js
```

## whats in this repo??
### client scripts
This contains code to control vlc from the client and get the xml data
```
public/scripts/client.js
```
This contain the logic that traverses the JS object that shadows the filesystem. 
```
public/scripts/traverse.js
```
### server scripts
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
