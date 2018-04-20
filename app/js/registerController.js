/**
 * Created by LuDan on 2018/4/17
 */
(function () {
    'use strict';
    var app = angular.module('resumeApp',[]);
    app.constant('domain', "http://localhost:8080");//把服务器地址定义为一个全局变量
    app.controller("registerController", ["$scope", "registerService","$rootScope", function ($scope, registerService, $rootScope) {
        $scope.register = function(username,password,surePwd){
            if (username == null || password == null || surePwd == null){
                errorTip("请输入完整信息！");
            }else{
                //校验手机号的正则表达式
                var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (phoneReg.test(username)){
                    //校验密码的正则表达式，只能输入6-20个字母、数字、下划线
                    var passwordReg = /^(\w){6,20}$/;
                    if (passwordReg.test(password)){
                        if (password == surePwd){
                            var user = {
                                "username" : username,
                                "password" : password
                            };
                            registerService.userRegister(user,function(data){
                                console.log(data)
                                successTip("注册成功");
                                window.setTimeout("location.href='sign_in.html'",1200);
                            })
                        }else {
                            errorTip("两次输入密码不一致！");
                            $scope.password = "";
                            $scope.surePwd = "";

                        }
                    }else{
                        errorTip("密码不符合规范，请重新输入！");
                        $scope.password = "";
                        $scope.surePwd = "";
                    }
                }else{
                    errorTip("请输入正确的手机号！");
                    $scope.username = "";
                }

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