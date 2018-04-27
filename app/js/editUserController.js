(function () {
    'use strict';
    var app = angular.module('resumeApp');
    app.controller("editUserController",["$scope","$rootScope","editUserService","userPageService",function ($scope,$rootScope,editUserService,userPageService) {
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
            if (data.extra == null){
                $scope.user.extra = "您还没有留下什么痕迹哦~"
            }

            $scope.updateUser = function (user) {
                editUserService.updateUserInfo(user,$rootScope.token,function (data) {

                })
            }
        })
    }]);

    app.service("editUserService",["$http","domain",function ($http,domain) {
        this.updateUserInfo = function (user,token,callback) {
            $http({
                url : domain + '/api/select/info',
                method : 'POST',
                headers : {
                    'Authorization' : "Bearer "+token
                },
                data : JSON.stringify(user)
            }).then(function (data) {
                if (callback){
                    callback(data.data.data)
                }
            })

        }
    }]);

})();