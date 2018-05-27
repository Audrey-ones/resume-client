/**
 * Created by LuDan on 2018/4/25
 */
(function () {
    'use strict';
    var app = angular.module('resumeApp');
    app.controller("homePageController", ["$scope", "homePageService","userPageService","$rootScope","$state",function ($scope, homePageService,userPageService, $rootScope,$state) {
        if (getCookie('user')){
            $rootScope.user=JSON.parse(getCookie('user'));
        }
        if (getCookie('token')){
            $rootScope.token=JSON.parse(getCookie('token'));
        }

        if (getCookie('user')){
            userPageService.loadUserInfo($rootScope.user.username,$rootScope.token,function (data) {
                $rootScope.nickname = data.nickname;
                var avatar = "../image/"+data.avatar;
                $rootScope.avatar = avatar;
                /*console.log(data)*/
            })
        }

        homePageService.loadRecommendTemplate(function (data) {
            $scope.recommendTemplates = data;
            /*console.log(data)*/
        })

        $scope.clickRecommendTemplate = function (recommendTemplate) {
            var templateId = recommendTemplate.templateId;
            $state.go('singleTemplate',{templateId: templateId});
        }

    }]);

    app.service("homePageService", ["$http","domain",function ($http,domain) {
        this.loadRecommendTemplate = function (callback) {
             $http({
                 method:'GET',
                 url:'/json/recommendTemplateList.json',
             }).then(function(data){
                 if (callback) {
                     callback(data.data);
                 }
             });
        }

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

(function () {
    'use strict';
    var app = angular.module('resumeApp');
    app.controller("imageCtrl", [function () {
        Rotation();
        function Rotation() {
            $(document).ready(function() {
                var length,
                    currentIndex = 0,
                    interval,
                    hasStarted = false, //是否已经开始轮播
                    t = 3000; //轮播时间间隔
                length = $('.slider-panel').length;
                //将除了第一张图片隐藏
                $('.slider-panel:not(:first)').hide();
                //将第一个slider-item设为激活状态
                $('.slider-item:first').addClass('slider-item-selected');
                //隐藏向前、向后翻按钮
                $('.slider-page').hide();
                //鼠标上悬时显示向前、向后翻按钮,停止滑动，鼠标离开时隐藏向前、向后翻按钮，开始滑动
                $('.slider-panel, .slider-pre, .slider-next').hover(function() {
                    stop();
                    $('.slider-page').show();
                }, function() {
                    $('.slider-page').hide();
                    start();
                });
                $('.slider-item').hover(function(e) {
                    stop();
                    var preIndex = $(".slider-item").filter(".slider-item-selected").index();
                    currentIndex = $(this).index();
                    play(preIndex, currentIndex);
                }, function() {
                    start();
                });
                $('.slider-pre').unbind('click');
                $('.slider-pre').bind('click', function() {
                    pre();
                });
                $('.slider-next').unbind('click');
                $('.slider-next').bind('click', function() {
                    next();
                });
                /**
                 * 向前翻页
                 */
                function pre() {
                    var preIndex = currentIndex;
                    currentIndex = (--currentIndex + length) % length;
                    play(preIndex, currentIndex);
                }
                /**
                 * 向后翻页
                 */
                function next() {
                    var preIndex = currentIndex;
                    currentIndex = ++currentIndex % length;
                    play(preIndex, currentIndex);
                }
                /**
                 * 从preIndex页翻到currentIndex页
                 * preIndex 整数，翻页的起始页
                 * currentIndex 整数，翻到的那页
                 */
                function play(preIndex, currentIndex) {
                    $('.slider-panel').eq(preIndex).fadeOut(500)
                        .parent().children().eq(currentIndex).fadeIn(500);
                    $('.slider-item').removeClass('slider-item-selected');
                    $('.slider-item').eq(currentIndex).addClass('slider-item-selected');
                }
                /**
                 * 开始轮播
                 */
                function start() {
                    if(!hasStarted) {
                        hasStarted = true;
                        interval = setInterval(next, t);
                    }
                }
                /**
                 * 停止轮播
                 */
                function stop() {
                    clearInterval(interval);
                    hasStarted = false;
                }
                //开始轮播
                start();
            });
        };
    }]);

})();
