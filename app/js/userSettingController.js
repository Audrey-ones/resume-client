(function () {
    'use strict';
    var app = angular.module('resumeApp');
    app.controller("userSettingController",["$scope","$rootScope","$state","userSettingService","userPageService",
        function ($scope,$rootScope,$state,userSettingService,userPageService) {
        if ($rootScope.token == undefined){
            location.href='http://localhost:8090';
        }
        userPageService.loadUserInfo($rootScope.user.username,$rootScope.token,function (data) {
            $scope.avatar = "../image/"+data.avatar;
            $scope.user=data;
            $scope.user.avatar = "../image/"+data.avatar;
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
                // var file=document.querySelector("input[type=file]").files[0];
                var file=document.getElementById("photo").files[0];
                console.log(user.username)
                console.log(file)
                userSettingService.updateAvatar(user.username,file,$rootScope.token,function (data) {
                    console.log(data)
                })

                user.jobStatus = $("#job_status").val();
                /*userSettingService.updateUserInfo(user,$rootScope.token,function (userData) {
                    successTip("修改成功！");
                    setTimeout(function () {
                        refresh();
                    },1000);
                    /!*$state.go('userPage');*!/
                })*/
            };

            $scope.changePwd = function (oldPwd,newPwd,comfirePwd) {
                if (newPwd != comfirePwd){
                    errorTip("两次密码不一致，请重新输入！");
                    $scope.newPwd = "";
                    $scope.comfirePwd = "";
                }else {
                    userSettingService.updatePassword($rootScope.user.username,$rootScope.token,oldPwd,newPwd,function (data) {
                        /*console.log(data)*/
                        if (data.msg == "修改成功"){
                            successTip("修改成功！");
                            $scope.oldPwd = "";
                            $scope.newPwd = "";
                            $scope.comfirePwd = "";
                        }else {
                            errorTip("密码错误，请重新输入！");
                            $scope.oldPwd = "";
                        }

                    })
                }
            };

            $scope.resetPwd = function (oldPwd,newPwd,comfirePwd) {
                $scope.oldPwd = "";
                $scope.newPwd = "";
                $scope.comfirePwd = "";
            }

            $scope.reset = function () {
                refresh();
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
        this.updateAvatar = function (username,file,token,callback) {
            console.log(file)
            $http({
                url : domain + '/api/upload/avatar',
                method : 'POST',
                headers : {
                    'Authorization' : "Bearer "+token,
                    'Content-Type':undefined
                },
                data: {
                    username:username,
                    file:file
                },
                transformRequest:function (data) {
                    var formData=new FormData();
                    formData.append('username',data.username);
                    formData.append('file',data.file);
                    return formData;
                }
            }).then(function (data) {
                if (callback){
                    callback(data.data)
                }
            })

        }

        this.updatePassword = function (username,token,oldPwd,newPwd,callback) {
            $http({
                url : domain + '/api/update/password',
                method : 'PUT',
                headers : {
                    'Authorization' : "Bearer "+token
                },
                params: {
                    username:username,
                    oldPwd:oldPwd,
                    newPwd:newPwd
                }
            }).then(function (data) {
                if (callback){
                    callback(data.data)
                }
            })

        }
    }]);

})();

function refresh() {
    window.location.reload();
}

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