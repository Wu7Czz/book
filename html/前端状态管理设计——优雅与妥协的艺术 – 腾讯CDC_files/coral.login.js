// 牛评登录模块  2014.12.29 by chuangwang

define(function (require, exports, module) {

    var CORAL_CENTER = require('coral.center');
    var CORAL_CONFIG = require('coral.config');
    var CORAL = require('coral.base');

    var CORAL_LOGIN = {

        /*登陆成功 - 更新状态 */

        onLogined: function (uin, nick, headUrl) {
            var nnick = '';
            nnick = nick.replace(/</g, "&lt;");
            nnick = nnick.replace(/>/g, "&gt;");
            var _this = this;
            var o = CORAL_CONFIG.options;

            var userInfoHTML = '';
            var headImg = headUrl ? headUrl.replace("s=40", "s=140") : defaultHeadPic;
            if (headImg.indexOf("qlogo.cn")) {
                headImg.replace("s=40", "s=140")
            }
            //如果拉取头像失败就用默认图片

            //评论框个人登录态同步
            o.$loginFlag.data('userPic', headUrl);
            o.$loginFlag.data('nick', nick);
            o.$loginBtn.html('发表评论');
            o.$loginBtn.addClass('login_btn');
            o.$loginFlag.find('img').attr('src', headImg);
            o.$loginFlag.find('em').html(nnick);
            $('#loginFlag span:first').removeClass();
            $('#loginFlag span:first a').removeClass();
            o.$loginFlag.show();
            $('#my-message .tipInfo').show();
            $('.pop_user_login').hide();
            $('#public_reply .np-btn-submit').html('发表评论');
            $('.np-reply-box-info').show(); // 显示上传图片 20140819
            $('#my-message-list').html('');
            $('#my-notification-list').html('');
            $('#loadCmtMore').hide();
            $('#commentArea').show();
            if (o.loginuin) {
                o.$top_textarea.focus();
            }
            CORAL.IframeHeight();
            // 个人中心 参数 初始化
            CORAL_CENTER.options.$urlapi_mycomment.msgid = '';
            CORAL_CENTER.options.$urlapi.pageflag = '0';
            CORAL_CENTER.options.$urlapi_mycomment.pageflag = '0';
            _this.changeUid();
            if (o.centerFlag) {
                o.$myCowComment.trigger('click'); // 退出以后 更新个人中心状态
            }
            if (o.changeFlag) { // 切换账号跳到'全部评论'
                o.$myAllComment.trigger('click');
                coralComment.reportInit();
                $('#tab2_myComments .tipInfo').removeClass('waitting').addClass('waitting').html('').show();
                $('#tab2_myComments .np-load-more').hide();
            }


            // 如果文章是禁止评论 
            if (CORAL_CONFIG.options.comment_enable == false) {
                $("#np-reply-box").hide();
                $("#commentArea").hide();
                $("#top_post_btn").removeClass('login_btn');
                $("#top_post_btn").addClass('not_allowed');
                $("#top_post_btn").html('暂停评论');
            }
        },

        loginOut: function (flag) {
            var o = CORAL_CONFIG.options;
            flag || o.$logoutTrigger.click();

            o.$loginBtn.removeClass('login_btn');
            $('#commentArea').hide();
            o.$loginFlag.hide();
            o.$myAllComment.trigger('click'); // 退出以后 更新个人中心状态
            $('.np-reply-box-info').hide(); // 显示上传图片 20140819

            //个人中心清空
            $('#my-message-list').html('');
            $('#my-notification-list').html('');
            $('#loadCmtMore').hide();
            $('#loadMsgMore').hide();
            $.removeCookie('uid');


        },
        changeUid: function () {
            var self = this;
            var o = CORAL_CONFIG.options;
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: o.get_userinfo,
                success: function (data) {
                },
                error: function (error) {
                    if (error && error.status == 500) {
                        try {
                            error = JSON.parse(error.responseText);
                        } catch (e) {
                            error = { error_code: -100, msg: "系统错误" };
                        }
                    } else if (error) {
                        error = { error_code: -101, msg: "网络错误" };
                    }
                    // 登录过时 重新登录
                    if (error.error_code == 8) {
                        CORAL_CONFIG.options.publicLogout();
                    }
                }
            });


        },
        publicLoginEvent: function () { // 登陆事件
            if (CORAL_CONFIG.options && CORAL_CONFIG.options.loginEvent) {
                CORAL_CONFIG.options.loginEvent();
            } else {
                console.log("评论框：没绑定登录事件");
            }

        },

        getUin: function () {
            return QQ.Cookie.get("qq_open_id");
        },
        showLoginLayer: function () {
            var _this = this;
            _this.publicLoginEvent();
        },

        getKey: function () {
            return jQuery.cookie('qq_access_token');
        },

    }

    module.exports = CORAL_LOGIN; // 暴露接口

});