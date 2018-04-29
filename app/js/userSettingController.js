(function () {
    'use strict';
    var app = angular.module('resumeApp');
    app.controller("userSettingController",["$scope","$rootScope","$state","userSettingService","userPageService",
        function ($scope,$rootScope,$state,userSettingService,userPageService) {
        if ($rootScope.token == undefined){
            location.href='http://localhost:8090';
        }
        userPageService.loadUserInfo($rootScope.user.username,$rootScope.token,function (data) {
            $scope.user=data;
            if (data.jobStatus == 0){
                $("#job_status").val(data.jobStatus);
            }
            if (data.jobStatus == 1){
                $("#job_status").val(data.jobStatus);
            }
            if (data.jobStatus == 2){
                $("#job_status").val(data.jobStatus);
            }

            $scope.updateUser = function (user) {
                /*console.log(user)*/
                user.jobStatus = $("#job_status").val();
                userSettingService.updateUserInfo(user,$rootScope.token,function (userData) {
                    successTip("修改成功！");
                    $state.go('userPage');
                })
            }

            //成功的提示框
            function successTip(tip){
                swal({
                    title:tip,
                    type:"success",
                    timer:1000,
                    showConfirmButton:false
                });
            }
        })
    }]);

    app.service("userSettingService",["$http","domain",function ($http,domain) {
        this.updateUserInfo = function (user,token,callback) {
            $http({
                url : domain + '/api/update/info',
                method : 'PUT',
                headers : {
                    'Authorization' : "Bearer "+token
                },
                data : JSON.stringify(user)
            }).then(function (data) {
                if (callback){
                    callback(data.data)
                }
            })

        }
    }]);

})();

/*头像预览*/
function getPicture() {
    $('#photo').click();
}

function setImage(docObj,localImageId,imgObjPreview) {
    var f=$(docObj).val();
    f=f.toLowerCase();
    var strRegex=".bmp|jpg|png|jpeg$";
    var re=new RegExp(strRegex);
    if (re.test(f.toLowerCase())){

    }else {
        alert("请选择正确格式的图片");
        file=$('#photo');
        file.after(file.clone());
        file.remove();
        return false;
    }
    if (docObj.files&& docObj.files[0]){
        imgObjPreview.src=window.URL.createObjectURL(docObj.files[0]);
    }else{
        docObj.select();
        var imgSrc=document.selection.createRange().text;
        try {
            localImageId.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
            localImageId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src=imgSrc;
        }catch (e){
            alert("你上传的图片格式不正确，请重新选择");
            return false;
        }

        imgObjPreview.style.display='none';
        document.selection.empty();
    }

    return true;
}