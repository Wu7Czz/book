
// 牛评公共方法 by chuangwang 2014.12.23


define(function(require, exports, module) {

var CORAL = {


		options: {

			$content: $('#content')		
		},

		/**
			将服务器时间戳 转换方法
		**/
		FormatTime : function($time){		
					var $nowdate= new Date();
					var $Num=$nowdate/1000-$time;
					if($Num <1){return  "刚刚";}
					if($Num < 60){return  Math.floor($Num) + "秒钟前"}
					if($Num < 3600){return  Math.floor($Num/(60)) + "分钟前"	}
					if($Num < 24*3600){return  Math.floor($Num/(3600)) 	+ "小时前"}
					if($Num < 24*3600*7){return  Math.floor($Num/(24*3600)) + "天前"}
					var d = new Date($time*1000),
						s = d.getFullYear() + "."; 
						s += (d.getMonth() + 1)<10 ? '0'+(d.getMonth() + 1) + "." : (d.getMonth() + 1) + ".";
						s += d.getDate()<10 ? '0'+ d.getDate() : d.getDate();
					return s;
		},
		
		EncodeHtml: function(str) {
                    var s = '';
                    if (str.length == 0) return "";
                    s = str.replace(/&/g, "&gt;");
                    s = s.replace(/</g, "&lt;");
                    s = s.replace(/>/g, "&gt;");
                    s = s.replace(/ /g, "&nbsp;");
                    s = s.replace(/\'/g, "&#39;");
                    s = s.replace(/\"/g, "&quot;");
                    s = s.replace(/\n/g, "<br>");
                    return s;

        },
		/*
			截取字符串
		*/
		SubString: function(str, n) {
                    str = str || '';
                    var r = /[^\x00-\xff]/g;
                    if (str.replace(r, "mm").length <= n) {
                        return str;
                    }
                    var m = Math.floor(n / 2);
                    for (var i = m; i < str.length; i++) {
                        if (str.substr(0, i).replace(r, "mm").length >= n) {
                            return str.substr(0, i) + "...";
                        }
                    }
                    return str;
        },
		 /*  同步评论框 外iframe高度方法  */

        IframeHeight: function() {
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
		  /**
                            
                    更新时间状态
                            
          **/

        UpdateTime: function() {
				
					var FT = this.FormatTime;
			
                    var o = this.options;
                    var _this = this;
                    o.$content.find('.uptime').each(function() {
                        $(this).html(FT($(this).attr('date')));
                    })
                    $('#my-message').find('.time').each(function() {
                        $(this).html(FT($(this).attr('date')));
                    })
                    $('#my-notification').find('.post-time span').each(function() {
                        $(this).html(FT($(this).attr('date')));
                    })
                    $('#hiddenCon').find('.uptime').each(function() {
                        $(this).html(FT($(this).attr('date')));
                    })
        },
		
		ConHeight: function(a) {

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
		BlueLine: function(targetId) {

                    setTimeout(function() {
                        $(targetId + '>.np-tip-newpost').animate({
                            opacity: '0'
                        }, 10000);
                        setTimeout(function() {

                            $(targetId + '>.np-avatar').animate({
                                'left': '0px'
                            }, 400);
                            $(targetId + '>.np-post-body').animate({
                                'padding-left': '10px'
                            }, 400);
                            $(targetId).removeClass('blueflag');

                        }, 8000)
                    }, 5000);


        }
};

module.exports = CORAL; // 暴露接口

});