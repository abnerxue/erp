var apiUrl = 'http://2743s38p65.wicp.vip/index.php';
// var apiUrl = 'http://mall.vicp.cn';
function __args() {
	var setting = {};
	if (arguments.length === 1 && typeof arguments[0] !== 'string') {
		setting = arguments[0];
	} else {
		setting.url = arguments[0];
		if (typeof arguments[1] === 'object') {
			setting.data = arguments[1];
			setting.success = arguments[2];
			setting.fail = arguments[3];
		} else {
			setting.success = arguments[1];
			setting.fail = arguments[2];
		}
	}
	if (setting.url.indexOf('http://') !== 0) {
		setting.url = apiUrl + setting.url;
	}
	if (typeof(setting.data) == "undefined") {
		setting.data = {};
	};

	//PDO 每次请求都带上token

	//console.log(setting.url)
	//console.log(JSON.stringify(setting.data))

	setting.complete = function(res) {
		//console.log(res);
		if (res.errMsg.indexOf('timeout') != -1) {
			return false;
		}
		if (res.errMsg.indexOf('request:fail') != -1) {
			uni.showModal({
				title: '提示',
				content: '请求失败，请检查您的网络后重试',
				showCancel: false,
			});
			return false;
		}
	}
	return setting;
}

function __json(method, setting) {
	setting.method = method;
	if (method == 'GET') {
		//#ifdef APP-PLUS
		setting.header = {
			'content-type': 'application/json'
		};
		//#endif
	} else {
		setting.header = {
			'content-type': 'application/x-www-form-urlencoded'
			// 'content-type': 'multipart/form-data'
		};
	}
	// console.log(setting);
	uni.request(setting);
}

module.exports = {
	versionNumber: 0.9000,
	getJSON: function() {
		__json('GET', __args.apply(this, arguments));
	},
	postJSON: function() {
		__json('POST', __args.apply(this, arguments));
	},
	apiUrl: apiUrl,
	showErr: function(message, title = "错误信息", determine) {
		uni.showModal({
			title: title,
			content: message,
			showCancel: false,
			success: (showResult) => {
				if (showResult.confirm) {
					determine();
				}
			}
		});
	},
	showSuccess: function(message, title = "成功提示") {
		uni.showModal({
			title: title,
			content: message
		});
	},
	showNotice: function(message) {
		uni.showModal({
			title: '提示',
			content: message,
			showCancel: false
		});
	},
	reg_phone: function(phone) {
		var reg = 11 && /^((13|14|15|17|18|19)[0-9]{1}\d{8})$/;
		if (reg.test(phone)) {
			return true;
		}
		return false;
	},
	isEmpty: function(parameter) {
		if (typeof parameter == "undefined" || parameter == null) {
			return true;
		} else if (parameter == "") {
			return true;
		} else if (parameter.length == 0) {
			return true;
		}
		return false;
	},
	noLogin: function(message) {
		uni.showModal({
			title: '未登录',
			content: message,
			success: (showResult) => {
				if (showResult.confirm) {
					uni.navigateTo({
						url: '/pages/login/login'
					});
				} else {
					console.log('点击了取消')
				}
			}
		});
	},
	addCart: function(gid, success) {
		let that = this;
		let token = uni.getStorageSync('token');
		if (token.length < 10) {
			that.noLogin('你未登录，请登陆后再操作购物车');
		} else {
			that.postJSON(
				'/user/cart/add?ajax=true', {
					token: token,
					gid: gid,
					number: 1
				},
				function(res) {
					if (res.data.code == "1") {
						that.showSuccess("成功加入购物车");
						success(res.data.cart_num);
						uni.setStorageSync('cartNumber', res.data.cart_num);
					} else if (res.data.login == "0") {
						that.noLogin('你未登录，请登陆后再操作购物车');
					} else {
						that.showErr("加入购物车失败");
					}
				}
			);
		}
	},
	cent2dollar: function(cent) {
		cent = parseInt(cent);
		if (isNaN(cent)) {
			return '0.00';
		} else if (cent < 1) {
			return '0.00';
		} else if (cent < 10) {
			return "0.0" + cent;
		} else if (cent < 100) {
			return "0." + cent;
		} else if (cent % 100 == 0) { //能整除100的
			return Math.floor(cent) / 100 + ".00";
		} else if (cent % 10 == 0) {
			return Math.floor(cent) / 100 + "0";
		} else {
			return Math.floor(cent) / 100;
		}
	}
}
