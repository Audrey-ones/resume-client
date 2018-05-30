(function () {
    'use strict';
    var app = angular.module("resumeApp");
    app.controller("jobObjectCtrl",["$scope","$rootScope","$state","jobObjectService",function ($scope,$rootScope,$state,jobObjectService) {
        var username = $rootScope.user.username;
        var token = $rootScope.token;

        jobObjectService.loadJobInfo(username,token,function (data) {
            console.log(data)
            if (data == null){
                $(".addDisplay").css("display","block");
                $(".updateInfoBtn").css("display","none");
            }else {
                $(".updateDisplay").css("display","block");
                $(".addInfoBtn").css("display","none");
                $scope.jobInfo = data;
            }

        })

        $('#birthDate').datetimepicker({
            format: 'YYYY-MM-DD',
            locale: moment.locale('zh-cn')
        });
        
        $scope.addJobObject = function () {
            $("#myModalLabel").text("新增求职意向信息");
        }
        $scope.updateJobObject = function () {
            $("#myModalLabel").text("编辑求职意向信息");
        }

        $scope.saveAddEducation = function (jobInfo) {
            var information = {
                "createTime": "2018-05-30T07:29:41.018Z",
                "enterTime": jobInfo.enterTime,
                "expectCity": jobInfo.expectCity,
                "extra": "string",
                "isActive": true,
                "jobTitle": jobInfo.jobTitle,
                "jobType": jobInfo.jobType,
                "salaryEnd": jobInfo.salaryEnd,
                "salaryStart": jobInfo.salaryStart,
                "updateTime": "2018-05-30T07:29:41.018Z",
                "username": username
            };

            jobObjectService.addJobInformation(information,token,function (data) {
                successTip("新增成功！");
                setTimeout(function () {
                    refresh();
                },1000);
            })
        }
        $scope.saveUpdateJob = function (jobInfo) {
            var information = {
                "id":jobInfo.id,
                "createTime": "2018-05-30T07:29:41.018Z",
                "enterTime": jobInfo.enterTime,
                "expectCity": jobInfo.expectCity,
                "extra": "string",
                "isActive": true,
                "jobTitle": jobInfo.jobTitle,
                "jobType": jobInfo.jobType,
                "salaryEnd": jobInfo.salaryEnd,
                "salaryStart": jobInfo.salaryStart,
                "updateTime": "2018-05-30T07:29:41.018Z",
                "username": username
            };

            jobObjectService.updateJobInformation(information,token,function (data) {
               /* successTip("修改成功！");*/
               if (data.msg == "修改失败"){
                   errorTip("修改失败!");
               }else {
                   successTip("修改成功！");
                   setTimeout(function () {
                       refresh();
                   },1000);
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

    app.service("jobObjectService",["$http","domain",function ($http,domain) {
        this.loadJobInfo = function (username,token,callBack) {
            $http({
                url : domain + "/api/select/jobObjective/"+username,
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
        this.addJobInformation = function (info,token,callback) {
            $http({
                method:'POST',
                url:domain + '/api/insert/jobObjective',
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
        this.updateJobInformation = function (info,token,callback) {
            $http({
                method:'PUT',
                url:domain + '/api/update/jobObjective',
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