     /*code by 2013.6.17  15:32 chuangwang*/
	 /*code by 2015.1.27  11:03 chuangwang*/

	 
define(function(require, exports, module) { 	 
	 
    var upLoadImgError; // 上传图片20秒超时
   
   // (typeof $ != 'undefined' && $.noConflict && typeof jQuery != 'object') && $.noConflict();  // 释放$控制权
    
	var coralComment = {}
	
    jQuery(document).ready(function() {

        (function($) {

            var beta = '6.0';
            var $doc = $(document);
            var $parent = $(parent.document) || ''; // iframe 情况
            var $win = $(window);
            var $body = $('body');
            var __uin = null; //记录当前用户的uin
            var maxID = "";
            var defaultHeadPic = '//mat1.gtimg.com/www/coral2.0/images/g.gif';
            var newsUrl = location.protocol + '//' + location.host + location.pathname;
            var tabsFlag = 'true';
            var cmt_id = cmt_id || parent.cmt_id;

            /**
             * 用于识别当前频道等
             */
            var curSite = '';

            if ((top.location.host).split('.')[0] == 'www') {
                curSite = (top.location.host).split('.')[1];
            } else {
                curSite = (top.location.host).split('.')[0];
            }
			
			var CORAL_BOSS = require('coral.boss');
			var CORAL_LOGIN = require('coral.login');
			var CORAL_CONFIG = require('coral.config');
			var CORAL = require('coral.base');
			var CORAL_CENTER = require('coral.center');
			var CORAL_DOM = require('coral.dom');
			var CORAL_IMG = require('coral.img');
			var CORAL_REALTIME = require('coral.realtime');
			var CORAL_IMG = require('coral.img');
			var CORAL_POST = require('coral.post');
			
            coralComment = {
                options: {

                    $content: $('#content'),
                    $showNum: $('#showNum'),
                    $commentTotleNum: $("#commentTotleNum"), // 全部评论数
                    $loadMore: $("#loadMore"), // loadmore 按钮
                    $allComments: $('#tab1_allComments'), // 全部评论页卡
                    $myComments: $('#tab2_myComments'), //我的牛评页卡
                    $myTips: $('#tab3_tips'), // 提醒页卡
                    $myCons: $('#tab4_mycon'), // 我的评论
                    
					$loginFlag: $('#loginFlag'), //去掉
					$loginBtn: $('#top_post_btn'),
					loginuin: 0,
					$top_textarea: $('#top_textarea'),
					centerFlag: 0, // 个人中心我的牛平拉取评论标志
					$myCowComment: $('#myCowComment'), // 我的牛评按钮
					$myAllComment: $('#myAllComment'), // 个人中心 全部评论
					changeFlag: 0,
					huiyuan: 0,
				
                    $iframeHeight: '0',
                    $replylistId: '',

                    // 个人中心的变量

                    $tabFlag: true,
                    $insertFlag: 'comment', // 标记回复评论位置                             
                    topContentTips: '',
                    reportId: '',
                    order: '', // 排序方式， '':时间,quality：热度  //20130911
                    upId: '',
                    lastId: ''
					
                },
                _create: function() {

                    var _this = this;
                    this.init(); // 个性化定义初始化 设置     
                    this.changeTab();
                    this.bindSubmitEvent();
                    this.bindReportEvent(); //举报功能
                    this.bindDeleteEvent();
                    this.bindFooterEvent(this.options.$content);
                    this.bindOtherEvents();
                    // this.loadCommentNum(); // 初始化评论数
                    this.hotList();
                    this.makeCommentList();
                    this.tabsComment();
                    //this.clickLoadMore(); //个人中心的提醒 loadmore    
                    this.sendStat(curSite);
                    this.loadNum();
					CORAL_IMG.upLoadImg(); //上传图片，初始化
					
                    if (!$('#iframe0').length) {
                        $body.append('<iframe id="iframe0" name="iframe0" style="display:none"><script type="text/javascript"></script></iframe>');
                    }
                },

                init: function() {

					var o = CORAL_CONFIG.options;	

					// 拉取json - 踩用

					$.getScript(window.coralStaticPath + '/js/json.js',function(){
				
						o.cmt_array = cmtt_id.data.commentid;
						$.each(o.cmt_array,function(index,info){
							if(info.id == cmt_id){
								
								o.cmt_class = '';
								o.cmt_content = info.content;
								
								return false ;
							}else{
								
								o.cmt_class = 'np-tip-newpost1';
								//return;
							
							}
						
						})
					
					});
			
                    $(parent.document).find('#commentIframe').css({
                        '-webkit-transition': 'height 0.6s ease',
                        'transition': 'height 0.6s ease'
                    });
					if($(parent.document).find('#commentIframe1')){
									$(parent.document).find('#commentIframe1').css({'-webkit-transition':'height 0.6s ease','transition':'height 0.6s ease'});
								
					}
                    $('#mainBody').css('width', '100%');
                    CORAL_CONFIG.options.commentNumbers = ($(parent.document).find('.commentNumbers')) ? ($(parent.document).find('.commentNumbers')) : '';
                    if (!$('#allComments .post-list').length) {
                        $('#allComments').append("<ul class='post-list'></ul>");
                    }
                    $("a").each(function() {
                        $(this).attr("hideFocus", "true");
                    })
					
                    if(CORAL_CONFIG.options.comment_enable === false){
                        $(".np-reply-box-content").hide();
                    }
					CORAL_CONFIG.init();// 页面配置初始化

                },

             	
				
				// 单独拉评论数方法 -- 2013.9.6

                // loadCommentNum: function() {

                //     var _this = this;
                //     var o = this.options;
                //     var numurl = CORAL_CONFIG.options.article_commentnum+ '&targetid=' + cmt_id + "&_=" + (new Date()).getTime();
                //     $.ajax({
                //         "type": "GET",
                //         url: numurl,
                //         dataType: 'json',
                //         //jsonpCallback: 'myHotcommentNum',
                //         beforeSend: function() {
                //             _this._hotTimer0 = new Date().getTime(); //Qoss时间戳
                //         },
                //         success: function(data) {
                //             CORAL_CONFIG.options.commentNumbers.html(data.commentnum);
                //             o.$commentTotleNum.html('（' + data.commentnum + '）');
                //         }
                //     });


                // },

                makeCommentList: function() { // 首页评论渲染 --后面需要修改
                    var _this = this;
                    var o = this.options;
           
                    if (CORAL_CONFIG.options.columLink == 2) {

                        $('#globalNav h1').hide();
                        $('#globalNav').css('border-bottom', 'none');

                    }


                    if (CORAL_CONFIG.options.columApi) {
                        _this.loadMore();
                    }

                    o.$loadMore.find('span').unbind().bind('click', function() {

                        $('#loadMore>span').hide();
                        $('#loadMore>em').addClass('np-load-more-loading').show();
                        _this.loadMore(o.lastId);
                        if (o.$loadMore.data('loadMoreNume') - CORAL_CONFIG.options.homePageSize <= 0) {
                            o.$loadMore.hide();
                            o.$loadMore.data('loadMoreNume', 0);
                        } else {
                            o.$loadMore.data('loadMoreNume', o.$loadMore.data('loadMoreNume') - CORAL_CONFIG.options.homePageSize);
                        }
						CORAL_BOSS.sendClientStat(curSite, 1, cmt_id, 'clk_allcomment_more');
                    })
                }, //  makeCommentList方法结束


                hotList: function() { // 置顶评论渲染

                    var _this = this;
                    var o = this.options;
                    var moreUrl = CORAL_CONFIG.options.article_hotcomment + "&targetid=" + cmt_id + '&reqnum=' + CORAL_CONFIG.options.hotPageSize + "&_=" + (new Date()).getTime();

                    if (CORAL_CONFIG.options.columHot) { // 是否加载热评
                        $.ajax({
                            "type": "GET",
                            url: moreUrl,
                            dataType: 'json',
                            //jsonpCallback: 'myHotcommentList',
                            beforeSend: function() {
                                _this._hotTimer0 = new Date().getTime(); //Qoss时间戳
                            },
                            success: function(data) {
                                var _hotTimer1 = new Date().getTime(); //Qoss时间戳
                                if (data.commentid.length != 0) {
                                    var num = (data.commentid.length);
                                    $.each(data.commentid, function(index, info) {
                                        $('#allComments .post-list').prepend(CORAL_DOM.creatHtml(data.commentid[num - index - 1], 0, 'top'));
                                    });
                                    $.each($('#allComments li.topAll'), function(index, info) {
                                        if (index == (num - 1)) {
                                            $(this).addClass('noborder');
                                            $(this).after('<li class="np-title-new">最新评论</li>');
                                        }
                                    });
                                    $('#allComments .post-list').prepend('<li class="np-title-hot">热门评论</li>');
                                    CORAL.ConHeight(5);
                                    setTimeout(function() {
                                         CORAL.IframeHeight();
                                    }, 600)
                                }

                                CORAL_BOSS.Qoss('zrpl', _this._hotTimer0, {
                                    1: (_this._hotTimer0 + 1),
                                    2: _hotTimer1,
                                    3: _hotTimer1
                                }, 100);
                            }
                        });
                    }
                },


                tabsComment: function() { // 页卡公用方法
                    var _this = this;
                    var o = this.options;
					
                    $('#mycon').unbind().click(function() {
					
                        $(this).addClass('np-active');
                        $('#mytips').removeClass('np-active');
                        o.$myTips.hide();
                        o.$myCons.show();
                        if ($('#my-notification-list li').length == 0) {
                            setTimeout(function() {
                                
								CORAL_CENTER.loadMyComment();
								
                            }, 500);
                            $('#myuserInfo').hide();
                        }
                        CORAL_BOSS.sendClientStat(curSite, 1, cmt_id, 'clk_mycomment');
                        CORAL.IframeHeight();
						
						
                    });

                    $('#mytips').unbind().click(function() {
                        $(this).addClass('np-active');
                        $('#mycon').removeClass('np-active');
                        o.$myTips.show();
                        o.$myCons.hide();

                        if ($('#my-message-list li').length == 0) {
                            CORAL_CENTER.loadMyMessage();
                        }
                        CORAL_BOSS.sendClientStat(curSite, 1, cmt_id, 'clk_notice');
                        CORAL.IframeHeight();
                    });

                    //20130903排序方式
                    //排序方式初始化事件

                    if (o.order != '') {
                        $('#order a').removeClass('np-active');
                        $('#order a[data-sort=' + o.order + ']').addClass('np-active');
                    }
                    $('#order a').unbind().click(function() {
                        if ($(this).attr('data-sort') == 'time') {
                            CORAL_BOSS.sendClientStat(curSite, 1, cmt_id, 'clk_order_time');
                        } else {
                            CORAL_BOSS.sendClientStat(curSite, 1, cmt_id, 'clk_order_hot');
                        }
                        if ($(this).hasClass('np-active')) {
                            return
                        } //如果已经选中，直接返回

                        $('#order a').removeClass('np-active');
                        $(this).addClass('np-active');
                        $('#allComments .tipInfo').addClass('waitting').html('').show(); // 初始化loadding状态
                        o.order = $(this).attr('data-sort') != 'time' ? $(this).attr('data-sort') : '';
                        $('#allComments .post-list').html(''); // 清空数据
                        $('#allComments .waitting').show(); // 显示加载中
                        o.$loadMore.hide();

                        // 隐藏‘加载更多’
                        if (o.order != 'quality') {
                            setTimeout(function(){ // 解决ie6不加载问题
                                _this.hotList();
                            },200)
                        }
                        setTimeout(function() {
                            _this.loadMore(0, 1)
                        }, 500); // 拉取数据
                    })
                },


                loadMore: function(lastID, order) {

                    var _this = this;
                    var o = this.options;
                    lastID = lastID || 0;
                    var pageNum = CORAL_CONFIG.options.homePageSize;
                    if (lastID) {
                        pageNum = 20;
                    }
                 
                    var moreUrl = CORAL_CONFIG.options.article_comment + '&targetid=' + cmt_id + '&commentid=' + lastID + '&reqnum=' + pageNum + '&order=' + o.order + "&_=" + (new Date()).getTime();
                    function emptyListOrForbiddenL() {

                        if ($('#allComments li').length == 0) {
                            $('#allComments').children('.tipInfo').removeClass('waitting').html('暂无评论').show();
                        }
                        if (!$('#allComments .post-list').length) {
                            $('#allComments').append("<ul class='post-list'></ul>");
                        };

                    }
                    $.ajax({
                        "type": "GET",
                        url: moreUrl,
                        dataType: 'json',
                        beforeSend: function() {
                            _this._latestTimer0 = new Date().getTime(); //Qoss时间戳
                        },
                        error: emptyListOrForbiddenL,
                        //jsonpCallback: 'mainComment',
                        success: function(data) {
                                o.lastId = data.last;
                                var _latestTimer1 = new Date().getTime(); //Qoss时间戳
                                if ((data.retnum < data.reqnum || data.total <= CORAL_CONFIG.options.homePageSize)) {
                                    $('#loadMore>span').hide();
                                    $('#loadMore>em').removeClass('np-load-more-loading').show();
                                } else {
                                    $('#loadMore>span').show();
                                    $('#loadMore>em').hide();
                                }
                                o.$showNum.data('maxID', data.maxid); // 记录最大ID 用于更新新评论标记

                                show1(data);

                                CORAL.IframeHeight();

                                if (!lastID) { // 如果是初始化首页列表 

                                    if (data.reqnum < data.total && $('#allComments li').length > 0) {
                                        o.$loadMore.show();
                                    }

                                    //CORAL_REALTIME.probeEvent(); // 启动探测接口 实时新评论

                                    // o.$commentTotleNum.html('（' + data.total +'）');
                                    CORAL_CONFIG.options.commentNumbers.html(data.total);
                                    if ($(parent.document.getElementById('cmtNum'))) {
                                        $(parent.document.getElementById('cmtNum')).html(data.total);
                                    }
                                    if ($(parent.document.getElementById('cmtNum2'))) {
                                        $(parent.document.getElementById('cmtNum2')).html(data.total);
                                    }
                                }


                            //20130917暂无评论不显示“更多”按钮
                            if ($('#allComments li').length == 0) {
                                o.$loadMore.hide();
                            }

                            CORAL_BOSS.Qoss('zxpl', _this._latestTimer0, {
                                1: (_this._latestTimer0 + 1),
                                2: _latestTimer1,
                                3: _latestTimer1
                            }, 100);


                        }
                    });
                    var show1 = function(commentList) {

                        if (!commentList.commentid.length && $('#allComments li').length == 0) {
                            if (o.order != '' && order != 1) {
                                $('#order span[data-sort=time]').trigger('click');
                            }
                            if (o.order == 'quality') {
                                $('#allComments').children('.tipInfo').removeClass('waitting').html('暂无热评').show();
                            } else {
                                $('#allComments').children('.tipInfo').removeClass('waitting').html('暂无评论').show();
                            }
                            o.$loadMore.hide();
                        } else {
                            $('#allComments').children('.tipInfo').hide();
                        }

                        if (!$('#allComments .post-list').length) {
                            $('#allComments').append("<ul class='post-list'></ul>");
                        }
                        $.each(commentList.commentid, function(index, info) {

                            if (info.parent == 0 || $('#comment_' + info.parent).length == 0) {
                                
                                if ($('#comment_' + info.parent).length == 0 && info.parent != 0) {

                                    info.classNone = 'none';

                                } else {
                                    info.classNone = '';

                                }
                                $('#allComments .post-list').append(CORAL_DOM.creatHtml(info));

                            } else {

                                if ($('#comment_' + info.parent).hasClass('postHide')) {

                                    info.classNone = 'none';
                                } else {
                                    info.classNone = '';

                                }
                                $('#comment_' + info.parent + '>ul.children').append(CORAL_DOM.creatHtml(info));

                            }
                        });
                        $('.deleted-post').remove();
                        if ($('#allComments li.np-post').length == 0) {
                            $('#allComments').children('.tipInfo').removeClass('waitting').html('暂无评论').show();
                        }
                        $('#allComments .post-list .postHide').find('.replywho:first').hide();
                        var factCommentNum = $('#allComments').find('li.np-post').length;
                        $('#commentTotleNum').html('（' + factCommentNum + '）');
                        setTimeout(function() {
                            CORAL.ConHeight()
                        }, 300);
                        setTimeout(function() {
                             CORAL.IframeHeight();
                        }, 500);
                        //_this.conHeight();

                    }
                },
				
              
                loadNum: function() {

                    var _this = this;
                    var o = this.options;
                    var id = $.cookie('uid');
					
                    var url = '//sync.coral.qq.com/u/' + id + '?platform=' + CORAL_CONFIG.options.siteName; 
                    if (!/^\d+$/.test(id + '')) {
                        return;
                    }

                    var realNums = function() {

                        if (o.$tabFlag && $.cookie('uin') && parseInt(id) > 10000) { // 当前活跃窗口

                            $.ajax({
                                url: url,
                                dataType: 'jsonp',
                                jsonpCallback: 'userNum',
                                success: function(data) {

                                    if (data > 0) {
                                        $('#popMsg').html(data).show();

                                    } else {
                                        $('#popMsg').html('').hide();
                                    }
                                    setTimeout(function() {
                                        realNums()
                                    }, 30000);
                                },
                                error: function() {
                                    setTimeout(function() {
                                        realNums()
                                    }, 30000);
                                }
                            });
                        } else {
                            setTimeout(function() {
                                realNums()
                            }, 30000);
                        }
                    }
                    realNums();
                },


                

                /**  切换页卡 **/

                changeTab: function() {

                    var o = this.options;
                    var _this = this;
                    $(document).bind({
                        'show.visibility': function() { // 当前活跃
                            o.$tabFlag = true;
                        },
                        'hide.visibility': function() { // 失去当前状态
                            o.$tabFlag = false;
                        }
                    });
                },

                bindFooterEvent: function(container) { // 参数为评论列表容器

                    var _this = this;
                    var o = this.options;
                    var publicContent = $('.pop_reply'); //获取公共评论框
                    var publicSubmit = $('.pop_reply a.submit');
                    var publicText = $('.pop_reply textarea');

                    container.delegate('.reply', 'click', function(ev) { // 绑定弹框事件

                        var event = ev || window.event;
                        var commentsId = $(this).parents('li.np-post').attr('id'); // comment_32424344
                        publicSubmit.attr('id', ('pop_' + commentsId)); // pop_comment_32424344
                        publicText.attr('id', ('pop_text_' + commentsId)); // pop_text_comment_32424344 
                        var childwrap = $(this).closest('.np-post-body').next('.children'); // 获取空层 .children
                        childwrap.find('.np-reply-box-footer a').removeClass('submitOn').addClass('submit').html('回复');
                        childwrap.find('textarea').val('');
                        event.stopPropagation(); // 阻止冒泡
                        if (childwrap.has('.pop_reply').length && (childwrap.children().first().attr('id')) == 'public_reply') {

                            if (childwrap.children('.pop_reply').is(':visible')) {
                                childwrap.children('.pop_reply').find('.commtSub').hide();
                                childwrap.children('.pop_reply').slideUp('10', function() {

                                    CORAL.IframeHeight();

                                });

                            } else {

                                childwrap.children('.pop_reply').find('.commtSub').show();
                                childwrap.children('.pop_reply').slideDown('100', function() {

                                     CORAL.IframeHeight();

                                });
                                setTimeout(function() {
                                    childwrap.children('.pop_reply').find('textarea').focus()
                                }, 200);
                            }
                        } else {
                            container.find('.pop_reply').slideUp('10', function() {
                                $(this).remove();
                                CORAL.IframeHeight();

                            });

                            childwrap.prepend(publicContent.clone());

                            childwrap.children('.pop_reply').slideDown('100', function() {
                                // childwrap.children('.pop_reply').find('.commtSub').show().animate({
                                //     height: '48px'
                                // }, 'fast');
                                CORAL.IframeHeight();

                            });
                            setTimeout(function() {
                                childwrap.children('.pop_reply').find('textarea').focus()
                            }, 200);
                        }

                        //绑定上传图片事件
                        $('.children .add_file').on('change',function(){
                            
                            CORAL_IMG.upLoadchange($(this))
                        })

                         CORAL.IframeHeight();
                    });


                    container.delegate('.pop_reply', 'click', function(event) {
                        // 上传图片有点击事件 阴止冒泡不能触发 by 20140819 link
                        //event.stopPropagation(); // 阻止冒泡    

                    });


                    container.delegate('.submit', 'click', function() { // 绑定submit提交按钮事件

                        var _status = CORAL_LOGIN.getUin(); //先获取用户状态
                        var tid = $(this).closest('[tid]').attr('tid');
                        o.replylistId = $(this).attr('id').split('_')[2];
                        if (_status !== 0 && _status !== null) { // 如果用户存在
                            _this.checkAndPublish(this.id, tid);
                            o.$insertFlag = this.id.split('_')[1]; // 标记发表回复的位置 comment/我的主评 msg/提醒 post/我的评论
                            CORAL_BOSS.sendClientStat(curSite, 1, cmt_id, 'pub_reply');
                        } else { //未登陆
                            CORAL_LOGIN.showLoginLayer();
                        }

                    });
                    container.delegate('.pop_user_login', 'click', function() {
                        CORAL_LOGIN.showLoginLayer();

                    });

                    $('#my-notification').delegate('.upvote', 'click', function() {
                        alert('自己不能顶自己');
                        return false;

                    });

                    // 发起顶帖的请求
                    container.delegate('.upvote', 'click', function() { //绑定顶事件
                        var self = $(this);
                        var textid = $(this).attr('id');
                        var commentid = textid.split('_')[1];
                        o.uptId = textid;
                        if ($(this).hasClass('np-btn-active')) {
                            return false;
                        }
                        if ($.cookie('uid') == $(this).parent().parent().find(".np-user").attr('post_uid')) {
                            alert('自己不能顶自己');
                            return false;
                        }
                        //个人中心中targetid可能是其它文章的targetid
                        var tgtID = cmt_id;
                        if ($(this).closest('[tid]').length) {
                            tgtID = $(this).closest('[tid]').attr('tid');
                        }
                        var url = CORAL_CONFIG.options.dig_comment;
                        $.post(url, {commentid: commentid, targetid: tgtID}, function(data){
                            var emNum = self.find('em');
                            var eNum = parseInt(emNum.text());
                            emNum.html(eNum + 1);
                            self.addClass('np-btn-active');
                        }, "json")
                        .fail(function(error){
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
                                case 8:
                                    CORAL_LOGIN.showLoginLayer();
                                break;
                                case 12:
                                    self.addClass('np-btn-active');
                                    alert("不能多次点赞");
                                break;
                                default:
                                    alert("网络错误");
                            }
                        });
                    });
					
					
                    // 踩评论
					container.delegate('.cpvote', 'click', function() { //绑定踩
                        var self = $(this);
                        var textid = $(this).attr('id');
                        var commentid = textid.split('_')[1];
                        o.uptId = textid;

                        if ($(this).hasClass('np-btn-active')) {
                            return false;
                        }

                        if ($.cookie('uid') == $(this).parent().parent().find(".np-user").attr('post_uid')) {

                            alert('自己不能踩自己');
                            return false;
                        }

                        //个人中心中targetid可能是其它文章的targetid
                        var tgtID = cmt_id;
                        if ($(this).closest('[tid]').length) {
                            tgtID = $(this).closest('[tid]').attr('tid');
                        }
                    
                        var url = CORAL_CONFIG.options.cai_comment;
                        $.post(url, {commentid: commentid, targetid: tgtID}, function(data){
                            var emNum = self.find('em');
                            var eNum = parseInt(emNum.text(), 10);
                            emNum.html(eNum + 1);
                            self.addClass('np-btn-cactive');
                        }, "json")
                        .fail(function(error){
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
                                case 8:
                                    CORAL_LOGIN.showLoginLayer();
                                break;
                                case 12:
                                    self.addClass('np-btn-active');
                                    alert("不能多次点赞");
                                break;
                                default:
                                    alert("网络错误");
                            }
                        });

                    });
					
					
                    container.delegate('.newcoment', 'click', function() { // 点击显示回复数

                        var trueId = $(this).attr('id').split('_')[1];
                        $('#comment_' + trueId + '>ul.children li .newcoment').hide();
                        $('#comment_' + trueId + '>ul.children li.undis').removeClass('undis').addClass('blueflag');

                        CORAL.IframeHeight();

                        $(this).hide();
                        $('#comment_' + trueId).data('num', 0);


                        $('#comment_' + trueId + '>ul.children li.blueflag').each(function(index, element) {
                            CORAL.BlueLine('#' + $(this).attr('id'));
                        });
                        CORAL_BOSS.sendClientStat(curSite, 1, cmt_id, 'clk_newreply_notice');


                    });

                    //加长评论的更多按钮20130730
                    container.delegate('.spreadMoreBtn', 'click', function() {
                        $(this).prev().css('height', '');
                        $(this).hide();
                         CORAL.IframeHeight();
                    });
					
                     
                    //评论图片点击放大201404161907 by link
                    container.delegate('.np-con-img', 'click', function() {
                        return; /// 先屏蔽 
                        var picHtml='';
                        var $picData='' ;
                        var picDataHtml='' ;
                        var btnHtml = '';
                        var $picPlayIframe;
                        var order = $(this).attr('data-order'); //点击图片的位置
                        var winH = $(top.window).height();
                        var winW = $(top.window).width();
                        var picH = $(this).attr('data-height');
                        var picW = $(this).attr('data-width');
                        var imgH = '';
                        var imgW = '';
                        var picPageFlag='none';
                        var picCurrent = 0;
                        var picTotal = 0;
                        var picUrl = $(this).attr('src')

                        //( winW - (picH*) )/2

                        classTypePrve='';
                        classTypeNext='';
                        var picId = $(this).closest('.list_w100').attr('id')
                        var picListHtml = ''  
                        if(!$(top.window.document.body).find('#picPlayIframe').length ){
						
							$(top.window.document.body).find('#picPlayIframe0').remove();
                            var piciframe = '<iframe  id="picPlayIframe" data-flag="main" data-id="'+ picId +'" data-order='+ $(this).attr('data-order') +' data-total='+ $(this).attr('data-total') 
                                +' src ="//www.qq.com/coral/coralBeta3/coralImgDom3.0.htm?'+ new Date().getTime() +'" allowTransparency="true"  frameborder="0" scrolling="no" '
                                +'style="width:100%;height:100%;z-index:999999;position:fixed;_position:absolute;top:0px;left:0px;border:none;overflow:hidden;">'+'</iframe>'
                            $(top.window.document.body).append(piciframe);
                        }else{
                            $(top.window.document.body).find('#picPlayIframe').show()
                            $(top.window.document.body).find('#picPlayIframe').attr({
                                'data-id': picId,
                                'data-order': $(this).attr('data-order'),
                                'data-total': $(this).attr('data-total'),
                                'data-flag':'main'
                            });
                        }
                      
                    });

                    // $(top.document.body).delegate('#picPrve','click',function(){CORAL_LOGIN
                    // })
                },
                /**
                 * 点击发表按钮后的动作 /公共的submit
                 */

                bindSubmitEvent: function() {
                    var _this = this;
                    var o = this.options;
                    // 提交事件
                    o.$loginBtn.unbind().click(function() {
                        if (CORAL_LOGIN.getUin() && $(this).html() != '登录') {
                            // 判断是否是禁止评论
                            if(CORAL_CONFIG.options.comment_enable === false){
                                return;
                            }
                            _this.checkAndPublish(this.id);
                            o.$insertFlag = 'comment';

                        } else {
                            CORAL_LOGIN.showLoginLayer();
                        }
                    });

                },
                /**
                 * 删除功能 2013.12.30
                 */

                bindDeleteEvent: function() {
                    var _this = this;
                    var o = this.options;

                    $('#mainBody').delegate('.delete', 'click', function(event) {

                        var __this = $(this);
                        var divClass = 'popdelete';
                        var liId = __this.attr('id').split('_')[1];
                        if (CORAL_LOGIN.getUin()) {

                            if ($('#my-notification-list li.np-post:last').attr('id') == ('post_' + liId)) {
                                divClass = 'popdeletee';
                            }
                            $('#my-notification-list li.np-post').css('z-index', '1');
                            $('.popdeletee').remove();
                            $('.popdelete').remove();
                            $('#post_' + liId).css('z-index', '100');

                            __this.parent().append('<div class="' + divClass + '"><div class="popdelete_con"><h4>确认删除<a href="javascript:;" class="close" id="d_close">关闭</a></h4><em>删除该评论后，它的所有回复也将被一块删除，确认要删除嘛？</em><p><input class="cancel" type="button" value="取消" id="d_cancel"/><input class="confirm" type="button" value="确定" id="d_confirm"/></p></div></div>');

                            $('#d_confirm').click(function() {
                                CORAL_POST.postData(__this.attr('id'), __this.closest('[tid]').attr('tid'));
                            })
                            $('#d_cancel').click(function() {
                                __this.next('.popdelete').remove();
                            });
                            $('#d_close').click(function() {
                                __this.next('.popdelete').remove();
                            });


                        } else {
						
                            CORAL_LOGIN.showLoginLayer();
                        
						}
                        event.stopPropagation(); // 阻止冒泡    

                    });

                    $doc.unbind().bind('click', function() {

                        $('#my-notification-list .delete div').remove();

                    });

                },

                /**
                 * 举报功能 2013.9.22
                 */

                bindReportEvent: function() {

                    var _this = this;
                    var o = this.options;
                    var publicReport = $('.np-report'); //获取页面举报框
					
					
                    $('#mainBody').delegate('.report', 'click', function() {  // 举报

                        var __this = $(this);
                        var _status = CORAL_LOGIN.getUin(); //先获取用户状态

                        if (_status !== 0 && _status !== null) { // 如果用户存在

                            if (!($(this).find('em').length)) {

                                /*  安平举报暂时去掉*/
                                $('#allComments .np-report').remove();
                                $('#allComments li.np-post').css('z-index', '1');
                                $(this).parent().append(publicReport.clone().show());
                                var liId = $(this).attr('id').split('report_')[1];



                                $(this).parent().find('.close').bind('click', function() {
                                    __this.parent().find('.np-report').remove();
                                    $('#content li.np-post').css('z-index', '1');
                                    
                                });

                                $(this).parent().find('.np-report-cancel').bind('click', function() {
                                    __this.parent().find('.np-report').remove();

                                    __this.parents('.np-post').trigger('mouseout');

                                    $('#content li.np-post').css('z-index', '1');
                                    $('.article-page').removeClass('jubao');


                                });

                                $(this).parent().find('#impeach_desc').focus(function() {
                                    $(this).val('');
                                    $(this).css('color', '#333');
                                });

                                $(this).parent().find('.np-report-submit').bind('click', function() {


                                    if (__this.parent().find("input[name='impeach_content']:checked").length) {
                                         

                                            __this.parent().find('.np-report h5').append('<div id="RT" class="pop_report_area"><span  class="pop_report2">举报已提交，我们稍后会进一步审核确认感谢您的参与！</span></div>');

                                            setTimeout(function() {
                                                $('#RT').remove();
                                                CORAL_POST.postData(__this.attr('id'), __this.closest('[tid]').attr('tid')); 
                                                $('.article-page').removeClass('jubao');
                                            }, 2000);

                                    } else {

                                        if (__this.parent().find('.np-report h5').find('span').length == 0) {

                                            __this.parent().find('.np-report h5').append('<span id="RT" class="pop_report">你必须选择一项才能举报!</span>');
                                        }

                                        setTimeout(function() {
                                            $('#RT').remove()
                                        }, 2000);

                                    }
                                });
                                o.reportId = $(this).attr('id');

                            }

                        } else {
                            CORAL_LOGIN.showLoginLayer(); //登录

                        }
                    });

                    //$('#mainBody').delegate('li.np-post', 'mouseover', function(event) {
                    //改进举报hover事件 20140819 by link
					
                    $('#mainBody').delegate('.np-post-body', 'mouseover', function(event) {
					
                        var thisid = $(this).prev('.np-avatar').attr('post_uid');
                        if (thisid != $.cookie('uid')) {

                            $('.report').hide();
                            $(this).find('.report:first').show();
                            event.stopPropagation();
                        } else{
                           $(this).find('.np-btn-delete').css('display','inline-block');
                         }

                    });


                    //$('#mainBody').delegate('.np-post', 'mouseout', function(event) {
                    $('#mainBody').delegate('.np-post-body', 'mouseout', function(event) {

                        if (!($(this).find('.report em').length)) {
                            $(this).find('.report:first').hide();
                            $(this).find('.np-btn-delete').hide();
                        }

                        event.stopPropagation();

                    });
                },
                reportInit: function() {
                    var _this = this;
                    var o = this.options;
                    var postLi = o.$allComments.find('li.np-post .reportOn');
                    $.each(postLi, function(index, li) {
                        $(this).removeClass('reportOn');
                        $(this).find('em').remove();
                    });
                },

			
                /* 发表评论前数据检查 */

                checkAndPublish: function(textAreaId, tid) {

                    var _this = this;
                    var o = this.options;
                    var popTextarea = textAreaId.replace(/pop/, "pop_text");
                    var _$content = $('#' + popTextarea);
                    var position = textAreaId.split('_')[0];

                    
                    
                    if (position == 'top') {
                        //判断是否有图片正在上传。
                        if(CORAL_IMG.isUpImg('insertPicList')){
                            return false;
                        }
                        _$content = o.$top_textarea;

                        CORAL_BOSS.sendClientStat(curSite, 1, cmt_id, 'pub_original'); // 发表原创评论统计

                    }else{
                        //判断是否有图片正在上传。
                        if(CORAL_IMG.isUpImg('insertPicList_reply')){
                            return
                        }

                    }
                    if ($.trim(_$content.val()).length == 0 || _$content.val() == o.topContentTips) {
						seajs.use('coral.callback',function(CORAL_CALLBACK){CORAL_CALLBACK.pubCallback(textAreaId, null, 0, {error_code: -101, msg: "请输入内容！"})});
						
                    } else if ($.trim(_$content.val()).realLength() > 2000) {

                        alert('超过1000个字了');

                    } else {

                        if (CORAL_LOGIN.getUin()) { // 验证登陆态

                            if (position == 'top') {
                                o.$loginBtn.addClass('np-btn-submit-loading');
                            }

                            CORAL_POST.postData(textAreaId, tid); //

                        } else {
                            CORAL_LOGIN.showLoginLayer();
                        }

                    }

                },
             
                /**
                             * 发送BOSS统计
                             
                               site: 根据当前频道域名上报不同
                             
                             */
                sendStat: function(site) {

                    var op;
                    if (site == 'coral') {
                        op = 'pgv_commentdetail';
                    } else {
                        op = 'pgv_articledetail';
                    }
                    CORAL_BOSS.sendClientStat(curSite, 2, cmt_id, op);

                },
				

                /**
                 * 其他UI事件的绑定
                 */
                bindOtherEvents: function() {

                    var _this = this;
                    var o = this.options;

                    //新版toptextarea
                    o.$top_textarea.height(60);
                    o.$top_textarea.css("padding", "10px");

                    $('#np-reply-box').delegate('a.change', 'click', function() { // 切换账号

                        o.changeFlag = 1;
                        CORAL_LOGIN.showLoginLayer();

                    });

                    o.$top_textarea.focus(function() {

                        $(this).parent().parent().addClass('checkon');

                    });

                    o.$top_textarea.blur(function() {

                        $(this).parent().parent().removeClass('checkon');

                    });


                    /** 我的牛评登陆验证 **/

                    o.$myCowComment.unbind().bind('click', function() {


                        var _status = CORAL_LOGIN.getUin(); //先获取用户状态
						
                        CORAL_BOSS.sendClientStat(curSite, 1, cmt_id, 'clk_myniuping'); // 统计代码
                       
						if (_status !== 0 &&　_status !== null) { // 如果用户存在
						
                            $(this).addClass('np-active');
                            o.$myAllComment.removeClass('np-active');
                            o.$allComments.hide();
                            o.$myComments.show();


                            $('#mytips').trigger('click');
                            if ($('#popMsg').css('display') != 'none') {

                                CORAL_CENTER.loadMyMessage();

                                $('#my-message .tipInfo').hide();
                                $('#popMsg').html('').hide();
                                $('#mytips').trigger('click'); // 
                                return;
                            }

                            if ($(this).hasClass('np-active')) {

                                if ($('#popMsg').html() == '') {

                                    if ($('#my-message-list li').length >= 0) {
                                        return
                                    }
                                    //$('#my-message-list').html('');   
                                    //_this.loadMyMessage();//个人中心的提醒

                                    $('#popMsg').html('').hide();
                                } else {

                                    $('#my-message-list').html('');
                                    $('#popMsg').html('').hide();
                                    CORAL_CENTER.loadMyMessage();

                                }
                                return;
                            }

                            if (!$(this).hasClass('np-active')) { // 如果没有 .on 排除点击二次

                                if ($('#my-message-list li').length) {

                                    if ($('#popMsg').css('display') != 'none') {

                                        $('#my-message-list').html('');
                                        $('#popMsg').html('').hide();
                                        CORAL_CENTER.loadMyMessage();
                                    }
                                } else {

                                    //_this.loadMyMessage();
                                    return;
                                }
                            } else if ($('#popMsg').css('display') != 'none') {

                                $('#my-message-list').html('');

                                CORAL_CENTER.loadMyMessage();

                                $('#popMsg').html('').hide();

                            }
                            _this.checkAndPublish(this.id);

                        } else { //未登陆

                            o.centerFlag = 1;
                            $('#my-message .tipInfo').hide();
                            $('#my-notification .tipInfo').hide();
                            CORAL_LOGIN.showLoginLayer();
                        }

                    });

                    o.$myAllComment.unbind().bind('click', function() {
                        $(this).addClass('np-active');
                        o.$myCowComment.removeClass('np-active');
                        o.$allComments.show();
                        o.$myComments.hide();
                        CORAL.IframeHeight();
   
                    });

                }
            }
        })(jQuery);
    })
	module.exports =  coralComment; // 暴露接口 coralComment;
}); // define end	
	
	
    /*********************************************插件外公共方法 - 后期整理出去****************************************************/


		 //弹出框发表评论的回调

		// function popCallback(textAreaId, data, error) {
  //           if(error && error.status == 500){
  //               try{
  //                   error = JSON.parse(error.responseText);
  //               }catch(e){
  //                   error = {error_code: -100, msg: "系统错误"};
  //               }
  //           }else if(error){
  //               error = {error_code: -101, msg: "网络错误"};
  //           }
		// 	seajs.use('coral.callback',function(CORAL_CALLBACK){CORAL_CALLBACK.pubCallback(textAreaId, data, new Date().getTime(), error)});
		// 	//jQuery('#public_reply .sybol_pic').show();
		// 	//jQuery('#public_reply .upAddPic').show();
		// }

		 //举报成功的回调

		
		
    /**
     * 统计“真实字符长度”的方法，用于微博的字数统计，一个汉字算2个长度
     */

    String.prototype.realLength = function() {
        return this.replace(/[^\x00-\xff]/g, "**").length; // [^\x00-\xff] - 匹配非双字节的字符 

    };

 //  退出登录

    $('#np-reply-box').delegate('a.logout', 'click', function() { // 切换账号
        seajs.use('coral.config',
            function(CORAL_CONFIG){
                CORAL_CONFIG.options.publicLogout();
        });

    });
  


