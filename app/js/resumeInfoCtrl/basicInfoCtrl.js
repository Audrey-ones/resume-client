(function () {
    'use strict';
    var app = angular.module("resumeApp");
    app.controller("basicInfoCtrl",["$scope","$state","basicInfoService",function ($scope,$state,basicInfoService) {
        $scope.saveInfo = function () {
            console.log($scope.test)
            $('#myModal').modal('hide');
        }

        basicInfoService.loadBasicInfo(function (data) {
            console.log(data);
            $scope.basicInfo = data.basicInfo;
        })

        $('#birthDate').datetimepicker({
            format: 'YYYY-MM-DD',
            locale: moment.locale('zh-cn')
        });
    }]);

    app.service("basicInfoService",["$http",function ($http) {
        this.loadBasicInfo = function (callBack) {
            $http({
                url : "../../json/basicInfo.json",
                method : "GET"
            }).then(function (data) {
                if (callBack){
                    callBack(data.data);
                }
            })
        }
    }])
})();