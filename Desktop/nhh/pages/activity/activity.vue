<template>
	<view class="page">
		<view class="uni-product-list">
			<view class="uni-product" v-for="(goods,index) in productList" :key="index">
				<navigator :url="'/pages/activity/activity_detail?activity='+activity+'&id='+goods.id" hover-class="navigator-hover">
					<view class="image-view">
						<image class="uni-product-image" :src="goods.thumb"></image>
					</view>
					<view class="uni-product-title">{{goods.name}}</view>
				</navigator>
				<view class="uni-product-price">
					<text class="uni-product-price-favour">￥{{goods.originalCost}}</text>
					<text class="uni-product-price-original">￥{{goods.price}}</text>
					<text class="uni-product-tip">{{goods.activityName}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const server = require('../../utils/server');
	export default {
		data() {
			return {
				productList: [],
				activityId: 0,
				activity: 0, //活动代号
				totalPage: 0,
				isBottomErr: false, //是否到地府的弹窗出现了没有，出现了就不要再出现了,
				requireUrl: '/api/group/get_list',
				requireDtae: {
					ajax: 'true',
					span: 10,
					page: 1,
					sort: 0
				}
			};
		},
		onLoad(option) {
			let that = this;
			if (option.activity == 1) {
				uni.setNavigationBarTitle({
					title: "团购活动",
				});
				that.requireUrl = '/api/group/get_list';
			} else if (option.activity == 2) {
				uni.setNavigationBarTitle({
					title: "秒杀活动",
				});
				that.requireUrl = '/api/seckill/get_list';
			} else if (option.activity == 3) {
				uni.setNavigationBarTitle({
					title: "砍价活动",
				});
				that.requireUrl = 'api/bargain/get_list';
			} else if (option.activity == 4) {
				uni.setNavigationBarTitle({
					title: "积分兑换",
				});
				that.requireUrl = '/api/score/get_list';
			} else {
				uni.showModal({
					title: "错误信息",
					content: "请指定活动类别"
				});
				uni.navigateBack({
					delta: 1
				});
			}
			that.activity = option.activity;
			server.getJSON(
				that.requireUrl,
				that.requireDtae,
				function(res) {
					let result = res.data.list;
					if (result.length > 0) {
						that.productList = result;
					}
				}
			);
		},
		onReachBottom() { //触底获取新的商品
			let that = this;
			if (that.totalPage < 2) {
				return false;
			}
			that.requireDtae.page += 1;
			if (that.requireDtae.page >= that.totalPage) {
				if (!that.isBottomErr) {
					that.isBottomErr = true;
					server.showNotice("已经到底部了");
				}
				return false;
			}
			server.getJSON(
				that.requireUrl,
				that.requireDtae,
				function(res) {
					let result = res.data.list;
					if (result.length > 0) {
						for (var i in result) {
							that.productList.push(result[i]);
						}
					}
				}
			);
		}
	};
</script>

<style>
	.uni-product-price-original {
		color: #ff2244;
	}

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

	.uni-product-price {
		position: relative;
	}

	.uni-product-tip {
		background-color: #ff2244;
		position: absolute;
		right: 0upx;
		top: -4upx;

	}

	.uni-tab-item-title-active {
		color: #ff2244;
	}

	.uni-product-title {
		height: 88upx;
	}

	.car_ico {
		width: 54upx;
		height: 48upx;
	}
</style>
