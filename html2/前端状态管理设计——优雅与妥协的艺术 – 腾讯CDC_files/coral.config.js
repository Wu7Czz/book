

// 牛评可配置项模块  2014.12.30 by chuangwang

define(function (require, exports, module) {

    var CORAL_CONFIG = {

        options: {

            // 可配置项

            homePageSize: 10, // 主评论默认条数
            hotPageSize: 10, // 热评数
            centerPageSize: 10, // 个人中心默认条数
            loadPageSize: 20, // 一次拉取条数
            newsNum: 0, // 蓝条数字
            columSource: 1, // source 来源区分不同业务
            columsubSource: 0, // 区分视频下好莱坞业务
            columCode: 1, //编码
            columApi: 1, // 不需要评论列表，只需要评论框
            columLink: 1, // 评论数字是否需要加链接
            columHot: 1, //  是否需要热门评论
            commentNumbers: '', // 页面上所有需要评论数的地方
            popupInfo: 'popClick', //个人信息弹框开关
            reportBtn: 1, //举报开关
            siteName: '',  // 区分不同频道用户中心内容来源
            film: 0,  //电影频道
            client: 0,//客户端
            $logoutTrigger: $('#loginOut'), //mini导航 退出按钮 
            $loginFlag: $('#loginFlag'),
            $loginBtn: $('#top_post_btn'),
            loginuin: 0,
            $top_textarea: $('#top_textarea'),
            $myCowComment: $('#myCowComment'), // 我的牛评按钮
            $myAllComment: $('#myAllComment'), // 个人中心 全部评论
            centerFlag: 0, // 个人中心我的牛平拉取评论标志
            changeFlag: 0,
            huiyuan: 0,

            cmt_array: '',
            cmt_class: '',
            cmt_content: ''

        },

        init: function () {

            var o = this.options;

            if (window.registerCoralEvent != undefined) {

                if (registerCoralEvent.source) {
                    o.columSource = registerCoralEvent.source;
                }

                if (registerCoralEvent.subsource) {
                    o.columsubSource = registerCoralEvent.subsource;
                }

                if (registerCoralEvent.code == 0 || registerCoralEvent.code == 1) {
                    o.columCode = registerCoralEvent.code;
                }
                if (registerCoralEvent.ownStyle) {

                    $('head').append('<link href="' + registerCoralEvent.ownStyle + '" rel="stylesheet" type="text/css" media="screen"/>');
                }

                if (registerCoralEvent.listHiden) {
                    $('#content').hide();
                    o.columApi = 0;
                }

                // 评论条数

                if (registerCoralEvent.commentNums) {
                    o.homePageSize = registerCoralEvent.commentNums;
                }

                if (registerCoralEvent.commentHotNums) {
                    o.hotPageSize = registerCoralEvent.commentHotNums;
                }

                if (registerCoralEvent.commentLink == 0) {
                    o.columLink = registerCoralEvent.commentLink;
                }
                if (registerCoralEvent.commentLink == 2) {
                    o.columLink = registerCoralEvent.commentLink;
                }
                if (registerCoralEvent.commentHot == 0) {
                    o.columHot = registerCoralEvent.commentHot;
                }

                if (registerCoralEvent.popupInfo == 0) {
                    o.popupInfo = 'popupInfoOff';
                }

                if (registerCoralEvent.popupLink == 0) {
                    o.popupLink = 'popupLinkOff';
                }

                if (registerCoralEvent.reportBtn == 0) {
                    o.reportBtn = 0;
                }

                if (registerCoralEvent.site) {
                    o.siteName = registerCoralEvent.site;
                    if (registerCoralEvent.site == 'video') {
                        o.huiyuan = 1;
                    }
                }
                if (registerCoralEvent.site1) {
                    o.film = 1;
                }

                if (registerCoralEvent.site2) {
                    o.client = 1;
                }
            }
        }
    }

    module.exports = CORAL_CONFIG; // 暴露接口

});