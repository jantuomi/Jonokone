var ioc = angular.module('ioc', []);

ioc.controller('ioctrl', function($scope) {
    var soc = io();
    var pw = 0;

    $scope.uid = 0;
    $scope.que = [];
    $scope.row = "";
    $scope.name = "";
    $scope.qsize = 0;
    $scope.outdated = true;
    $scope.error_message = "";

    $scope.submit = function() {
        if ($scope.row == "")
            $scope.error_message = "Valitse rivi ennen lisäämistä!";
        else if ($scope.name == "")
            $scope.error_message = "Kirjoita nimesi ennen lisäämistä!";
        else {
            soc.emit("queadd", {
                "row":  $scope.row,
                "name": $scope.name,
                "uid":  $scope.uid
            });
            $scope.error_message = "";
            $scope.row = "";
            $scope.name = "";
        }
    };

    soc.on("quedata", function(data) {
        $scope.que = data;
        $scope.qsize = data.length;
        $scope.outdated = false;
        $scope.$apply();
    });

    soc.on("userinfo", function(data) {
        $scope.uid = data.uid;
        pw = data.pw;
    });

    soc.on("disconnect", function(data) {
        setTimeout(function() {
            console.log("blblbl");
            $scope.uid = data.uid;
            pw = data.pw;
            $scope.$apply();
        }, 1000);
    });

    soc.on("err", function(err) {
        console.log("error! msg: " + err.msg);
    });

    $scope.popfirst = function() {
        $scope.outdated = true;
        soc.emit("quepopfirst", "");
    };

    $scope.querm = function(qid) {
        data = {
            "qid": qid,
            "pw":  pw
        };
        soc.emit("quedelete", data);
    };
});