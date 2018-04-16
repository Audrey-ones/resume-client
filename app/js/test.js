(function () {
    'use strict';
    var app=angular.module("alienlab");
    app.controller("coachadviceController",["$scope","$stateParams","coachadviceService","$rootScope","stuindexService",function($scope,$stateParams,coachadviceService,$rootScope,stuindexService){
        $scope.advice = null;
        var courseSchedulingId = $stateParams.courseScheId;
        function loadLearner() {
            if ($rootScope.learnerInfo!=null && courseSchedulingId!=null){
                var learnerId = $rootScope.learnerInfo.learner.id;
                coachadviceService.loadCoachAdvice(learnerId,courseSchedulingId,function (data) {
                    $scope.coachadvice = data;
                    var advicestr = data.coachAdvice;
                    $scope.advice=JSON.parse(advicestr);
                });
            }
        }
        loadLearner();
        $scope.$watch("$root.openid",function(newvalue){
            if(!newvalue) return;
            if(!$rootScope.learnerInfo){
                stuindexService.loadStuIndex($rootScope.openid,function (data) {
                    $scope.learnerIndex=data;
                    $rootScope.learnerInfo = data;
                    loadLearner();
                });
            }

        },true)


    }]);
    app.service("coachadviceService",["$http","domain",function ($http,domain) {
        this.loadCoachAdvice = function (learnerId,courseSchedulingId,callback) {
            $http({
                method:'POST',
                url:'http://116.62.181.164/patients',
            }).then(function (data) {
                if (callback) {
                    callback(data.data);
                }
            })
        }
    }])

})()