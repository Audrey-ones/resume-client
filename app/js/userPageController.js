(function () {
    'use strict';
    var app = angular.module('resumeApp');
    app.controller("userPageController",["$scope","$rootScope","userPageService",function ($scope,$rootScope,userPageService) {
        if ($rootScope.token == undefined){
            location.href='http://localhost:8090';
        }

        userPageService.loadUserInfo($rootScope.user.username,$rootScope.token,function (data) {
            $scope.user=data;
            initUserInfo(data);
        });

        //初始化用户信息
        function initUserInfo(data) {
            if (data.jobStatus == 0){
                $scope.jobStatus = "正在找工作";
            }
            if (data.jobStatus == 1){
                $scope.jobStatus = "在职";
            }
            if (data.jobStatus == 2){
                $scope.jobStatus = "离职";
            }
        }
    }]);

    app.service("userPageService",["$http","domain",function ($http,domain) {
        this.loadUserInfo = function (username,token,callback) {
            $http({
                url : domain + '/api/select/info',
                method : 'POST',
                headers : {
                    'Authorization' : "Bearer "+token
                },
                params: {
                    username:username
                }
            }).then(function (data) {
                if (callback){
                    callback(data.data.data)
                }
            })

        }
    }]);

})();