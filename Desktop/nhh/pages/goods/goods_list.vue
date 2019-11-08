<template>
	<view class="page">
		<view class="tabs">
			<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
				<view class="uni-tab-item" v-for="(item,index) in goodsCategory2" :key="index">
					<navigator :url="'/pages/goods/goods_list?id='+item.id+'&fid='+fid" hover-class="navigator-hover">
						<text class="uni-tab-item-title" :class="categoryId==item.id ? 'uni-tab-item-title-active' : ''">{{item.name}}</text>
					</navigator>
				</view>
			</scroll-view>
		</view>
		<view class="uni-product-list">
			<view class="uni-product" v-for="(product,index) in productList" :key="index">
				<navigator :url="'/pages/goods/goods_detail?id='+product.gid" hover-class="navigator-hover">
					<view class="image-view">
						<image class="uni-product-image" lazy-load :src="product.thumb"></image>
					</view>
					<view class="uni-product-title">{{product.title}}</view>
				</navigator>
				<view class="uni-product-price">
					<text class="uni-product-price-original">￥{{product.price}}</text>
					<view class="uni-product-tip">
						<image @click="addCart(product.gid)" class="car_ico" src="../../static/ico/cart_select.png"></image>
					</view>
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
				categoryId: 0, //当前商品分类id
				fid: 0,
				scrollInto: '',
				goodsCategory2: '',
				totalPage: 0,
				isBottomErr: false, //是否到地府的弹窗出现了没有，出现了就不要再出现了,
				requireUrl: '/api/goods/get',
				requireData: {
					ajax: 'true',
					span: 16,
					page: 1,
					categoryId: 0
				}
			};
		},
		onLoad(option) {
			let that = this;
			var temp = uni.getStorageSync('goods_category');
			console.log(temp);
			//缓存中没有商品分类数据，去网络请求
			if (server.isEmpty(temp.second) || server.isEmpty(temp.first)) {
				server.getJSON(
					'/goods/get_category', {},
					function(res) {
						//存储商品分类
						uni.setStorage({
							key: 'goods_category',
							data: res.data
						});
						console.log(option);
						that.onLoadLater(option, res.data);
					}
				);
			} else {
				that.onLoadLater(option, temp);
			}
		},
		onReachBottom() { //触底获取新的商品
			let that = this;
			if(that.totalPage<2){
				return false;
			}
			that.requireData.page += 1;
			if (that.requireData.page >= that.totalPage) {
				if (!that.isBottomErr) {
					that.isBottomErr = true;
					server.showNotice("已经到底部了");
				}
				return false;
			}
			server.getJSON(
				that.requireUrl,
				that.requireData,
				function(res) {
					let result = res.data.list;
					if (result.length > 0) {
						for (var i in result) {
							that.productList.push(result[i]);
						}
					}
				}
			);
		},
		methods: {
			//页面加载以后的方法
			onLoadLater: function(option, temp) {
				var that = this;
				if (server.isEmpty(option.fid)) {
					server.showErr("请制定要浏览的商品分类");
					return false;
				}
				that.goodsCategory2 = temp.second[option.fid];
				that.fid = option.fid;
				if (typeof(that.goodsCategory2) === 'object') {
					for (let key in that.goodsCategory2) {
						if (that.goodsCategory2[key].id == option.id) {
							uni.setNavigationBarTitle({
								title: that.goodsCategory2[key].name,
							});
						}
					}
				} else {
					that.goodsCategory2.forEach(function(value, index, array) {
						if (value.id == option.id) {
							uni.setNavigationBarTitle({
								title: value.name,
							});
						}
					});
				}
				that.requireData.categoryId = option.id;
				server.getJSON(
					that.requireUrl,
					that.requireData,
					function(res) {
						that.productList = res.data.list;
						that.totalPage = res.data.totalPage;
					}
				);
			},
			//加入购物车
			addCart(gid) {
				server.addCart(gid);
			}
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
		background: none;
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
