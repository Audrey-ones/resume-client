/**
 * Created by LuDan on 2018/4/16
 */
(function () {
    'use strict';

    angular.module('resumeApp', ["ui.router"]).config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider) {//路由定义
            $urlRouterProvider.otherwise('/homePage');
            $stateProvider
                .state('homePage', {//主页
                    url: '/homePage',
                    templateUrl: 'page/homePage.html',
                    controller: "homePageController"
                })
                .state('templateStore', {//模板商城
                    url: '/templateStore',
                    templateUrl: 'page/templateStore.html',
                    controller: "templateStoreCtrl"
                })
                .state('userPage', {//用户主页
                    url: '/userPage',
                    templateUrl: 'page/userPage.html',
                    controller: "userPageController"
                })
                .state('editUser', {//用户设置
                    url: '/userSetting',
                    templateUrl: 'page/userSetting.html',
                    controller: "userSettingController"
                })
                .state('singleTemplate',{//单个模板
                    url : '/singleTemplate:templateId',
                    templateUrl : "page/singleTemplate.html",
                    controller : 'singleTemplateCtrl'
                })
                .state('resumeWriting',{//简历代写
                    url : '/resumeWriting',
                    templateUrl : "page/resumeWriting.html",
                    controller : 'resumeWritingCtrl'
                })
                .state('resumeInfo',{//简历信息
                    url : '/resumeInfo',
                    templateUrl : "page/resumeInfo.html",
                    controller : function ($state) {
                        $state.go("resumeInfo.basicInfo");
                    }
                })
                .state('resumeInfo.basicInfo',{
                    url : '/basicInfo',
                    templateUrl : "page/information/basicInfo.html",
                    controller : 'basicInfoCtrl'
                })
                .state('resumeInfo.jobObjective',{
                    url : '/jobObjective',
                    templateUrl : "page/information/jobObjective.html",
                    controller : 'jobObjectCtrl'
                })
                .state('resumeInfo.educationBgm',{
                    url : '/educationBgm',
                    templateUrl : "page/information/educationBgm.html",
                    controller : 'educationCtrl'
                })
                .state('resumeInfo.workExperience',{
                    url : '/workExperience',
                    templateUrl : "page/information/workExperience.html",
                    controller : 'workCtrl'
                })
                .state('resumeInfo.programExperience',{
                    url : '/programExperience',
                    templateUrl : "page/information/programExperience.html"
                    /*controller : 'basicInfoCtrl'*/
                })
                .state('resumeInfo.myEvaluate',{
                    url : '/myEvaluate',
                    templateUrl : "page/information/myEvaluate.html"
                    /*controller : 'basicInfoCtrl'*/
                })
                .state('resumeInfo.myHobby',{
                    url : '/myHobby',
                    templateUrl : "page/information/myHobby.html"
                    /*controller : 'basicInfoCtrl'*/
                })
                .state('resumeInfo.mySkill',{
                    url : '/mySkill',
                    templateUrl : "page/information/mySkill.html"
                    /*controller : 'basicInfoCtrl'*/
                })


        }]);
})();

(function () {
    'use strict';
    angular.module('resumeApp')
        .constant('domain', "http://localhost:8080");//把服务器地址定义为一个全局变量
})();

(function () {
    returnTop();
    //返回顶部方法
    function returnTop() {
        $("#go_top").hide();
        $(function () {
            //检测屏幕高度
            var height=$(window).height();
            //scroll() 方法为滚动事件
            $(window).scroll(function(){
                if ($(window).scrollTop()>height){
                    $("#go_top").fadeIn(500);
                }else{
                    $("#go_top").fadeOut(500);
                }
            });
            $("#go_top").click(function(){
                $('body,html').animate({scrollTop:0},500);
                return false;
            });
        });
    }
})();



