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
		log("adding new que entry with user: " +data.name+ " , row " +data.row);
    data.qid= Date.now();

  	que.push(data);
		io.emit("quedata",que);
  });
	socket.on("quepopfirst",function(data){
  	    var deleted = que.shift();
        log("admin deleted "+ deleted.name +" from que");
		io.emit("quedata",que);

  });
  socket.on("quedelete",function(data){
    for (var i=0;i<que.length;i++){
      if (que[i].qid == data.qid){
        if (data.pw != pws[que[i].uid]){
          socket.emit("err",{"msg":"you're not allowed to remove this entry"});
          break;
        }
        log(que[i].name+" deleted himself from que");
        que.splice(i,1);
        io.emit("quedata",que);
        break;
      }
    }
  });

});

function getTimeString()
{
    return Date().toLocaleString();
}

function log(msg){
    console.log(getTimeString()+": "+msg);
}

http.listen(80, function(){
  log('listening on *:80');
});
