<template>
	<view>
		<view class="content">
			<view class="address-item ">
				<text class="address-item-title">姓名</text>
				<input class="address-item-input" type="text" v-model="addressData.name" placeholder="收货人姓名" @input="inputName" />
			</view>
			<view class="address-item ">
				<text class="address-item-title">电话</text>
				<input class="address-item-input" type="number" v-model="addressData.phone" placeholder="收货人手机号" @input="inputPhone" />
			</view>
			<view class="address-item " @click="showCityPicker">
				<text class="address-item-title">地区</text>
				<text class="address-item-input" >{{ address2.key }}</text>

			</view>
			<view class="address-item ">
				<text class="address-item-title">详细地址</text>
				<input class="address-item-input" type="text" v-model="addressData.address" placeholder="街道门牌、楼层房间号等信息" @input="inputAddress" />
			</view>

			<view class="address-item default-item">
				<text class="address-item-title">设为默认</text>
				<switch :checked="addressData.default == 1" color="#d81e06" @change="switchChange" />
			</view>
			<button class="address-add-btn" @click="confirm">保存</button>
			<mpvue-city-picker
				:themeColor="themeColor"
				ref="mpvueCityPicker"
				:pickerValueDefault="cityPickerValueDefault"
				@onCancel="onCancel"
				@onConfirm="onConfirm"
			></mpvue-city-picker>
		</view>
	</view>
</template>

<script>
const server = require('../../../utils/server');

import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue';

import provinceData from '@/components/mpvue-citypicker/city-data/province.js';
import cityData from '@/components/mpvue-citypicker/city-data/city.js';
import areaData from '@/components/mpvue-citypicker/city-data/area.js';

export default {
	components: {
		mpvueCityPicker,
		provinceData,
		cityData,
		areaData
	},
	data() {
		return {
			addressData: {
				id: 0,
				name: '',
				phone: '',
				label: '选择省/市/区',
				address: '',
				default: 0,
				cityCode: 0,
				edit_label:''
			},
			address2: {
				key: '选择省/市/区',

			},

			cityPickerValueDefault: [0, 0, 1],
			themeColor: '#d81e06',

			pickerValue: [0, 0, 0],
			provinceDataList: [],
			cityDataList: [],
			areaDataList: [],
			/* 是否显示控件 */
			showPicker: false
		};
	},
	onShow() {
		//this.addressData.label = 'fasdsfdsafadsf';
	},
	onLoad(option) {

		var that = this;
		var id = option.id;
		if (id > 0) {
			var that = this;
			server.getJSON(
				'/api/address/get_detail',
				{
					ajax: 'true',
					id: id
				},
				function(res) {
					that.addressData = res.data;
					that.addressData.cityCode = res.data.countyId;
					that.address2.key = res.data.province + '-' + res.data.city + '-' + res.data.county;
				}
			);
		}
	},
	methods: {
		inputName(e) {
			this.Name = e.detail;
		},
		inputPhone(e) {
			this.Phone = e.detail;
		},
		inputAddress(e) {
			this.Address = e.detail;
		},
		switchChange(e) {
			this.addressData.default = e.detail.value ? 1 : 0;
		},
		//提交
		confirm() {
			let name = this.addressData.name;
			let phone = this.addressData.phone;
			let label = this.addressData.label;
			let address = this.addressData.address;
			let cityCode = this.addressData.cityCode;
			let default2 = this.addressData.default;
			let id = this.addressData.id;
			if (!name) {
				this.$msg('请填写收货人姓名');
				return;
			}
			if (!/(^1[0-9]{10}$)/.test(phone)) {
				this.$msg('请输入正确的手机号');
				return;
			}
			if (!label) {
				this.$msg('请选择地区信息');
				return;
			}
			if (!address) {
				this.$msg('请输入详细地址');
				return;
			}
			if (!cityCode) {
				this.$msg('请选择省市区');
				return;
			}
			let token = uni.getStorageSync('token');
			if (token.length < 10) {
				uni.showModal({
					title: '登陆提醒',
					content: '你未登录，不能添加地址',
					success: showResult => {
						if (showResult.confirm) {
							//确定更新
							uni.navigateTo({
								url: '/pages/login/login'
							});
						}
					}
				});
			} else {
				server.postJSON(
					'/user/address/add_edit2',
					{
						token: token,
						name: name,
						phone: phone,
						label: label,
						address: address,
						cityCode: cityCode,
						default: default2,
						id: id
					},
					function(res) {
						if (res.data.code == '1') {
							uni.navigateTo({
								url: '/pages/address/address-list/address-list'
							});
						} else {
							server.showErr('添加地址失败');
						}
					}
				);
			}
		},
		// 三级联动选择
		showCityPicker() {
			var that = this;
			that.$refs.mpvueCityPicker.show();
		},
		onConfirm(e) {
			console.log(e);

			this.addressData.label=e.label;
			this.addressData.cityCode=e.cityCode;
            this.address2.key=e.label;
		}
	},
	onBackPress() {
		if (this.$refs.mpvueCityPicker.showPicker) {
			this.$refs.mpvueCityPicker.pickerCancel();
			return true;
		}
	},
	onUnload() {
		if (this.$refs.mpvueCityPicker.showPicker) {
			this.$refs.mpvueCityPicker.pickerCancel();
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f8f8f8;
}

.address-item {
	display: flex;
	align-items: center;
	position: relative;
	padding: 0 30upx;
	height: 100upx;
	background: #fff;
	border-bottom: 1upx solid #f8f8f8;

	.address-item-title {
		flex-shrink: 0;
		width: 200upx;
		font-size: 32upx;
		color: black;
	}

	.address-item-input {
		flex: 1;
		font-size: 32upx;
		color: black;
	}
}

.default-item {
	.address-item-title {
		flex: 1;
	}

	switch {
		transform: scale(0.7);
	}
}

.address-add-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 690upx;
	height: 80upx;
	margin: 60upx auto;
	font-size: 32upx;
	color: #fff;
	background-color: $theme-color;
	border-radius: 10upx;
}

.pickerMask {
	position: fixed;
	z-index: 1000;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.6);
}
.mpvue-picker-content {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	transition: all 0.3s ease;
	transform: translateY(100%);
	z-index: 3000;
}
.mpvue-picker-view-show {
	transform: translateY(0);
}
.mpvue-picker__hd {
	display: flex;
	padding: 9px 15px;
	background-color: #fff;
	position: relative;
	text-align: center;
	font-size: 17px;
}
.mpvue-picker__hd:after {
	content: ' ';
	position: absolute;
	left: 0;
	bottom: 0;
	right: 0;
	height: 1px;
	border-bottom: 1px solid #e5e5e5;
	color: #e5e5e5;
	transform-origin: 0 100%;
	transform: scaleY(0.5);
}
.mpvue-picker__action {
	display: block;
	flex: 1;
	color: #1aad19;
}
.mpvue-picker__action:first-child {
	text-align: left;
	color: #888;
}
.mpvue-picker__action:last-child {
	text-align: right;
}
.picker-item {
	text-align: center;
	line-height: 40px;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-size: 16px;
}
.mpvue-picker-view {
	position: relative;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 238px;
	background-color: rgba(255, 255, 255, 1);
}
</style>
