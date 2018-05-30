(function () {
    'use strict';
    var app = angular.module("resumeApp");
    app.controller("educationCtrl",["$scope","$rootScope","$state","educationService",function ($scope,$rootScope,$state,educationService) {
        var username = $rootScope.user.username;
        var token = $rootScope.token;

        educationService.loadEducationInfo(username,token,function (data) {
            console.log(data)
            if (data == null){
                $(".updateDisplay").css("display","none");

            }else {
                $scope.educationInfo = data;
            }

        })

        $('#birthDate').datetimepicker({
            format: 'YYYY-MM-DD',
            locale: moment.locale('zh-cn')
        });
        
        $scope.addEducation = function () {
            $("#myModalLabel").text("新增教育背景信息");
            $(".updateInfoBtn").css("display","none");
        }
        $scope.updateEducation = function (education) {
            $("#myModalLabel").text("编辑教育背景信息");
            $(".addInfoBtn").css("display","none");
            $scope.educationInfo = education;
        }

        $scope.saveAddEducation = function (educationInfo) {
            var information = {
                "createTime": "2018-05-30T07:29:40.975Z",
                "description": educationInfo.description,
                "enterTime": educationInfo.enterTime,
                "extra": educationInfo.extra,
                "isActive": true,
                "school": educationInfo.school,
                "speciality": educationInfo.speciality,
                "stopTime": educationInfo.stopTime,
                "updateTime": "2018-05-30T07:29:40.975Z",
                "username": username
            };

            educationService.addEducationInfo(information,token,function (data) {
                successTip("新增成功！");
                setTimeout(function () {
                    refresh();
                },1000);
            })
        }
        $scope.saveUpdateEducation = function (educationInfo) {
            var information = {
                "createTime": "2018-05-30T07:29:40.975Z",
                "description": educationInfo.description,
                "enterTime": educationInfo.enterTime,
                "extra": educationInfo.extra,
                "id": educationInfo.id,
                "isActive": true,
                "school": educationInfo.school,
                "speciality": educationInfo.speciality,
                "stopTime": educationInfo.stopTime,
                "updateTime": "2018-05-30T07:29:40.975Z",
                "username": username
            };

            educationService.updateEducationInfo(information,token,function (data) {
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

    app.service("educationService",["$http","domain",function ($http,domain) {
        this.loadEducationInfo = function (username,token,callBack) {
            $http({
                url : domain + "/api/select/education/"+username,
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
        this.addEducationInfo = function (info,token,callback) {
            $http({
                method:'POST',
                url:domain + '/api/insert/education',
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
        this.updateEducationInfo = function (info,token,callback) {
            $http({
                method:'PUT',
                url:domain + '/api/update/education',
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