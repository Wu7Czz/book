
// 牛评个人中心代码逻辑  2014.12.25 by chuangwang


define(function(require, exports, module) {


var CORAL_CONFIG = require('coral.config');
var CORAL = require('coral.base');



var CORAL_CENTER = {
		options: {

            // 个人中心的变量
			
            $myCowComment: $('#myCowComment'), // 我的牛评按钮
            $myAllComment: $('#myAllComment'), // 个人中心 全部评论
            $tabFlag: true,
            $realtimeComments: 0,
            $insertFlag: 'comment', // 标记回复评论位置                             
            $nowDate: (new Date()),

            $urlapi: {
                userId: 0,
                first: '',
                last: '',
                msgid: '',
                pageflag: 0
            },
            $urlapi_mycomment: {
                userId: 0,
                first: '',
                last: '',
                msgid: '',
                pageflag: 0
            }
        },


        // 我的消息
		loadMyMessage: function(){
		
					this.clickLoadMore();
					var _this = this;
                    var o = this.options;
                    var oMyMsg = o.$urlapi;
                    var strHTML = "";
                    var pageNum = CORAL_CONFIG.options.centerPageSize;
                    var flagfirst = 1;
                    if (o.$urlapi.pageflag == 1) {
                        pageNum = 20;
                        flagfirst = 2;
                    }
                    $.ajax({
                        url: CORAL_CONFIG.options.user_msg + '&uid=' + o.$urlapi.userId + "&msgid=" + o.$urlapi.msgid + "&pageflag=" + o.$urlapi.pageflag + "&reqnum=" + pageNum + "&_=" + new Date().getTime(),
                        dataType: 'json',
                        beforeSend: function() {
                            _this._tips0 = new Date().getTime(); //Qoss时间戳
                        },
                        fail: function(error){
                            if(error && error.status == 500){
                                try{
                                    error = JSON.parse(error.responseText);
                                }catch(e){
                                    error = {error_code: -100, msg: "系统错误"};
                                }
                            }else if(error){
                                error = {error_code: -101, msg: "网络错误"};
                            }

                            switch(error.error_code){
                                // 登录失败 或者登陆超时
                                case 8:
                                    _this.showLoginLayer();
                                break;
                                default:
                                    // 遇到未知错误直接显示暂无提醒
                                    $('#my-message').children('.tipInfo').removeClass('waitting').html('暂无提醒').show();
                                    $('#loadMsgMore').hide();
                            }
                        },
                        success: function(data) { //从服务器得到数据，显示数据并继续查询 
                            
							var _tips1 = new Date().getTime(); //Qoss时间戳
							
                            if(data == false || data.retnum == 0){
                                if ($('#my-message-list li').length == 0) {
                                    $('#my-message').children('.tipInfo').removeClass('waitting').html('暂无提醒').show();
                                } else {
                                    $('#my-message').children('.tipInfo').hide();
                                }
                                return;
                            }
                            
                            if (oMyMsg.pageflag == 0) {
                                oMyMsg.msgid = oMyMsg.first = data.first;
                                oMyMsg.last = data.last;
                                $('#my-message-list').html('');
                                if (data.retnum < data.total && data.retnum == 10) {
                                    $('#loadMsgMore').show();
                                }
                                if (data.retnum == 0) {
                                    $('#my-message').children('.tipInfo').removeClass('waitting').html('暂无提醒').show();
                                    $('#loadMsgMore').hide();
                                    return;
                                }
                            }
                            if (oMyMsg.pageflag == 1) {
                                oMyMsg.msgid = oMyMsg.last = data.last;
                            }
                            var blueflag = "";
                            if (oMyMsg.pageflag == 2) {
                                oMyMsg.msgid = oMyMsg.first = data.first;
                                var blueflag = "blueflag";
                            }
                            var trueList = data.message;
                            $.each(trueList, function(index, info) {
                                strHTML += _this.myCreateHtml(info, "message", blueflag);
                            });
                            if (o.$urlapi.pageflag == 1) {
                                $("#my-message-list").append(strHTML);
                                _this.iframeHeight();

                            } else {
                                $("#my-message-list").prepend(strHTML);
                                _this.iframeHeight();
                                $("#my-message-list .blueflag").each(function(index, element) { /*20130710 by link*/
                                    _this.blueLine("#" + $(this).attr('id'));
                                });
                            }
                            if (flagfirst == 2) {
                                _this.conHeight(2); //20130805 提醒 by link
                            }
                            _this.iframeHeight();


                            if (data.retnum < pageNum || data.total <= pageNum) {

                                $('#loadMsgMore>span').hide();
                                $('#loadMsgMore>em').removeClass('np-load-more-loading');

                            } else {

                                $('#loadMsgMore>span').show();
                                $('#loadMsgMore>em').hide();

                            }
                            $('#my-message').children('.tipInfo').hide();
                            _this.iframeHeight();

  
							/*
							var CORAL_BOSS = require('coral.boss');
                            CORAL_BOSS.Qoss('wdtx', _this._tips0, {
                                1: (_this._tips0 + 1),
                                2: _tips1,
                                3: _tips1
                            }, 100);
							*/
                        }

                    });	
		},
		
		loadMyComment: function() { // 个人中心 我的评论列表拉取

                    var _this = this;
                    var o = this.options;
                    var oMyCmt = o.$urlapi_mycomment;
                    var pageNum = CORAL_CONFIG.options.centerPageSize;
                    var flagfist = 1;
                    var vip1 = '';
                    var vip2 = '';

                    if (o.$urlapi_mycomment.pageflag == 0) {
                        o.$urlapi_mycomment.last = 0;
                    }
                    if (o.$urlapi_mycomment.pageflag == 1) {

                        pageNum = 20;
                        flagfist = 2;

                    }
                    $.ajax({
                        url: CORAL_CONFIG.options.user_comment + '&uid=' + o.$urlapi_mycomment.userId + "&lastid=" + o.$urlapi_mycomment.last + "&pageflag=" + o.$urlapi_mycomment.pageflag + "&reqnum=" + pageNum + "&_=" + new Date().getTime(),
                        dataType: 'json',
                        beforeSend: function() {
                            _this._myCom0 = new Date().getTime(); //Qoss时间戳
                        },
                        fail: function(error){
                            if(error && error.status == 500){
                                try{
                                    error = JSON.parse(error.responseText);
                                }catch(e){
                                    error = {error_code: -100, msg: "系统错误"};
                                }
                            }else if(error){
                                error = {error_code: -101, msg: "网络错误"};
                            }

                            switch(error.error_code){
                                // 登录失败 或者登陆超时
                                case 8:
                                    _this.showLoginLayer();
                                break;
                                default:
                                    // 遇到未知错误直接显示暂无评论
                                    $('#my-notification').children('.tipInfo').removeClass('waitting').html('暂无评论').show();
                                    $('#loadCmtMore').hide();
                                    if ($('#my-notification-list li').length == 0){
                                        $('#my-notification').children('.tipInfo').show();
                                    }
                            }
                        },
                        success: function(data) { //从服务器得到数据，显示数据并继续查询 

                            var strHTML = '';
                            var _myCom1 = new Date().getTime(); //Qoss时间戳
                            var area = data.usermeta.region.replace(/:/g, ' ');
                            var myarea = ($.trim(area) != '' ? area : '腾讯网友');


                            $('#myuserInfo').find('img').attr('src', data.usermeta.head || '');
                            $('#myuserInfo').find('.np-user').html(data.usermeta.nick);
                            $('#myuserInfo').find('.a').html(myarea);
                            $('#myuserInfo').find('.b').html(data.usermeta.upnum);
                            $('#myuserInfo').find('.c').html(data.usermeta.commentnum);
                            $('#myuserInfo').show();

                            if (o.$urlapi_mycomment.pageflag == 0) {
                                o.$urlapi_mycomment.msgid = o.$urlapi_mycomment.first = data.first;
                                o.$urlapi_mycomment.last = data.last;
                                $('#my-notification-list').html('');
                                if (data.retnum == 10) {
                                    $('#loadCmtMore').show();
                                }

                                if (data.retnum == 0) {

                                    $('#my-notification').children('.tipInfo').removeClass('waitting').html('暂无评论').show();

                                    $('#loadCmtMore').hide();

                                    $('#myuserInfo').hide();

                                    _this.iframeHeight();

                                    return;

                                }

                            }

                            /*向下拉旧的*/

                            if (o.$urlapi_mycomment.pageflag == 1) {
                                o.$urlapi_mycomment.last = data.last;
                            }
                            /* 向上拉新的
                                     if(o.$urlapi_mycomment.pageflag==2){
                                             o.$urlapi_mycomment.msgid =o.$urlapi_mycomment.first = data.first;
                                                    }
                            */
                            $.each(data.comments, function(index, info) {
                                strHTML += _this.myCreateHtml(info, "myComment");
                            });

                            $("#my-notification-list").append(strHTML);
                            _this.conHeight(2); //20140416 由3改为2 by link
                            _this.iframeHeight();

                            setTimeout(function() {
                                _this.iframeHeight()
                            }, 200); // 个人中心延迟处理


                            if (data.retnum < pageNum || data.total <= pageNum) {

                                $('#loadCmtMore>span').hide();
                                $('#loadCmtMore>em').removeClass('np-load-more-loading');

                            } else {

                                $('#loadCmtMore>span').show();
                                $('#loadCmtMore>em').hide();

                            }

                            $('#my-notification').children('.tipInfo').hide();
							/*
                            Qoss('wdpl', _this._myCom0, {
                                1: (_this._myCom0 + 1),
                                2: _myCom1,
                                3: _myCom1
                            }, 100);
							
							*/

                        }

                    });
        },
		
		 /************************* link 个人中心数据渲染***************************************/


        myCreateHtml: function(info, type, blueflag) { // 创建 dom
				
					var FT = CORAL.FormatTime;
                    var o = this.options;
                    var _this = this;
                    var newstrHTML = "";
                    var picUrl = '',
                        HUIFU = false,
                        DING = false,
                        Userlist = "",
                        leftGrid = '',
                        article = '';
                    var replyString = ""
                    var listId = 'msg_';
                    var urlf = 'v_qq_com.comment'; // 视频站个性化-上报数据
                    if (this.options.film == 1) {
                        urlf = 'film_direct.comment';
                    }

                    var popClick = o.popupInfo;
                    var vip1 = '';
                    var vip2 = '';

                    //201404161813 新加个人中心图片显示
                    var moreLink = '';
                    if (info.repnum != 0) {
                        moreLink = _this.creatPostLink(info)
                    }
					if(info.content){
						 var imgHtml = '<p>' + info.content.replace(/\n/g, '<br />') + moreLink + '</p>';
					}
                   
                    var imgWH = '';
                        

                             //201408261805 新加图片显示
                        if (info.picture != undefined && info.picture.length) {
                            imgHtml +=  '<div><ul class="list_w100" id="pic_'+ info.id +'">';
                            for(var j=0, len=info.picture.length; j<len;j++){
                                if(info.picture[ j ].width>info.picture[ j ].height){
                                    imgWH = 'height=100';
                                }else{
                                    imgWH = 'width=100'
                                }
                                imgHtml += '<li class="list_item"><a href="javascript:void(0)" class="figure">'
                                +'<img data-order="'+ j +'" data-total="'+ len +'" data-width="'+ info.picture[ j ].width +'" data-height="'+ info.picture[ j ].height +'" '+ imgWH +' class="np-con-img" src="' + info.picture[ j ].url + '/100" /></a></li>' 
                            }
                            imgHtml += '</ul></div>'
                        }


                    if (type == 'message') { //提醒判断

                        //顶
                        if (info.tipstype == '4' && info.userlist) {
                            if (info.userlist.length > 0) {
                                $.each(info.userlist, function(i, uInfo) {
                                    // 增加好莱坞VIP
                                    if (o.huiyuan == 1) { // 是否是视频站
                                        if (uInfo.hwvip == 1) {
                                            vip1 = 'hyy';
                                            vip2 = 'huiyuan p' + uInfo.hwlevel;
                                        }
                                    }
                                    if (i > 0) {
                                        Userlist += "、"
                                    }
                                    Userlist += '<span class="' + vip1 + '"><a href="javascript:void(0)" post_uid=' + uInfo.userid + '  class="np-user ' + popClick + '">' + uInfo.nick + '</a></span>'
                                });
                                if (info.userlist.length < info.up) {
                                    Userlist += "等"
                                }
                            }

                            //如果只发了一张图片，没有内容，那么显示“发表了一张图片”

                            newstrHTML = '<li class="post np-post ' + blueflag + '" id="msg_' + info.id + '" tid="' + info.targetinfo.targetid + '">' + '<div class="np-post-header">' + '<span class="np-avatar np-avatar-upvote"></span>' + Userlist + info.up + '顶了你的评论：<span class="np-text-strong">' + ($.trim(info.content) == '' ? '发表了一张图片' : CORAL.SubString(info.content, 46)) + _this.creatPostLink(info) + '</span>' + '<span class="np-time" date="' + info.tipstime + '">' + FT(info.tipstime) + '</span>' + '</div>' + '<div class="np-post-content"><a class="np-link-weak" target="_blank" href="' + (info.targetinfo ? info.targetinfo.url : '') + '">' + info.targetinfo.title + '</a></div>' + '<div class="np-post-footer"></div>' + '<ul class="children"></ul></li>'

                        }

						if (info.tipstype == '8') {
                            // 增加好莱坞VIP
                            if (o.huiyuan == 1) { // 是否是视频站
                                if (info.userinfo.hwvip == 1) {
                                    info.vip1 = 'hyy';
                                    info.vip2 = 'huiyuan p' + info.userinfo.hwlevel;
                                }
                            }
                            if (info.userinfo.head) {
                                info.picUrl = info.userinfo.head.replace(/140/, "40") || 'http://t0.qlogo.cn/mbloghead/01676c4b10bbdb6f2618/50';
                            }
							info.tipstime = FT(info.tipstime);
							info.popClick = popClick;
							info.blueflag = blueflag;
							info.urlf = urlf;
							info.imgHtml = imgHtml;
							
							var render = require('../tpl/remind8');	 // 调用模板引擎		
							newstrHTML = render(info);

							//newstrHTML = template("remind8",info);
	
                        }
                        //回复
                        if (info.tipstype == '3') {
                            // 增加好莱坞VIP
                            if (o.huiyuan == 1) { // 是否是视频站
                                if (info.userinfo.hwvip == 1) {
                                    info.vip1 = 'hyy';
                                    info.vip2 = 'huiyuan p' + info.userinfo.hwlevel;
                                }
                            }
                            if (info.userinfo.head) {
                                 info.picUrl = info.userinfo.head.replace(/140/, "40") || 'http://t0.qlogo.cn/mbloghead/01676c4b10bbdb6f2618/50';
                            }
							
							info.tipstime = FT(info.tipstime);
							info.popClick = popClick;
							info.blueflag = blueflag;
							info.urlf = urlf;
							info.imgHtml = imgHtml;
							info.parentinfo.content = CORAL.SubString(info.parentinfo.content, 46);
							info.parentinfo2 = _this.creatPostLink(info.parentinfo);
							
							var render = require('../tpl/remind3');	 // 调用模板引擎		
							newstrHTML = render(info);
							//newstrHTML = template("remind3",info);

                        }

                        //被引用
                        if (info.tipstype == '6') {
                             info.picUrl = 'http://t0.qlogo.cn/mbloghead/01676c4b10bbdb6f2618/50'; 
							 info.content = CORAL.SubString(info.content, 46);
							 info.tipstime2 = FT(info.tipstime);
							 
							 var render = require('../tpl/remind6');	 // 调用模板引擎		
							 newstrHTML = render(info);
							 
							// newstrHTML = template("remind6",info);	
                        }

                        //举报

                        var alink, atitle = ' ';
                        if (info.targetinfo) {
                            info.alink = info.targetinfo.url || '';
                            info.atitle = info.targetinfo.title || '';
                        }
						
                        if (info.tipstype == '5') { // 举报评论
							info.blueflag = blueflag;
							info.popClick = popClick;
							info.tipstime1 = FT(info.tipstime);
							info.content = CORAL.SubString(info.content, 46);
							
							var render = require('../tpl/remind5');	 // 调用模板引擎		
							newstrHTML = render(info);
						}
						
						if (info.tipstype == '9') {  //举报用户
							info.tipstime = FT(info.tipstime);
							
							
							 var render = require('../tpl/remind9');	 // 调用模板引擎		
							 newstrHTML = render(info);
							
							//newstrHTML = template("remind9",info);

						}
                        var headP = info.userinfo.head ? info.userinfo.head.replace(/140/, "40") : '';
                    }

                    if (type == 'myComment') {
						info.imgHtml = imgHtml;
						info.time3 = FT(info.time);
                        if (info.parent != 0 && info.parentinfo) {
                            info.lineone = '<div>回复了<a post_uid=' + info.parentinfo.userinfo.userid + ' href="javascript:void(0)" class="np-user ' + popClick + '">' + info.parentinfo.userinfo.nick + '</a>的评论<span class="np-text-strong">' + CORAL.SubString(info.parentinfo.content, 46) + '</span></div>'

                        } else {
                            info.lineone = '发表评论';
                        }
                        info.titleHtml = '<a href="' + info.targetinfo.url + '" target = "_blank" class="np-link-weak">' + (info.targetinfo.title ? info.targetinfo.title : ' ') + '</a>';
						
						 var render = require('../tpl/mycomments');	 // 调用模板引擎		
					     newstrHTML = render(info);
						//newstrHTML = template("mycomments",info);
					}
                    return newstrHTML
        },
		
		clickLoadMore: function() { // 个人中心 loadMore 按钮
		
                    var _this = this;
                    var o = this.options;
					
					$('body').delegate('#loadMsgMore>span','click',function(){
					
						$('#loadMsgMore>span').hide();
                        $('#loadMsgMore>em').addClass('np-load-more-loading').show();
                        o.$urlapi.pageflag = 1; //翻页标志 0:第一页    1: 下一页               2:上一页
                        o.$urlapi.msgid = o.$urlapi.last; //更新最后列表标记
                       _this.loadMyMessage();
					   
                       // sendClientStat(curSite, 1, cmt_id, 'clk_notice_more'); //拉取提醒更多
					
					});
					
					$('body').delegate('#loadCmtMore>span','click',function(){
                   

                        $('#loadCmtMore>span').hide();
                        $('#loadCmtMore>em').addClass('np-load-more-loading').show();

                        o.$urlapi_mycomment.pageflag = 1; //翻页标志 0:第一页 1: 下一页 2:上一页
                        o.$urlapi_mycomment.msgid = o.$urlapi_mycomment.last; //更新最后列表标记
                        _this.loadMyComment();
                        //sendClientStat(curSite, 1, cmt_id, 'clk_mycomment_more'); //
                    });
        },
		
		
		creatPostLink: function(info) {
                    var o = this.options;
                    // 三个蓝杠
                    return "<a class=\'" + CORAL_CONFIG.options.popupLink + "\' targetid=\'" + info.targetid + "\' commentid=\'" + info.id + "\' parentid=\'" + info.parent + "\' href=\'javascript:void(0)\'><img src='http://mat1.gtimg.com/www/niuping2013/postframe/transparent.gif' /></a>";

        },
		
		 /*  同步评论框 外iframe高度方法  */

        iframeHeight: function() {
                    var contentHeight = $('#mainBody').height();
                    if($(parent.document.body).find('#commentIframe1').length){
										$(parent.document.body).find('#commentIframe1').height(contentHeight);
									}else{
										$(parent.document.body).find('#commentIframe').height(contentHeight);
					}
                    if (parent.registerCoralEvent) {
                        if (parent.registerCoralEvent.iframeHeight) {
                            parent.registerCoralEvent.iframeHeight();
                        }
                    }
        },
		conHeight: function(a) {

                    var _this = this;
                    var $conClass = $('#allComments .np-post .np-post-content[data-height!=5]');
                    var lineH = 24;
                    if ($('#allComments .np-post .np-post-content').length) {
                        if (/px/.test($conClass.css('line-height'))) {

                            lineH = $conClass.css('line-height').split('px')[0];
                        }
                        if (a == 2) {
                            $conClass = $('#my-message-list .np-post .np-post-content[data-height!=5] p');
                        }
                        if (a == 3) {
                            $conClass = $('#my-notification-list .np-post .np-post-content[data-height!=5]');
                        }
                        if (a == 5) {
                            $conClass = $('#allComments .topIco .np-post-content[data-height!=5]');
                        }
                        $conClass.each(function(index, element) {
                            $(this).attr('data-height', '5');
                            if ($(this).height() > lineH * 6 && !$(this).next('.spreadMoreBtn').length) {
                                $(this).css({
                                    height: lineH * 5,
                                    'overflow': 'hidden'
                                });
                                //$(this).after('<div class=\"\"><span>展开</span></div>');
                                $(this).after('<a href="javascript:void(0)" class="spreadMoreBtn np-btn np-btn-spread"><i class="np-icon np-icon-spread"></i></a>');
                            }
                        });

                    }
        },
		blueLine: function(targetId) {

                    setTimeout(function() {
                        $(targetId + '>.np-tip-newpost').animate({
                            opacity: '0'
                        }, 10000);
                        setTimeout(function() {

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

module.exports =  CORAL_CENTER; // 暴露接口

});

//CORAL_CENTER.clickLoadMore();