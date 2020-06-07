define(function (require, exports, module) {

	var CORAL_LOGIN = require("coral.login");
	var CORAL_CONFIG = require('coral.config');


	window._ptLoginSuccessHandls = [];
	// 登录成功的回调
	window.loginAll = function (data) {
		if (data.result != 0) {
			console.log("获取已登陆用户信息错误（qfwd）代码：" + data.result);
			return;
		}
		for (i = 0, l = window._ptLoginSuccessHandls.length; i < l; i++) {
			window._ptLoginSuccessHandls[i](data);
		}
	};


	// 读取COOKIES
	QQ = {};
	QQ.openId = null;
	QQ.accessToken = null;
	QQ.Cookie = {
		set: function (name, value, expires, path, domain) {
			if (typeof expires == "undefined") {
				expires = new Date(new Date().getTime() + 3600 * 1000);
			}
			document.cookie = name + "=" + escape(value) + ((expires) ? "; expires=" + expires.toGMTString() : "") + ((path) ? "; path=" + path : "; path=/") + ((domain) ? ";domain=" + domain : "");
		},
		get: function (name) {
			var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
			if (arr != null) {
				return unescape(arr[2]);
			}
			return null;
		},
		clear: function (name, path, domain) {
			if (this.get(name)) {
				document.cookie = name + "=" + ((path) ? "; path=" + path : "; path=/") + ((domain) ? "; domain=" + domain : "") + ";expires=Fri, 02-Jan-1970 00:00:00 GMT";
			}
		}
	};

	// 检测QQ是否登录 如果登录的话则 执行回调
	QQ.loginCheck = function () {
		qc.Login.getMe(function (openId, accessToken) {
			QQ.openId = openId;
			QQ.accessToken = accessToken;
			try {
				$.post(CORAL_CONFIG.options.user_login, {"qq_open_id": openId, qq_access_token: accessToken}, function(_){
					$.get(CORAL_CONFIG.options.get_userinfo, function (data) {
						data = JSON.parse(data);
						QQ.userData = {};
						QQ.userData.nickname = data.nick;
						QQ.userData.vip = data.viptype;
						QQ.userData.figureurl_2 = data.head;
						// 写入加密后的令牌到cookie里
						loginAll({
							result: 0,
							nick: QQ.userData.nickname,
							Vip: QQ.userData.vip,
							Face: QQ.userData.figureurl_2
						});
						CORAL_LOGIN.onLogined(data.userid, data.nick, data.head);
					});
				});
			} catch (e) {}
		});
	};


	// 注册 PTlogin登录成功时间
	QQ.addLoginedEvent = function (func) {
		window._ptLoginSuccessHandls.push(func);
	};

	// 导出接口
	var API = {};

	// 组建初始化
	API.init = function (config) {
		// 设置参数
		if (config instanceof Object) {
			for (key in config) {
				if (!config.hasOwnProperty(key)) {
					continue;
				}
				CORAL_CONFIG.options[key] = config[key];
			}
		}

		// 检查登录状态 如果已经等了的话则 初始化评论组建
		var openId = QQ.Cookie.get("qq_open_id");
		var accessToken = QQ.Cookie.get("qq_access_token");

		if(!qc.Login.check()){
			openId = null;
			accessToken = null;
		}

		// 绑定登录后获取用户信息事件
		QQ.addLoginedEvent(function (data) {
			$.get(CORAL_CONFIG.options.get_userinfo, function (data) {
				data = JSON.parse(data);
				CORAL_LOGIN.onLogined(data.userid, data.nick, data.head);
			}).fail(function () {
				alert("登陆失败");
			});
		});

		if (openId && accessToken) {
			QQ.loginCheck();
		}

		// 绑定PTlogin 的登出按钮
		CORAL_CONFIG.options.publicLogout = function () {
			qc.Login.signOut();
			QQ.Cookie.clear();
			QQ.Cookie.clear("qq_open_id");
			QQ.Cookie.clear("qq_access_token");
			CORAL_LOGIN.loginOut();
		};

		// 绑定登录操作事件
		CORAL_CONFIG.options.loginEvent = function () {
			qc.Login.showPopup();
		};

		// 绑定 PTlogin 登录框成功事件
		window.addEventListener("message", function (e) {
			if (!e.data) {
				return;
			}
			var tmp = e.data.split("#:");
			if (tmp[0].indexOf("1000:") == -1) {
				return;
			}

			if (!qc.Login.check()) {
				return;
			}
			// 取出QQ互联的登陆信息
			if (!tmp[3]) {
				return;
			}

			var userData = JSON.parse(tmp[3]);
			QQ.userData = userData;
			QQ.loginCheck();
		});

		var loadTimer = setInterval(function () {
			var CORAL = require("coral_v3.6.29");
			if (!CORAL.hasOwnProperty("_create")) {
				return;
			}
			clearInterval(loadTimer);
			// 初始化评论框
			CORAL._create();
		}, 500);
	};

	module.exports = API;
});
