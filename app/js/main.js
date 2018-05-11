/**
 * Created by LuDan on 2018/4/16
 */
(function () {
    'use strict';

    angular.module('resumeApp', ["ui.router"]).config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider) {//路由定义
            $urlRouterProvider.otherwise('/homePage');
            $stateProvider
                .state('homePage', {
                    url: '/homePage',
                    templateUrl: 'page/homePage.html',
                    controller: "homePageController"
                })
                .state('templateStore', {
                    url: '/templateStore',
                    templateUrl: 'page/templateStore.html',
                    controller: "templateStoreCtrl"
                })
                .state('userPage', {
                    url: '/userPage',
                    templateUrl: 'page/userPage.html',
                    controller: "userPageController"
                })
                .state('editUser', {
                    url: '/userSetting',
                    templateUrl: 'page/userSetting.html',
                    controller: "userSettingController"
                })
                .state('singleTemplate',{
                    url : '/singleTemplate:templateId',
                    templateUrl : "page/singleTemplate.html",
                    controller : 'singleTemplateCtrl'
                })
                .state('resumeWriting',{
                    url : '/resumeWriting',
                    templateUrl : "page/resumeWriting.html",
                    controller : 'resumeWritingCtrl'
                })
                .state('resumeInfo',{
                    url : '/resumeInfo',
                    templateUrl : "page/resumeInfo.html",
                    controller : 'resumeInfoCtrl'
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



