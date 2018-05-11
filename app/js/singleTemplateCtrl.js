(function () {
    'use strict';
    var app = angular.module('resumeApp');
    app.controller("singleTemplateCtrl",["$scope","singleTemplateService","$state","$stateParams",function ($scope,singleTemplateService,$state,$stateParams) {
        var templateId = $stateParams.templateId;
        console.log(templateId)
    }]);

    app.service("singleTemplateService",["$http",function ($http) {

    }])

})();