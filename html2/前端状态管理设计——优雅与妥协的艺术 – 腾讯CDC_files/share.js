	// 社交分享组件

    if (!window.ui) {
        window.ui = {}
        }
    var ui = window.ui
    
    ui.snsShare = {
        snsType: ['qq', 'qzone', 'weixin', 'weibo', 'qqweibo', 'douban', 'facebook', 'twitter'],
        /**
         * 社交分享组件
         * @author cache <cache@tencent.com>
         * @param {String} opts.type 分享类型，默认为 wexin，可取 snsType 中的类型
         * @param {String} opts.url 分享页面的 url，默认取当前页面 url
         * @param {String} opts.text 分享的文字描述
         * @param {String} opts.image 分享的图片，可留空
         * @param {Boolean} opts.nourl 只分享图文，不分享 url（只分享图文，不分享链接）
         * @param {Boolean} opts.nosummary 主要是给 qzone 使用，禁止抓取页面 meta description 作为 summary 文字
         * @param {Boolean} opts.replace 是否替换当前页面
         */
        share: function (opts) {
            // 默认配置
            var defaultOptions = {
                type: 'weixin',
                url: '',
                text: '',
                image: '',
                nourl: false,
                nosummary: true // qzone only
            }

            var options = $.extend({}, defaultOptions, opts)

            // 如果没提供分享的 url 并且也没有禁用 url 则提取当前页面 url
            if (!options.url && !options.nourl) {
                options.url = location.href
            }

            // 分享类型处理
            if (options.type !== 'weixin') {
                // 非微信分享直接弹窗处理
                var apiUrl = '' // 分享页面的 url，例如微博发表页
                // 字段映射，例如新浪微博的正文是 title
                var itemMap = {
                    text: 'text',
                    url: 'url',
                    image: 'image'
                }

                // 各 API 特殊字段
                var specialItems = {}

                switch (options.type) {
                    case 'weibo':
                        apiUrl = 'http://service.weibo.com/share/share.php?'
                        itemMap.text = 'title'
                        itemMap.image = 'pic'
                        break
                    case 'qzone':
                        apiUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?'
                        itemMap.image = 'pics'
                        itemMap.text = 'desc'
                        if (options.nosummary) {
                            specialItems.summary = ' ' // 不设置会自动抓取页面 meta description
                        }
                        if (!options.url) {
                            options.url = location.href
                        }
                        if (/https?:\/\/idesign.qq.com/.test(options.url)) {
                            options.url = 'http://idesign.qq.com'
                        }
                        break
                    case 'qqweibo':
                        apiUrl = 'http://share.v.t.qq.com/index.php?c=share&a=index&'
                        itemMap.image = 'pic'
                        itemMap.text = 'title'
                        break
                    case 'qq':
                        apiUrl = 'http://connect.qq.com/widget/shareqq/index.html?source=shareqq&'
                        itemMap.text = 'desc'
                        specialItems.title = '分享给您（来自腾讯设计导航http://idesign.qq.com）'
                        if (!options.url) {
                            options.url = location.href
                        }
                        if (/https?:\/\/idesign.qq.com/.test(options.url)) {
                            options.url = 'http://idesign.qq.com'
                        }
                        // 强制去掉网址，否则QQ不让发
                        options.text = options.text.replace(/((https?:\/\/|www\.)[\w_\.\/\%\&\?\-=:]+)/g,'')
                        break
                    case 'douban':
                        apiUrl = 'http://www.douban.com/share/service?'
                        itemMap.url = 'href'
                        itemMap.text = 'comment'
                        specialItems.name = '分享给大家（来自腾讯设计导航http://idesign.qq.com）'
                        break
                    case 'facebook':
                        apiUrl = 'https://www.facebook.com/sharer/sharer.php?'
                        itemMap.url = 'u'
                        break
                    case 'twitter':
                        apiUrl = 'https://twitter.com/intent/tweet?source=webclient&'
                        break
                }

                // 参数序列化
                var serializeItems = function () {
                    var strArr = []
                    for (var itemName in itemMap) {
                        if (options[itemName]) {
                            strArr.push(itemMap[itemName] + '=' + encodeURIComponent(options[itemName]))
                        }
                    }
                    for (var specialItemName in specialItems) {
                        strArr.push(specialItemName + '=' + encodeURIComponent(specialItems[specialItemName]))
                    }
                    return strArr.join('&')
                }

                if (options.replace) {
                    location.href = apiUrl + serializeItems()
                } else {
                    window.open(apiUrl+serializeItems())
                }
            } else {
                // 微信分享，提示二维码
                // alert('请打开微信扫描二维码')
             
            }
        }
    }

    ui.shareFactory = {
        /**
         * 在$wrapper元素内创建分享链接的HTML
         * @author cache <cache@tencent.com>
         * @param  {Object} $wrapper jQuery包裹的DOM对象，用于存放分享链接
         * @param  {Object} options  额外选项
         * @param {Array} opts.type 需要分享的平台
         * @param {String} opts.url 需要分享的页面的URL，默认情况下取当前页面URL
         * @param {String} opts.text 需要分享的文字
         * @param {String} opts.image 需要分享的图片，可为空
         * @param {Boolean} opts.nourl 不指定URL的情况下，也不允许取当前页面URL（即只分享图文，不含链接）
         * @param {Boolean} opts.nosummary QZone专用，禁止自动抓取页面meta description作为summary文字
         * @return {Undefined}          无返回值
         */
        create: function ($wrapper,options) {
            var shareWidgetHtml = shareHTML;
            // shareWidgetHtml = $.map(options.type, function (shareItem) {
            //     return '<a href="javascript:;" class="share-item share-'+shareItem+'" data-type="'+shareItem+'" title="分享到'+shareItem+'">分享到'+shareItem+'</a>'
            // }).join('')
            $wrapper.addClass('share-item-list').data(options).html(shareWidgetHtml)

            this.bind($wrapper)
        },

        /**
         * 为社交分享链接元素绑定事件
         * @param  {Object} $wrapper jQuery包裹的DOM对象，包含分享链接
         * @return {Undefined}          无返回值
         */
        bind: function () {
            var options = {}
            return function ($wrapper) {
                $.each(['url','text','image','nourl','nosummary'], function (index,itemName) {
                    var value = $wrapper.data(itemName) || $wrapper.attr('data-'+itemName)
                    if(value === 'false' || value === '0'){
                        value = false
                    }
                    options[itemName] = value
                })

                // var clickHandler = function (e) {
                //     var $this = $(this)
                //     options.type = $this.data('type') || $this.attr('data-type')
                //     ui.snsShare.share(options)
                //     e.preventDefault()
                // }

                $wrapper.find('.share-item').on('click', function (e) {
                    var $this = $(this);
                    options.type = $this.data('type') || $this.attr('data-type')
                    ui.snsShare.share(options)
                    e.preventDefault()
                })
            }
        }()
    }