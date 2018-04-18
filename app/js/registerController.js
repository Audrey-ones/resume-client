(function () {
    'use strict';
    var app = angular.module('resumeApp',[]);
    app.controller("registerController", ["$scope", "registerService","$rootScope", function ($scope, registerService, $rootScope) {
        $scope.register = function(user){
            if (user.nickname != "" && user.account != null && user.password != null){

                registerService.userRegister(user,function(data){
                    console.log(data)
                    swal({
                        title:"注册成功",
                        type:"success",
                        timer:1000,
                        showConfirmButton:false
                    });
                    /*window.setTimeout("location.href='sign_in.html'",1200);*/
                    $state.go("sign_in.html");
                })
            }else {
                console.log(user.nickname)
                swal("必填项不能为空！","error");
            }

        }

    }]);

    app.service("registerService", ["$http",function ($http) {
        this.userRegister = function (user,callback) {
            $http({
                method:'POST',
                url:'/user/register',
                /*url :'../json/userList.json',*/
                data :user
            }).then(function(data){
                if (callback) {
                    callback(data);
                }
            });
        }
    }]);
})();