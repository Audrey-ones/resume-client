/**
 * Created by LuDan on 2018/4/25
 */
(function () {
    'use strict';
    var app = angular.module('resumeApp');
    app.controller("homePageController", ["$scope", "homePageService","userPageService","$rootScope", "domain",function ($scope, homePageService,userPageService, $rootScope,domain) {
        if (getCookie('user')){
            $rootScope.user=JSON.parse(getCookie('user'));
        }
        if (getCookie('token')){
            $rootScope.token=JSON.parse(getCookie('token'));
        }

        if (getCookie('user')){
            userPageService.loadUserInfo($rootScope.user.username,$rootScope.token,function (data) {
                $rootScope.nickname = data.nickname;
                $rootScope.avatar = data.avatar;
                /*console.log(data)*/
            })
        }

    }]);

    app.service("homePageService", ["$http","domain",function ($http,domain) {
        /*this.loadUserInfo = function (userInfo,callback) {
            /!* $http({
                 method:'POST',
                 url:domain + '/api/jwt-token',
                 data : JSON.stringify(userInfo)
             }).then(function(data){
                 if (callback) {
                     callback(data.data);
                 }
             });*!/
        }*/

    }]);
})();

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

(function () {
    'use strict';
    var app = angular.module('resumeApp');
    app.controller("outCtrl", ["$scope",function ($scope) {

        //退出登录时，移除cookie
        $scope.signUp=function () {
            delCookie('user');
            delCookie('token');
            successTip("退出成功！");
            setTimeout("location.href='http://localhost:8090'",1200);
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