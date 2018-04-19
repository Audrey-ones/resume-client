(function () {
    'use strict';
    var app = angular.module('resumeApp',[]);
    app.constant('domain', "http://localhost:8080");//把服务器地址定义为一个全局变量
    app.controller("loginController", ["$scope", "loginService","$rootScope", function ($scope, loginService, $rootScope) {
        $scope.signIn = function(account,password){
            var userInfo = {
                "username" : account,
                "password" : password,
                "rememberMe" : true
            };
            loginService.loadLoginInfo(userInfo,function(data){
                console.log(data)
                /*if (angular.isObject(data)){
                    if (data.password == user.password){
                        swal({
                            title:"登录成功",
                            type:"success",
                            timer:1000,
                            showConfirmButton:false
                        });
                        window.setTimeout("location.href='http://localhost:8090'",1200);
                    }else{
                        swal({
                            title:"密码错误，请重试！",
                            type:"error",
                            timer:1000,
                            showConfirmButton:false
                        });
                        user.password="";
                    }

                }else{
                    swal({
                        title:"手机号错误",
                        type:"error",
                        timer:1000,
                        showConfirmButton:false
                    });
                    user.account="";
                }*/
            })
        }

    }]);

    app.service("loginService", ["$http","domain",function ($http,domain) {
        this.loadLoginInfo = function (userInfo,callback) {
            $http({
                method:'POST',
                url:domain + '/api/jwt-token',
                data : JSON.stringify(userInfo)
            }).then(function(data){
                if (callback) {
                    callback(data.data);
                }
            });
        }
    }]);
})();