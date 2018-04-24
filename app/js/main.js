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
                    /*controller: "homePageController"*/
                })
                .state('templateStore', {
                    url: '/templateStore',
                    templateUrl: 'page/templateStore.html',
                    /*controller: "homePageController"*/
                })
                .state('userPage', {
                    url: '/userPage',
                    templateUrl: 'page/userPage.html',
                    /*controller: "homePageController"*/
                })
                .state('editUser', {
                    url: '/editUser',
                    templateUrl: 'page/editUser.html',
                    /*controller: "homePageController"*/
                })

        }]);
})();

(function () {
    'use strict';
    angular.module('resumeApp')
        .constant('domain', "http://localhost:8080");//把服务器地址定义为一个全局变量
})();



