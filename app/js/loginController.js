/**
 * Created by LuDan on 2018/4/17
 */
(function () {
    'use strict';
    var app = angular.module('resumeApp',[]);
    app.constant('domain', "http://localhost:8080");//把服务器地址定义为一个全局变量
    app.controller("loginController", ["$scope", "loginService","$rootScope", function ($scope, loginService, $rootScope) {
        $scope.signIn = function(account,password){
            //手机号正则校验
            var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (phoneReg.test(account)){
                //密码正则校验
                var passwordReg = /^(\w){6,20}$/;
                if (passwordReg.test(password)){
                    var userInfo = {
                        "username" : account,
                        "password" : password,
                        "rememberMe" : true
                    };
                    loginService.loadLoginInfo(userInfo,function(data){
                        console.log(data)
                        if (data.msg == "请求成功"){
                            successTip("登录成功！");
                            window.setTimeout("location.href='http://localhost:8090'",1200);
                        }
                        if (data.msg == "用户不存在"){
                            errorTip("用户不存在");
                            $scope.account="";
                            $scope.password="";
                        }
                        if (data.msg == "密码不正确"){
                            errorTip("密码不正确，请重试！");
                            $scope.password="";

                        }
                    })
                }else{
                    errorTip("请输入6-20个字母、数字、下划线组成的密码！");
                    $scope.password = "";
                }
            }else{
                errorTip("请输入正确的手机号！");
                $scope.account = "";
            }

        };

        //成功的提示框
        function successTip(tip){
            swal({
                title:tip,
                type:"success",
                timer:1000,
                showConfirmButton:false
            });
        }

        //有误的提示框
        function errorTip(tip){
            swal({
                title:tip,
                type:"error",
                timer:1000,
                showConfirmButton:false
            });
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