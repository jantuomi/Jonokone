#Jonokone
A simple queue system implementation based on [okalintu/Que](https://github.com/okalintu/Que).

##Dependencies
* nodejs
* angular.js
* socket.io
* express.js

##Installation
* Clone the repository
* Install dependencies with ```npm install```
* Run ```node index.js```
* Open ```localhost:$PORT``` (default port: 5000)

##Usage
* start with command ```node index.js``` (note that ports under 1000 will require sudo rights)
* admin mode at ```$PATH/adm``` (can be used to remove the first person from the queue)
 *   example: ```localhost:5000/adm```
* logging at ```$PATH/log```
