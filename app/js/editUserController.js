(function () {
    'use strict';
    var app = angular.module('resumeApp');
    app.controller("editUserController",["$scope","$rootScope","$state","editUserService","userPageService",
        function ($scope,$rootScope,$state,editUserService,userPageService) {
        if ($rootScope.token == undefined){
            location.href='http://localhost:8090';
        }
        userPageService.loadUserInfo($rootScope.user.username,$rootScope.token,function (data) {
            $scope.user=data;
            if (data.jobStatus == 0){
                $("#job_status").val(data.jobStatus);
            }
            if (data.jobStatus == 1){
                $("#job_status").val(data.jobStatus);
            }
            if (data.jobStatus == 2){
                $("#job_status").val(data.jobStatus);
            }

            $scope.updateUser = function (user) {
                /*console.log(user)*/
                user.jobStatus = $("#job_status").val();
                editUserService.updateUserInfo(user,$rootScope.token,function (userData) {
                    successTip("修改成功！");
                    $state.go('userPage');
                })
            }

            //成功的提示框
            function successTip(tip){
                swal({
                    title:tip,
                    type:"success",
                    timer:1000,
                    showConfirmButton:false
                });
            }
        })
    }]);

    app.service("editUserService",["$http","domain",function ($http,domain) {
        this.updateUserInfo = function (user,token,callback) {
            $http({
                url : domain + '/api/update/info',
                method : 'PUT',
                headers : {
                    'Authorization' : "Bearer "+token
                },
                data : JSON.stringify(user)
            }).then(function (data) {
                if (callback){
                    callback(data.data)
                }
            })

        }
    }]);

})();