(function () {
    'use strict';
    var app = angular.module('resumeApp',[]);
    app.controller("loginController", ["$scope", "loginService","$rootScope", function ($scope, loginService, $rootScope) {
        $scope.signIn = function(user){
            loginService.loadLoginInfo(user,function(data){
                console.log(data)
                if (angular.isObject(data)){
                    swal({
                        title:"登录成功",
                        type:"success",
                        timer:1000,
                        showConfirmButton:false
                    });
                    window.setTimeout("location.href='http://localhost:8080'",1200);
                }else{
                    swal({
                        title:"手机号或密码错误",
                        type:"error",
                        timer:1000,
                        showConfirmButton:false
                    });
                    user.account="";
                    user.password="";
                }
            })
        }

    }]);

    app.service("loginService", ["$http",function ($http) {
        this.loadLoginInfo = function (user,callback) {
            $http({
                method:'POST',
                url:'/user/signIn',
                data :user
            }).then(function(data){
                if (callback) {
                    callback(data.data);
                }
            });
        }
    }]);
})();