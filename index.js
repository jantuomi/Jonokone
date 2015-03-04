var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var que = [];
var pws = {};

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
  var uid = Date.now();
  var pw =  Math.random()*10000000 + Math.random()*10000000 -1;
  pws[uid] = pw;


  socket.emit("userinfo",{"uid":uid,"pw":pw});
  socket.emit("quedata",que);
  
   
  socket.on("queadd",function(data){
		console.log("adding new que entry with user :" );
    data.qid= Date.now();

  	que.push(data);
		io.emit("quedata",que);
  });
	socket.on("quepopfirst",function(data){
		console.log("deleting first from que");
  	que.shift();
		io.emit("quedata",que);

  });
  socket.on("quedelete",function(data){
    for (var i=0;i<que.length;i++){
      if (que[i].qid == data.qid){
        if (data.pw != pws[que[i].uid]){
          socket.emit("err",{"msg":"you're not allowed to remove this entry"});
          break;
        }
        console.log("deleting: "+ que[i].name);
        que.splice(i,1);
        io.emit("quedata",que);
        break;
      }
    }
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
