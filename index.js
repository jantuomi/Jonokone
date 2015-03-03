var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var que = []

app.get('/', function(req, res){
  res.sendFile(__dirname + '/f/templates/index.html');
});
app.get('/adm', function(req, res){
  res.sendFile(__dirname + '/f/templates/adm.html');
});

//route all paths beginning with /f/ to real files 
app.get('/f/*', function(req, res){
  res.sendFile(__dirname + req.path);
});


io.on('connection', function(socket){
  socket.emit("quedata",que);
   
  socket.on("queadd",function(data){
		console.log("adding new que entry");
  	que.push(data);
		io.emit("quedata",que);
  });
	socket.on("quepopfirst",function(data){
		console.log("deleting first from que");
  	que.shift();
		io.emit("quedata",que);
  });



});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
