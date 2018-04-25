/**
 * Created by LuDan on 2018/4/25
 */
(function () {
    'use strict';
    var app = angular.module('resumeApp');
    app.controller("homePageController", ["$scope", "homePageService","$rootScope", "domain",function ($scope, homePageService, $rootScope,domain) {
       /* $scope.signIn = function(account,password){

        };*/
        if (getCookie('user')){
            $rootScope.user=JSON.parse(getCookie('user'));
        }
        if (getCookie('token')){
            $rootScope.token=JSON.parse(getCookie('token'));
        }
        console.log($rootScope.user)

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

        //读取cookies
        function getCookie(name) {
            /* var arr,reg=new RegExp("(^| )" + name + "=([^;]*)(;|$)");*/
            var arr,reg=new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr=document.cookie.match(reg)){
                return arr[2];
            }else {
                return null;
            }
        }

    }]);

    app.service("homePageService", ["$http","domain",function ($http,domain) {
        this.loadUserInfo = function (userInfo,callback) {
           /* $http({
                method:'POST',
                url:domain + '/api/jwt-token',
                data : JSON.stringify(userInfo)
            }).then(function(data){
                if (callback) {
                    callback(data.data);
                }
            });*/
        }

    }]);
})();

(function () {
    'use strict';
    var app = angular.module('resumeApp');
    app.controller("outCtrl", ["$scope",function ($scope) {
        //成功的提示框
        function successTip(tip){
            swal({
                title:tip,
                type:"success",
                timer:1000,
                showConfirmButton:false
            });
        }

        $scope.signUp=function () {
            delCookie('user');
            delCookie('token');
            setTimeout(function () {
                successTip("退出成功！")
            },2000)
        }

        //读取cookies
        function getCookie(name) {
            var arr,reg=new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr=document.cookie.match(reg)){
                return arr[2];
            }else {
                return null;
            }
        }

        //删除cookies
        function delCookie(name)
        {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval=getCookie(name);
            if(cval!=null)
                document.cookie= name + "="+cval+";expires="+exp.toGMTString();
        }

    }]);

})();