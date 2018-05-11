(function () {
    'use strict';
    var app = angular.module("resumeApp");
    app.controller("templateStoreCtrl",["$scope","$state","templateStoreService",function ($scope,$state,templateStoreService) {
        templateStoreService.loadTemplateList(function (data) {
            $scope.templateList = data;
        });

        $scope.toSingleTemplate = function (templateId) {
            $state.go('singleTemplate',{templateId: templateId});
        }

    }]);

    app.service("templateStoreService",["$http",function ($http) {
        this.loadTemplateList = function (callback) {
            $http({
                url : '../json/TemplateList.json',
                method : 'GET'
            }).then(function (data) {
                if (callback){
                    callback(data.data);
                }
            })
        }
    }])

})();