var logapp = angular.module('logapp',[]);

logapp.controller("logctrl",function($scope){
    $scope.logmessages = [];
    var socket= io();
    socket.on("connect",function(data){
        socket.emit("logsubscribe","logclient");
        console.log("socket connected");
    });
    socket.on("logmessage",function(data){
         
    $scope.logmessages.push(data);
    $scope.$apply();
    });
});
