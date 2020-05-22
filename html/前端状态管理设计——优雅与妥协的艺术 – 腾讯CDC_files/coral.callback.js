
// 牛评个人中心代码逻辑  2014.12.25 by chuangwang


define(function (require, exports, module) {


    var CORAL = require('coral.base');
    var CORAL_DOM = require('coral.dom');
    var CORAL_BOSS = require('coral.boss');
    var CORAL_CONFIG = require('coral.config');

    var CORAL_CALLBACK = {
        options: {

            // 个人中心的变量
            $allComments: $('#tab1_allComments'), // 全部评论页卡
            $top_textarea: $('#top_textarea'),
            $topReply: $('#top_reply'),
            $loginBtn: $('#top_post_btn'),
            //$topReply: $('#top_reply'),
            $replylistId: '',
            $insertFlag: 'comment', // 标记回复评论位置   
            $loginFlag: $('#loginFlag'),
            reportId: '',
            dataImgObj: '[]'
        },



        /**
         * 发表评论的回调函数，用于展示评论发布成功或者错误的
         * 该函数也有可能由前端调用，展示数据校验错误
         * @param position 用于标识是从顶部评论框发表(position == "top") 还是 回复(position == "pop")
         * @param data 接口返回的数据
         * @param _pubTimer (optional)用于发送测速的时间戳
         */

        pubCallback: function (textAreaId, data, _pubTimer, error) {
            var position = textAreaId.split('_')[0];
            var _this = this.options;
            var __this = this;
            var tipsFonts = '评论成功!';
            var rType = true;
            var data1;
            // 判断是不是因为登录错误造成的 如果是的话则显示登录框
            if (error && error.error_code == 8) {
                CORAL_CONFIG.options.publicLogout();
                return;
            }

            var erroWarning = function (error) {
                if (!error) {
                    __this.insertTempCommentFn(null, data); // 发送成功 显示假数据
                    return;
                }
                switch (error.error_code) {
                    case 8:
                        CORAL_CONFIG.options.publicLogout();
                        break;
                    case 9:
                    case 13:
                    case 14:
                    case 16:
                    case 17:
                        // 这里造假数据
                        //__this._trigger('pubsuccess', null, data1 );
                        __this.insertTempCommentFn(null, data1)

                        break;
                    default:
                        tipsFonts = error.msg ? error.msg : '系统出错请稍后再发';
                }

            }

            //图片组装
            var imgArr = {};
            if (_this.dataImgObj != '[]' && _this.dataImgObj != '') {
                imgArr = jQuery.parseJSON(_this.dataImgObj)
            }


            if (position == 'top') { // 顶部发表主评
                // 顶部的图片
                if ($('#top_textarea').val() !== '') {
                    $('#insertPicList .upimgbox').remove();
                    $('#insertPicList').hide();
                }

                if (error) {

                    tipsFonts = error.msg || '<b>囧</b>... 出错了！ ';

                    rType = false;
                    setTimeout(function () {
                        _this.$top_textarea.focus();
                        _this.$topReply.find('span.np-tip-error').html(tipsFonts).fadeOut('fast');
                        _this.$loginBtn.removeClass('np-btn-submit-loading');
                    }, 2000);

                } else {
                    data1 = {
                        'parent': "0",
                        'commentid': (new Date()).getTime(),
                        'time': parseInt((new Date()).getTime() / 1000),
                        'content': ("" + CORAL.EncodeHtml(_this.$top_textarea.val()) + ""),
                        'checktype': '0',
                        'picture': imgArr
                    };

                    erroWarning(error);
                    _this.$loginBtn.removeClass('np-btn-submit-loading');

                }

                _this.$topReply.find('span.np-tip-error').html(tipsFonts).fadeIn('fast');

                if (rType) {
                    _this.$top_textarea.val('');
                    setTimeout(function () {
                        _this.$topReply.find('span.np-tip-error').hide();
                        _this.$topReply.find('span.fontsline').show();
                    }, 2000);
                }


            } else if (position == 'pop') { // 评论区域回复

                var liId = textAreaId.replace(/pop_/, '');
                var nowId = $('#' + liId + '>.children .tips'); // 本地验证
                var tipsWrap = $('#content').find('.pop_reply:visible .np-tip-error'); // 服务器返回错误信息验证
                var trueTextarea = $('#content').find('.pop_reply:visible textarea');
                var nowTextId = textAreaId.replace(/pop/, "pop_text");

                if ($('#public_reply textarea').val() != '') {
                    $('#insertPicList_reply .upimgbox').remove();
                    $('#insertPicList_reply').hide();
                }


                if (error) {
                    tips = error.msg || '<b>囧</b>... 出错了！ ';
                    nowId.html(tips).hide().fadeIn('slow');
                    setTimeout(function () {
                        $('#' + nowTextId).focus();
                        nowId.html('');
                        $('#content').find('.pop_reply:visible .np-reply-box-footer a').removeClass('submitOn').removeClass("np-btn-submit-loading").addClass('submit').html('回复');
                    }, 2000); //2秒钟后focus

                } else {
                    data1 = {
                        parent: _this.replylistId,
                        commentid: (new Date()).getTime(),
                        time: parseInt((new Date()).getTime() / 1000),
                        content: (CORAL.EncodeHtml($(trueTextarea).val())),
                        checktype: '0',
                        picture: imgArr
                    };
                    erroWarning(error);
                    tipsWrap.html(tipsFonts).hide().fadeIn('slow');
                    $('#content').find('.pop_reply:visible .np-reply-box-footer a').removeClass('submitOn').addClass('submit').html('回复');
                    setTimeout(function () {
                        $(trueTextarea).focus();
                        tipsWrap.html('')
                    }, 2000); //2秒钟后focus

                }

            } else if (position == 'report') {

                if (!error) {

                    $('#report_comment_' + data.commentid).html('').append('<em>24小时内给您反馈，见我的牛评</em>');
                    $('#report_top_' + data.commentid).html('').append('<em>24小时内给您反馈，见我的牛评</em>');
                    $('#report_msg_' + data.commentid).html('').append('<em>24小时内给您反馈，见我的牛评</em>');


                } else if (error.error_code == 12) {
                    $('#' + _this.reportId).html('').append('<em>您今天举报的条数已达上限</em>');
                } else {
                    $('#' + _this.reportId).html('').append('<em>该评论已被举报或处理!</em>');
                }
                $('#' + _this.reportId).addClass('np-btn-active');
                $('.np-report').remove();

            } else if (position == 'delete') {
                if (!error) {
                    $('.popdelete').hide();
                    $('#comment_' + data.commentid).animate({
                        height: '0px'
                    }, 'slow', function () {
                        $(this).remove();
                        CORAL.IframeHeight();
                    });
                } else if (error) {
                    alert('网络错误，请稍后再试！');
                }

            }

            //Qoss 发布接口测速
            if (_pubTimer) {
                CORAL_BOSS.Qoss('hfpljk', this._pubTimer0, {
                    3: _pubTimer
                });
            }

        },
        insertTempCommentFn: function (event, data) {


            var CORAL_CENTER = require('coral.center');
            var CORAL_CONFIG = require('coral.config');

            var _this = this;
            _this.insertTempComment(data);
            CORAL_CENTER.options.$urlapi_mycomment.msgid = CORAL_CENTER.options.$urlapi_mycomment.first;
            if (CORAL_CONFIG.options.columApi && $('#mycon').hasClass('np-active') && $('#myCowComment').hasClass('np-active')) {
                CORAL_CENTER.options.$urlapi_mycomment.pageflag = 0;
                CORAL_CENTER.loadMyComment();
            }
            CORAL.UpdateTime();
        },
        /**
                * 当用户发表评论成功后，将评论内容展示在评论列表中
                * @param _content 需要展示的微博内容
                * @param _pubTime 微博发布的时间
                     
        */

        //insertTempComment: function(commentid, _content, parentid, _pubTime, check) {
        insertTempComment: function (data) {

            var commentid = data.commentid || '',
                _content = data.content || '',
                parentid = data.parent || '',
                _pubTime = data.time || '',
                check = data.checktype || '',
                imgArr = data.picture || '',
                imgHtml = '';

            var _this = this;
            var o = this.options;
            var userName = o.$loginFlag.find('.np-user').html();
            var userPic = o.$loginFlag.find('img').attr('src');

            var hclass = '',
                hnum = '',
                hwvip = '',
                hwlevel = '';

            var vip1 = '',
                vip2 = '';

            if (o.$loginFlag.find('span:first').hasClass('hyw')) {
                hclass = o.$loginFlag.find('.huiyuan').attr('class');
                hnum = hclass.replace(/[^0-9]/ig, "");
                hwvip = 1;
                hwlevel = parseInt(hnum);

                vip1 = 'hyy';
                vip2 = 'huiyuan p' + hwlevel;
            } else if (o.$loginFlag.find('span:first').hasClass('hyw0')) {

                vip1 = 'hyy0';
                vip2 = 'huiyuan0';

            }


            var newstrHTML = '';
            var postLiwraper = '';

            var trueC = _content.replace('<script>', '&lt;script&gt;');
            trueC = trueC.replace('</script>', '&lt;/script&gt;');
            var imgHtml = '';
            var imgWH = '';

            if (imgArr != undefined && imgArr.length) {
                imgHtml = '<div><ul class="list_w100" id="pic_' + commentid + '">';

                for (var j = 0, len = imgArr.length; j < len; j++) {
                    if (imgArr[j].width > imgArr[j].height) {
                        imgWH = 'height=100';
                    } else {
                        imgWH = 'width=100'
                    }
                    imgHtml += '<li class="list_item"><a href="javascript:void(0)" class="figure"><img data-order="' + j + '" data-total="' + len + '" ' + imgWH + ' class="np-con-img" data-width = "' + imgArr[j].width + '" data-height = "' + imgArr[j].height + '" src="' + imgArr[j].url + '/100" /></a></li>'
                }
                imgHtml += '</ul></div>'
            }


            if (check == 1) {
                var info = {
                    id: commentid, // 用户Uid
                    parent: 0,
                    time: _pubTime, // 头像地址
                    content: _content, // 评论数
                    up: 0,
                    poke: 0,
                    userinfo: {
                        userid: $.cookie('uid'),
                        commentnum: '',
                        upnum: 0,
                        nick: userName,
                        head: userPic,
                        region: '',
                        hwvip: hwvip,
                        hwlevel: hwlevel
                    },
                    picture: imgArr
                };

                newstrHTML = CORAL_DOM.creatHtml(info, 'blueflag', o.$insertFlag); // xxx
            } else {

                newstrHTML = '<li class="np-post temporary blueflag" id="comment_' + commentid + '"><div class="np-tip-newpost"></div><img class="np-avatar" src="' + userPic + '" alt="头像"><div class="np-post-body"><div class="np-post-header"><span class="' + vip1 + '"><a href="javascript:void(0)" class="np-user">' + userName + '</a></span><span class="np-time">刚刚</span></div>'
                    + '<div class="np-post-content"><p>' + trueC + '</p>'
                    + '</div>'
                    + imgHtml
                    + '</div></li>';

            }

            if (parseInt(parentid) != 0) {

                if ($('#top_' + parentid).length || $('#comment_' + parentid).length || $('#post_' + parentid).length || $('#msg_' + parentid).length) {

                    $('#top_' + parentid + '>ul.children').prepend(newstrHTML).children('div.pop_reply').hide();

                    $('#comment_' + parentid + '>ul.children').prepend(newstrHTML).children('div.pop_reply').hide();

                    $('#post_' + parentid + '>ul.children').children('div.pop_reply').hide();

                    $('#msg_' + parentid + '>ul.children').prepend(newstrHTML).children('div.pop_reply').hide();

                    CORAL.IframeHeight();
                }
            } else {
                if ($('#allComments .tipInfo:visible')) {
                    $('#allComments .tipInfo').hide();
                }

                if (o.$allComments.find('.np-title-new').length) {

                    o.$allComments.find('.np-title-new').after(newstrHTML);
                    var elementTop = $('#comment_' + commentid).offset().top + $(top.document).scrollTop();
                    $(top.document.body).animate({
                        scrollTop: elementTop
                    }, 800);
                    $(top.window).scrollTop(elementTop);


                } else {

                    o.$allComments.find('.post-list').prepend(newstrHTML);
                }

                CORAL.IframeHeight();
            }

            if (o.$insertFlag != 'post') {

                _this.blueLine('#' + o.$insertFlag + '_' + commentid);

            } else {

                _this.blueLine('#comment_' + commentid);
            }

        },

        blueLine: function (targetId) {
            setTimeout(function () {
                $(targetId + '>.np-tip-newpost').animate({
                    opacity: '0'
                }, 10000);
                setTimeout(function () {

                    $(targetId + '>.np-avatar').animate({
                        'left': '0px'
                    }, 400);
                    $(targetId + '>.np-post-body').animate({
                        'padding-left': '20px'
                    }, 400);
                    $(targetId).removeClass('blueflag');

                }, 8000)
            }, 5000);
        }

    }
    module.exports = CORAL_CALLBACK; // 暴露接口

});

//CORAL_CENTER.clickLoadMore();