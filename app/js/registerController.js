(function () {
    'use strict';
    var app = angular.module('resumeApp',[]);
    app.constant('domain', "http://localhost:8080");//把服务器地址定义为一个全局变量
    app.controller("registerController", ["$scope", "registerService","$rootScope", function ($scope, registerService, $rootScope) {
        $scope.register = function(username,password,surePwd){
            if (username == null || password == null || surePwd == null){
                swal({
                    title:"请输入完整信息！",
                    type:"error",
                    timer:1000,
                    showConfirmButton:false
                });
            }else{
                if (password == surePwd){
                    var user = {
                        "username" : username,
                        "password" : password
                    };
                    registerService.userRegister(user,function(data){
                        console.log(data)
                        swal({
                            title:"注册成功",
                            type:"success",
                            timer:1000,
                            showConfirmButton:false
                        });
                        window.setTimeout("location.href='sign_in.html'",1200);
                    })
                }else {
                    swal({
                        title:"两次输入密码不一致！",
                        type:"error",
                        timer:1000,
                        showConfirmButton:false
                    });
                    $scope.password = "";
                    $scope.surePwd = "";

                }
            }



        }

    }]);

    app.service("registerService", ["$http","domain",function ($http,domain) {
        this.userRegister = function (user,callback) {
            $http({
                method:'POST',
                url:domain + '/api/register/user',
                data : JSON.stringify(user)
            }).then(function(data){
                if (callback) {
                    callback(data);
                }
            });
        }
    }]);
})();