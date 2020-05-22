// 牛评统计代码-行为统计、PGV统计  2014.12.26 by chuangwang


define(function(require, exports, module) {

var CORAL_BOSS = {
	
	/**
	 * BOSS平台上报函数
	 * 用于发送指定接口的统计数据
	 * cursite 当前所属频道页面 ，classType 业务类型：1 是boss 2是PGV，opType 操作类型: 1 是评论页 2 是文章底层， iStatus 操作结果
	*/
	sendClientStat:function(site, classType, iTargetid, opType, iStatus) {
	
		var CORAL_LOGIN = require('coral.login');

        var newsUrl = location.protocol + '//' + location.host + location.pathname;
        var iFlow = parseInt(Math.random() * 1000000000),
            iQQ = CORAL_LOGIN.getUin() || '',
            iUid = jQuery.cookie('uid'); // 公共参数
        var urlAll = newsUrl;
        var mainLost = encodeURIComponent(location.host);

        if (site == 'coral') { // boss 上报

            if (classType == 1) {
                var iTy = 1836,
                    biz = 'coral.web.comment_detail.action';
            } else {
                var iTy = 1837,
                    biz = 'coral.web.comment_detail.pgv';
            }

        } else {
            if (classType == 1) {
                var iTy = 1836,
                    biz = 'coral.web.article_detail.action';
            } else {
                var iTy = 1837,
                    biz = 'coral.web.article_detail.pgv';
            }
        }
        iStatus = iStatus || 0;
        g_btrace_BOSS = new Image(1, 1);
        g_btrace_BOSS.src = "//btrace.qq.com/collect?sIp=0&iQQ=" + iQQ + "&sBiz=" + biz + "&sOp=" + opType + "&iSta=" + iStatus + "&iTy=" + iTy + "&iFlow=" + iFlow + "&isite=" + site + "&iTargetid=" + iTargetid + "&iuid=" + iUid + "&iUrl=" + urlAll + "&idomain=" + mainLost;
    },
	
	 /**
     * Qos测速函数。
     * @param _name: 测试接口名，最终组合为 tcomment + _name
     * @param _baseTimestamp: 基准时间戳
     * @param _timestamps: 各参数时间戳对象，e.g. {1: newDate().getTime(), 2: 1350881412511}，1 和 2为Qos接口查询参数名
     */
	Qoss:function (_name, _baseTimestamp, _timestamps, _randomRange) {
        //随机采样
        /*
    if(_randomRange) {
        var _lucky = parseInt(Math.random() * _randomRange);
        if (_lucky) {
            return;
        }
    }
    */
        for (var _idx in _timestamps) {
            _timestamps[_idx] -= _baseTimestamp;
        }
        jQuery('<img src="//qos.report.qq.com/collect?type=1&name=coral_qq_com_' + _name + '&' + jQuery.param(_timestamps) + '">')
            .error(function() {
                jQuery(this).remove();
            })
            .load(function() {
                jQuery(this).remove();
            })
            .appendTo('body');


    }
}

module.exports =  CORAL_BOSS; // 暴露接口

});
