(function () {
    'use strict';
    var app = angular.module("resumeApp");
    app.controller("workCtrl",["$scope","$rootScope","$state","workService",function ($scope,$rootScope,$state,workService) {
        var username = $rootScope.user.username;
        var token = $rootScope.token;

        workService.loadWorkInfo(username,token,function (data) {
            $scope.workInfoList = data;
        })

        $('#birthDate').datetimepicker({
            format: 'YYYY-MM-DD',
            locale: moment.locale('zh-cn')
        });
        
        $scope.addWork = function () {
            $("#myModalLabel").text("新增工作经验");
            $(".updateInfoBtn").css("display","none");
        }
        $scope.updateWork = function (workInfo) {
            $("#myModalLabel").text("编辑工作经验");
            $(".addInfoBtn").css("display","none");
            $scope.workInfo = workInfo;
        }

        $scope.saveAddWork = function (workInfo) {
            var information = {
                "companyName": workInfo.companyName,
                "createTime": "2018-05-30T07:29:41.039Z",
                "endTime": workInfo.endTime,
                "extra": workInfo.companyName,
                "id": 0,
                "isActive": true,
                "jobTitle": workInfo.jobTitle,
                "startTime": workInfo.startTime,
                "updateTime": "2018-05-30T07:29:41.040Z",
                "username": username,
                "workTime": workInfo.workTime
            };

            workService.addWorkInfo(information,token,function (data) {
                successTip("新增成功！");
                /*setTimeout(function () {
                    refresh();
                },1000);*/
            })
        }
        $scope.saveUpdateWork = function (workInfo) {
            var information = {
                "companyName": workInfo.companyName,
                "createTime": "2018-05-30T07:29:41.039Z",
                "endTime": workInfo.endTime,
                "extra": workInfo.companyName,
                "id": 0,
                "isActive": true,
                "jobTitle": workInfo.jobTitle,
                "startTime": workInfo.startTime,
                "updateTime": "2018-05-30T07:29:41.040Z",
                "username": username,
                "workTime": workInfo.workTime
            };

            workService.updateWorkInfo(information,token,function (data) {
               if (data.msg == "修改失败"){
                   errorTip("修改失败!");
               }else {
                   successTip("修改成功！");
                   /*setTimeout(function () {
                       refresh();
                   },1000);*/
               }
               console.log(data)
            })
        }

    }]);

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

    app.service("workService",["$http","domain",function ($http,domain) {
        this.loadWorkInfo = function (username,token,callBack) {
            $http({
                url : domain + "/api/select/work/"+username,
                method : "GET",
                headers : {
                    'Authorization' : "Bearer "+token
                },
            }).then(function (data) {
                if (callBack){
                    callBack(data.data.data);
                }
            })
        }
        this.addWorkInfo = function (info,token,callback) {
            $http({
                method:'POST',
                url:domain + '/api/insert/work',
                data : JSON.stringify(info),
                headers : {
                    'Authorization' : "Bearer "+token
                },
            }).then(function(data){
                if (callback) {
                    callback(data.data);
                }
            });
        }
        this.updateWorkInfo = function (info,token,callback) {
            $http({
                method:'PUT',
                url:domain + '/api/update/work',
                data : JSON.stringify(info),
                headers : {
                    'Authorization' : "Bearer "+token
                },
            }).then(function(data){
                if (callback) {
                    callback(data.data);
                }
            });
        }
    }])
})();