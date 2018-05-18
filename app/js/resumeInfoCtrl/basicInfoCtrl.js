(function () {
    'use strict';
    var app = angular.module("resumeApp");
    app.controller("basicInfoCtrl",["$scope","$state","basicInfoService",function ($scope,$state,basicInfoService) {
        $scope.saveInfo = function () {
            console.log($scope.test)
            $('#myModal').modal('hide');
        }

        $('#date1').datetimepicker({
            format: 'YYYY-MM-DD',
            locale: moment.locale('zh-cn')
        });
    }]);

    app.service("basicInfoService",["$http",function ($http) {

    }])
})();