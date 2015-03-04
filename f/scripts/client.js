var ioc = angular.module('ioc',[]);

ioc.controller('ioctrl',function($scope){
	var soc= io();
	var pw =0;

	$scope.uid =0;
	$scope.que=[];
	$scope.row="";
	$scope.name="";
	$scope.qsize=0;
	
	$scope.submit = function(){
		soc.emit("queadd",{"row":$scope.row,"name":$scope.name,"uid":$scope.uid});
		$scope.row="";
		$scope.name="";
	};
	
	soc.on("quedata",function(data){
		$scope.que=data;
		$scope.qsize=data.length;
		$scope.$apply();
	});

	soc.on("userinfo",function(data){
		$scope.uid = data.uid;
		pw= data.pw;
	});

	soc.on("err",function(err){
		console.log("error! msg: "+err.msg);
	});

	$scope.popfirst = function(){
		soc.emit("quepopfirst","");	
	};
	$scope.querm = function(qid){
		data = {"qid":qid,"pw":pw};
		soc.emit("quedelete",data);	
	};
});
