var ioc = angular.module('ioc',[]);

ioc.controller('ioctrl',function($scope){
	var soc= io();
	$scope.que=[];
	$scope.row="";
	$scope.name="";
	$scope.qsize=0;
	
	$scope.submit = function(){
		soc.emit("queadd",{"row":$scope.row,"name":$scope.name});
		$scope.row="";
		$scope.name="";
	};
	
	soc.on("quedata",function(data){
		$scope.que=data;
		$scope.qsize=data.length;
		$scope.$apply();
	});

	$scope.popfirst = function(){
		soc.emit("quepopfirst","");	
	};

});
