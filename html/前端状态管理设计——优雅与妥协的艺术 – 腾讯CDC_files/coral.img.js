// 牛评发表图片模块  2014.12.29 by chuangwang

define(function(require, exports, module) { 


var upLoadImgError; // 上传图片20秒超时
var CORAL_LOGIN = require('coral.login');
var CORAL = require('coral.base');
var CORAL_CONFIG = require('coral.config');
var CORAL_IMG = {
	
	upLoadchange:function($this){
        var _this = this;
		var _status = CORAL_LOGIN.getUin(); //先获取用户状态
        if ( _status ) { // 如果用户存在
        } else { //未登陆
            CORAL_LOGIN.showLoginLayer();
            return
        }
        var $picList,id;				
        if($this.closest('.children').length){ // 判断回复评论中的图片上传
            $this.closest('.children').find('#insertPicList_reply').show();
            $picList = $this.closest('.children').find('#insertPicList_reply');
            id = $this.closest('.np-post').attr('id');
			setTimeout(function() {
                coralComment.iframeHeight();
            }, 600)
        }else{
            $('#insertPicList').show();
            $picList = $('#insertPicList');
            id = 'np-reply-box';
        }
        if ($picList.find('img').length >= 4) { // 大于4条提交无用
            return
        }
        if ($this.val() != '') {
            if (!/\.(gif|jpg|jpeg|png)$/i.test($this.val())) {
                
                $picList.find('.insert_piclist').append('<li style="padding-top:20px;color:red" class="upImgInfo">图片类型必须是.gif/.jpg/.png</li>');
                setTimeout(function() {
                    $picList.find('.upImgInfo').fadeOut().remove();
                }, 3000)
                $this.val('');
                return false;
            }
            $this.parent().find('input[name=thrdes]').val(id);

            // 上传图片
            var $form = $this.parent();
            var self = this;
            $.ajax({
                processData: false,
                contentType: false,
                url: CORAL_CONFIG.options.upload,
                type: "POST",
                dataType: "json",
                data: new FormData($form.get(0)),
                success: function(data){
                    self.upLoadCallback(data, null);
                }
            })
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
                self.upLoadCallback(null, error);
            });



            $this.val(''); // 清空文本域，可以上传同一张图片多次
            $picList.find('.add_pic').unbind().html('').addClass('icon_loading_pic');
            clearTimeout(upLoadImgError)
            upLoadImgError = setTimeout(function(){
                if ($picList.find('.add_pic').text() != '+') { //2000个字符，中文字算1个字符
                    //topicDialog('图片上传失败，请重试', 'warning');
                    
                    $picList.find('.insert_piclist').append('<li style="padding-top:20px;color:#f30"  class="upImgInfo">出错了！图片必须是小于5M的.gif/.jpg/.png</li>');
                    setTimeout(function() {
                        $picList.find('.upImgInfo').fadeOut().remove();
                    }, 3000)
                }
                $picList.find('.add_pic').removeClass('icon_loading_pic');
                $picList.find('.add_pic').html('<i class="add">+</i>');

            }, 20000)
        }
		
		CORAL.IframeHeight();
    },
	
	upLoadImg: function() {
                    var _this = this;
                    var o = this.options;
                    // 替换上传框的action
                    $("#insertPicList form").attr("action", CORAL_CONFIG.options.upload);
                    $("#sybol_pic form").attr("action", CORAL_CONFIG.options.upload);

                    $("body").delegate('.upimgbox','mouseenter',function(){
                        jQuery(this).find('.iconbtn').fadeIn();
                    })
                    $("body").delegate('.upimgbox','mouseleave',function(){
                        jQuery(this).find('.iconbtn').fadeOut();
                    })


                    $("body").delegate('.imgRemove','click',function(){
                        if(jQuery(this).closest('.insert_piclist').find('img').length <= 4){
                            jQuery(this).closest('.insert_piclist').find('.upAddPic').show();

                        }
                        if(jQuery(this).closest('.children').length){
                            jQuery(this).closest('.children').find('.sybol_pic').show();
                        }else if(jQuery(this).closest('#commentArea').length){
                            jQuery(this).closest('#commentArea').find('.sybol_pic').show();
                        }
                        jQuery(this).closest('li').remove();
                    })

                    //图片的左右移动
                    $("body").delegate('.imgLeft','click',function(){
                        var cur = jQuery(this).parent();//从span向上寻找到tr
                        var pre=cur.prev('li');//获取前一行索引
                        if(pre.length !=0){
                           cur.insertBefore(pre);//插入前一行的位置
                        }
                    })

                    $("body").delegate('.imgRight','click',function(){
                        var cur = jQuery(this).parent();
                        var nex=cur.next('li:not(.upAddPic)'); //获取后一行索引
                        if(nex.length !=0){
                            cur.insertAfter(nex);//插入后一行的位置
                        }
                    })
                   
                    
                    // 登录失效时操作
                    $('body').delegate('.add_file', 'click', function() {
                        var _status = CORAL_LOGIN.getUin(); //先获取用户状态
                        
                        if ( _status ) { // 如果用户存在

                        } else { //未登陆

                            CORAL_LOGIN.showLoginLayer();
                            return false
                        }

                        var $picList,id;
                        if($(this).closest('.children').length){ // 判断回复评论中的图片上传
                            id = "insertPicList_reply"
                        }else{
                            id = "insertPicList"
                        }
                        if(_this.isUpImg(id)){
                            return false
                        }
                    })
                    //监测input：file文件改变事件
                    
                    $('.add_file').on('change',function() {
                       _this.upLoadchange($(this))

                    })
    },
	 
	 //显示正在上传中！
    isUpImg:function(id){
                    var $picList = $('#'+ id);
                    if($picList.find('.add_pic').text() != '+'){ // 是“上传中”
                        if(!$picList.find('.upImgInfo').length){ // 没有提示
                            $picList.find('.insert_piclist').append('<li style="padding-top:20px;color:red" class="upImgInfo">图片正在上传中！</li>');
                        }
                        setTimeout(function() {
                            $picList.find('.upImgInfo').fadeOut().remove();
                        }, 3000)
                        
                        return true;
                    }
                    return false;
    },
	
	upLoadCallback: function(data, error){
		var $boxid = jQuery('#'+data.thrdes)
        if (!error) {
            $boxid.find('.insert_piclist').data('dataImg', data.picture); //存储图片信息
            var html = '<li class="list_item upimgbox">' 
            + '<img width=44 height=44 data=\'{"url":"' + data.picture[0].url + '","width":' + data.picture[0].width + ',"height":' + data.picture[0].height + '}\' src="' 
            + data.picture[0].url + '/100" alt="图片">' 
            + '<b class="iconbtn imgRemove" style="">x</b>'
            + '<b class="iconbtn imgLeft"  style="">←</b>' 
            + '<b class="iconbtn imgRight" style="">→</b>' 
            + '</li>'

            $boxid.find('.upAddPic').before(html);

        } else if (error.error_code == 26) { //图片大于5M
            //alert('图片不能大于5M');
            $boxid.find('.insert_piclist').append('<li style="padding-top:20px; color:red" class="upImgInfo">图片不能大于5M！</li>');
            setTimeout(function() {
                $boxid.find('.upImgInfo').fadeOut().remove();
            }, 3000)
        } else {
            $boxid.find('.insert_piclist').append('<li style="padding-top:20px; color:red" class="upImgInfo">上传出错！</li>');
            setTimeout(function() {
                $boxid.find('.upImgInfo').fadeOut().remove();
            }, 3000)
        }
        if(data.thrdes){

            jQuery('#'+data.thrdes+' .add_pic').html('+').removeClass('icon_loading_pic');
        
            // 隐藏上传图片按钮
            if (jQuery('#'+data.thrdes+' .insert_piclist img').length >= 4) {
                jQuery('#'+data.thrdes+' .upAddPic').hide();
                jQuery('#'+data.thrdes+' .sybol_pic').hide()

            }
        }
	}
}

	module.exports =  CORAL_IMG; // 暴露接口 coralComment;
	
}); // define end