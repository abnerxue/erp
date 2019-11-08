<template>
	<view class="content">
		<view class="address-list" v-for="(item, index) in addressList" :key="index">


			<view class="address-list-info" >
				<view class="address-list-line1">
					<text v-if="item.default==1" class="tag">默认</text>
					<text class="address-list-name">{{item.name}}</text>
					<text class="address-list-mobile">{{item.phone}}</text>
				</view>

				<view class="address-list-line2">
					<text class="address-list-detail">{{item.province}}{{item.city}}{{item.county}}{{item.address}}</text>
				</view>
			</view>

				<button class="button" @click="editAddress(item.id)">编辑</button>

				<button class="button2" @click="deleteAddress(item.id)">删除</button>



		</view>

		<button class="add-btn" @click="addAddress('add')">新增地址</button>
	</view>
</template>

<script>
	const server = require('../../../utils/server');

	import uniIcon from '@/components/mine/uni-icon.vue'

	export default {
		components: {
			uniIcon
		},
		data() {
			return {

				addressList: [],
				page: 0,
				span:0,


			}
		},
		onLoad(option) {

			this.getAddressList(this.page, 0, this.span);

			this.page += 1;
		},
		onReachBottom() {
			this.page += 1;
			this.getAddressList(this.page, 0, this.span);

		},
		methods: {
			editAddress(id) {
				uni.navigateTo({
					url: '/pages/address/address-edit/address-edit?id='+id
				})

			},
			deleteAddress(id) {

				uni.showModal({
					title: "提示",
					content: "确认删除此收货地址吗？",
					success: (showResult) => {
						if (showResult.confirm) { //确定删除

							let token = uni.getStorageSync('token');
							var that = this;
							server.postJSON(
									'/user/address/del', {
										ajax: 'true',
										id: id,
										'token':token
									},
									function(res) {

										let result = res.data.code;
										if(result==1){
											window.location.reload();
										}




									}
							);


						}
					}
				})


			},
			addAddress(){
				this.$jump('../address-edit/address-edit')
			},
			//获取订单列表
			getAddressList(page, sort, span) {
				let token = uni.getStorageSync('token');
				var that = this;

				server.getJSON(
						'/api/address/get_list', {
							ajax: 'true',
							'span': span,
							'page': page,
							'sort': sort,
							'token':token,

						},
						function(res) {

							let result = res.data.list;


								if (result.length > 0) {
									for (var i in result) {
										that.addressList.push(result[i]);
									}
								}

						}
				);
			}

		}
	}
</script>

<style lang='scss'>

	.button{
        display: inline-block;

		width:60px;
		height:20px;
		line-height: 20px;
		font-size:16px;

		position: relative;

		left:0px;
		top:0px;
	}

	.button2{
		display: inline-block;
		width:60px;
		height:20px;
		line-height: 20px;
		font-size:16px;

		position: relative;
		left:5px;
		top:0px;

	}

	.content {
		position: relative;
	}

	.address-list {
		display: flex;
		align-items: center;
		padding: 20upx 30upx;

		background: #fff;
		position: relative;
	}

	.address-list-info {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.address-list-line1 {
		display: flex;
		align-items: center;

		.tag {
			font-size: 24upx;
			color: $theme-color;
			margin-right: 10upx;
			background: #fffafb;
			border: 1px solid $theme-color;
			border-radius: 4upx;
			padding: 4upx 10upx;
			line-height: 1;
		}

		.address-list-name,
		.address-list-mobile {
			font-size: 30upx;
			color: black;
			margin-right: 30upx;
		}
	}

	.address-list-line2 {
		font-size: 28upx;
		color: gray;
		margin-top: 16upx;

		.address-list-detail {
			margin-right: 30upx;
		}
	}



	.add-btn {
		position: fixed;
		bottom: 16upx;
		z-index: 95;
		margin: 0 30upx;
		width: 690upx;
		height: 80upx;
		line-height: 80upx;
		font-size: 32upx;
		text-align: center;
		color: #fff;
		background-color: $theme-color;
		border-radius: 10upx;
	}
</style>
