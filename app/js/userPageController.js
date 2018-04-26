(function () {
    'use strict';
    var app = angular.module('resumeApp');
    app.controller("userPageController",["$scope","$rootScope","userPageService",function ($scope,$rootScope,userPageService) {
        userPageService.loadUserInfo($rootScope.user.username,$rootScope.token,function (data) {
            console.log(data)
        })
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