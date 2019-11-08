<template>
	<view class="tabs">
		<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
			<view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index" @click="ontabtap">
				<text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
			</view>
		</scroll-view>
		<view class="line-h"></view>
		<swiper :current="tabIndex" class="swiper-box" style="flex: 1;" :duration="300" @change="ontabchange">
			<swiper-item class="swiper-item" key="0">
				<view class="swiper-item-warp">
					<view class="input-warp">
						<input class="uni-input" type="number" @input="inputPhone" focus placeholder="手机号" />
					</view>
					<view class="input-warp">
						<input class="uni-input" type="number" @input="inputSms" placeholder="验证码" />
						<text class="send-text" @click="sendCode">{{sendCodeTitle}}</text>
					</view>
					<view>
						<button type="warn" @click="loginPhone">登陆</button>
					</view>
				</view>
			</swiper-item>
			<swiper-item class="swiper-item" key="1">
				<view class="swiper-item-warp">
					<view class="input-warp">
						<input class="uni-input" type="text" @input="inputAccount" placeholder="账号/手机号" />
					</view>
					<view class="input-warp with-fun">
						<input class="uni-input" @input="inputPass" placeholder="请输入密码" :password="showPassword" />
						<view class="uni-icon uni-icon-eye" :class="[!showPassword ? 'uni-active' : '']" @click="changePassword"></view>
					</view>
					<view>
						<button type="warn" @click="loginAccount">登陆</button>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	const MD5 = require('../../utils/md5_min');
	const server = require('../../utils/server');
	export default {
		data() {
			return {
				tabIndex: 1,
				scrollInto: '',
				tabBars: [{
					name: '手机号快捷登陆',
					id: 'login_phone'
				}, {
					name: '账号密码登陆',
					id: 'login_account'
				}],
				phone: '', //手机号
				sms: '', //验证码
				account: '', //登录账号
				password: '', //登录密码
				showPassword: true,
				src: '../../static/eye-1.png',
				errMsg: '',
				time: 0, //发送验证码的倒计时
				sendCodeTitle: '发送验证码'
			}
		},
		methods: {
			ontabchange(e) { //滑动登录页面切换
				let index = e.target.current || e.detail.current;
				this.switchTab(index);
			},
			ontabtap(e) { //顶部登录页面切换
				let index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.switchTab(index);
			},
			switchTab(index) { //登录页面函数
				if (this.tabIndex === index) {
					return;
				}
				this.tabIndex = index;
				this.scrollInto = this.tabBars[index].id;
			},
			inputPhone(e) { //手机号输入
				this.phone = e.detail;
			},
			inputSms(e) { //手机验证码输入
				this.sms = e.detail;
			},
			changePassword: function() { //点击眼睛显示密码
				this.showPassword = !this.showPassword;
			},
			sendCode() { //发送验证码
				let that = this;
				if (server.isEmpty(that.phone.value)) {
					server.showErr('手机号不能为空');
				} else if (!server.reg_phone(that.phone.value)) {
					server.showErr('请输入正确的手机号');
				} else {
					server.postJSON(
						'/login/login_captcha_sms', {
							phone: that.phone.value
						},
						function(res) {
							if (res.data.code == '1') {
								server.showSuccess('短息发送成功');
								that.time = 60;
								that.timer();
							} else {
								server.showErr('短息发送失败');
							}
						}
					);
				}
			},
			timer: function() { //验证码的倒计时
				if (this.time > 0) {
					this.time--;
					this.sendCodeTitle = this.time + "s后获取";
					setTimeout(this.timer, 1000);
				} else {
					this.time = 0;
					this.sendCodeTitle = "发送验证码";
					this.disabled = false;
				}
			},
			loginPhone() { //手机验证码登录
				let that = this;
				if (server.isEmpty(that.phone.value)) {
					server.showErr('手机号不能为空');
				} else if (!server.reg_phone(that.phone.value)) {
					server.showErr('请输入正确的手机号');
				} else if (server.isEmpty(that.sms.value)) {
					server.showErr('请输入验证码');
				} else {
					server.postJSON(
						'/login/login_captcha', {
							phone: that.phone.value,
							captcha: that.sms.value
						},
						function(res) {
							that.loginSuccess(res.data);
						}
					);
				}
			},
			inputAccount(e) { //账号输入
				this.account = e.detail;
			},
			inputPass(e) { //密码输入
				this.password = e.detail;
			},
			loginAccount() { //账号密码登录
				let that = this;
				if (server.isEmpty(that.account.value)) {
					server.showErr('请输入登录账号名');
				} else if (server.isEmpty(that.password.value)) {
					server.showErr('请输入登录密码');
				} else {
					server.postJSON(
						'/login/login?ajax=true', {
							name: that.account.value,
							password: MD5.hex_md5(this.password.value)
						},
						function(res) {
							that.loginSuccess(res.data);
						}
					);
				}
			},
			loginSuccess: function(data) {
				if (data.code == "1") {
					try {
						uni.setStorageSync('token', data.token);
						server.showSuccess(data.message);
					} catch (e) {
						server.showErr('写入token失败');
					}
					uni.navigateBack({
						delta: 1
					});
				} else {
					server.showErr(data.message);
				}
			}
		}
	}
</script>

<style>
	/* #ifndef APP-PLUS */
	page {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	.tabs {
		flex: 1;
		flex-direction: column;
		overflow: visible;
		background-color: #ffffff;
		/* #ifdef MP-ALIPAY || MP-BAIDU */
		height: 100vh;
		/* #endif */
	}

	.scroll-h {
		width: 750upx;
		height: 80upx;
		flex-direction: row;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
		/* flex-wrap: nowrap; */
		/* border-color: #cccccc;
		border-bottom-style: solid;
		border-bottom-width: 1px; */
	}

	.line-h {
		height: 1upx;
		background-color: #cccccc;
	}

	.uni-tab-item {
		/* #ifndef APP-PLUS */
		display: inline-block;
		/* #endif */
		flex-wrap: nowrap;
		padding-left: 34upx;
		padding-right: 34upx;
		width: 307upx;
		text-align: center;
	}

	.uni-tab-item-title {
		color: #555;
		font-size: 30upx;
		height: 80upx;
		line-height: 80upx;
		flex-wrap: nowrap;
		/* #ifndef APP-PLUS */
		white-space: nowrap;
		/* #endif */
	}

	.swiper-box {
		height: 100%;
	}

	.swiper-item text {
		display: block;
	}

	.swiper-item-warp {
		padding: 40upx;
	}

	.swiper-item .swiper-item-warp .input-warp {
		width: 602upx;
		border: 2upx solid #cccccc;
		margin-bottom: 40upx;
		border-radius: 40upx;
		padding-left: 34upx;
		padding-right: 34upx;
		position: relative;
	}

	.send-text {
		position: absolute;
		right: 20upx;
		top: 18upx;
	}

	.uni-tab-item-title-active {
		color: #ff2244;
	}

	.uni-icon-clear,
	.uni-icon-eye {
		color: #999;
		position: absolute;
		right: 20upx;
		top: 18upx;
	}
</style>
