<template>
	<view class="page">
		<view class="malldetail-flex-h">
			<view class="malldetail-flex-h">
				<swiper autoplay="true" class="swiper" :indicator="true">
					<swiper-item v-for="(item,index) in goods.imgs" :key='index'>
						<image class="image" :src="item"></image>
					</swiper-item>
				</swiper>
			</view>
			<view> <text class="malldetail-price">￥{{goods.price}}</text>
			</view> <text class="malldetail-good-name">{{goods.title}}</text>
			<view class="malldetail-black"></view>
		</view>
		<view class="comments-content">
			<view class="comments-header">
				<text class="comments-title">评论</text>
				<text @click="more()" class="comments-more">更多>></text>
			</view>
			<text class="comments-person-title">购买过该商品的用户认为</text>
			<view class="comments-detail-box" v-for="(item,index) in commentdata" :key='index'>
				<view class="comments-detail-person">
					<image class="comments-person-img" :src="item.avatar"></image>
					<text class="comments-name">{{item.userName}}</text>
				</view>
				<view class="comments-detail-wrap">
					<text class="comments-detail">{{item.content}}</text>
					<image class="comments-detail-img" @click="previewImages(item.images)" :src="imgs" v-for="(imgs,key) in item.images"
					 :key='key'></image>
				</view>
			</view>
		</view>
		<view class="malldetail-imgdetail-title">图文详情</view>
		<view class="content">
			<u-parse :content="detailData" />
		</view>
		<view class="terminology" v-for="(item,index_terminology) in terminology" :key='index_terminology'>
			<view class="terminology-title-h">{{item.title}}</view>
			<view v-for="(item_1,item_list_k) in item.list" :key='item_list_k'>
				<view class="terminology-title">{{item_1.title}}</view>
				<view class="terminology-content" v-for="(item_2,item_1_content_k) in item_1.content" :key='item_1_content_k'>{{item_2}}</view>
			</view>
		</view>
		<view class="goods-nav-bottom">
			<view class="cartico">
				<image src="../../static/ico/cart.png"></image>
				<text class="corner_mark" v-if="cartNum>0">{{cartNum}}</text>
			</view>
			<view class="addcart" @click="addCart()">加入购物车</view>
			<view class="buy">立刻购买</view>
		</view>
	</view>
</template>

<script>
	const server = require('../../utils/server');
	import uParse from '@/components/gaoyia-parse/parse.vue';
	export default {
		components: {
			uParse
		},
		data() {
			return {
				goods: false,
				commentdata: [],
				detailData: '', //商品详情
				cartNum: '',
				categoryId: 0,
				terminology: []
			};
		},
		onLoad(option) {
			let that = this;
			that.cartNum = uni.getStorageSync('cartNumber');
			if (server.isEmpty(option.id)) {
				uni.showModal({
					title: "错误",
					content: "请指定商品的编号",
					showCancel: false,
					success() {
						uni.navigateBack({
							delta: 1
						})
					}
				});
			} else {
				let terminology = uni.getStorageSync('terminology');
				if (server.isEmpty(terminology)) {
					server.getJSON(
						'/index/terminology.html', {},
						function(res) {
							that.terminology = res.data;
							//存储术语
							uni.setStorage({
								key: 'terminology',
								data: res.data
							});
						}
					);
				} else {
					that.terminology = terminology;
				}
				server.getJSON(
					'/api/goods/detail', {
						ajax: 'true',
						gid: option.id
					},
					function(res) {
						if (res.data.code == 1) {
							that.goods = res.data.goods;
							that.goods.imgs.push(res.data.goods.thumb);
							that.detailData = res.data.goods.content;
							that.categoryId = res.data.goods.category;
							//that.getComment(res.data.goods.category);
							that.getComment(0);
						} else {
							uni.showModal({
								title: "错误",
								content: "该商品已经下架",
								showCancel: false,
								success: (showResult) => {
									if (showResult.confirm) { //确定更新
										uni.navigateBack({
											delta: 1
										});
									}
								}
							});
						}
					}
				);
			}
		},
		methods: {
			//加入购物车
			addCart(gid) {
				let that = this;
				server.addCart(that.goods.gid, function(num) {
					num = parseInt(num);
					if (num > 99) {
						that.cartNum = '...';
					} else {
						that.cartNum = num;
					}
				});
			},
			getComment(categoryId) {
				let that = this;
				server.getJSON(
					'/goods/get_comment', {
						ajax: 'true',
						categoryId: categoryId
					},
					function(res) {
						that.commentdata = res.data.list;
					}
				);
			},
			previewImages(path) {
				uni.previewImage({
					urls: path
				});
			},
			more() { //跳转到更多评论里面
				let that = this;
				uni.navigateTo({
					url: '/pages/goods/goods_comment?categoryId=' + that.categoryId
				})
			}
		}
	};
</script>

<style>
	.terminology {
		padding: 20upx;
	}

	.terminology-title-h {
		text-align: center;
		font-size: 36upx;
		font-weight: 700;
	}

	.terminology-title {
		font-size: 32upx;
		font-family: 700;
		margin-top: 20upx;
	}

	.page {
		margin-bottom: 100upx;
	}

	.goods-nav-bottom {
		position: fixed;
		bottom: 0upx;
		height: 100upx;
		text-align: center;
		background-color: #ffffff;
		width: 750upx;
		display: flex;
		display: -webkit-flex;
		/* Safari */
		flex-direction: row;
	}

	.goods-nav-bottom .cartico {
		width: 150upx;
		position: relative;
	}

	.goods-nav-bottom .cartico .corner_mark {
		position: absolute;
		right: 10upx;
		top: 10upx;
		width: 40upx;
		height: 40upx;
		border-radius: 20upx;
		font-size: 18upx;
		line-height: 40upx;
		text-align: center;
		background-color: #ff2244;
		color: #ffffff;
	}

	.goods-nav-bottom .cartico image {
		margin-top: 14upx;
		width: 72upx;
		height: 72upx;
	}

	.goods-nav-bottom .buy {
		width: 300upx;
		line-height: 100upx;
		background-color: #ff2244;
		font-size: 17px;
		color: #ffffff;
	}

	.goods-nav-bottom .addcart {
		width: 300upx;
		height: 100upx;
		line-height: 100upx;
		background-color: #ffb700;
		font-size: 17px;
		color: #ffffff;
	}

	.content {
		padding-left: 10upx;
		padding-right: 10upx;
		/* 在这里调整，整体字体大小 */
		font-size: 35upx;
	}

	.malldetail-flex-h {
		display: flex;
		flex-direction: column;
	}

	.malldetail-imgdetail-title {
		margin: 24.3upx 33upx 33upx 24.3upx;
		font-size: 31.3upx;
		color: #1a1a1a;
	}

	.swiper {
		width: 750upx;
		height: 750upx;
		display: flex;
		flex-direction: column;
		indicator-selected-color: rgba(255, 255, 255, 1);
		indicator-color: rgba(255, 255, 255, 0.5);
		indicator-size: 12.5upx;
	}

	.image {
		width: 750upx;
		height: 750upx;
	}

	.malldetail-price {
		margin: 33.3upx 10upx 0upx 33upx;
		color: #ff2244;
		font-size: 37.5upx;
	}

	.malldetail-oldPrice {
		margin: 45upx 0upx 0upx 0upx;
		color: #808080;
		text-decoration: line-through;
		font-size: 20.8upx;
	}

	.malldetail-good-name {
		margin: 19.8upx 33upx 33.9upx 33upx;
		color: #1a1a1a;
		font-size: 37.5upx;
	}

	.malldetail-black {
		height: 17upx;
		background-color: #f2f2f2;
	}

	.malldetail-free {
		display: flex;
		margin: 0upx 33upx;
		padding: 29.2upx 0upx;
		align-items: center;
		border-color: #cccccc;
		border-bottom-width: 0.5upx;
	}

	.malldetail-free-title {
		padding: 0upx 10upx;
		margin: 0upx 16.7upx 0upx 0upx;
		color: #ff7500;
		border-radius: 4.2upx;
		border: 1upx solid #ff7500;
		font-size: 20.8upx;
	}

	.malldetail-free-detail {
		flex: 1;
		color: #1a1a1a;
		font-size: 31.3upx;
	}

	.malldetail-free-btn {
		padding: 0upx 9upx 0upx 0upx;
		font-size: 27.1upx;
		color: #808080;
	}

	.malldetail-free-img {
		width: 16upx;
		height: 28upx;
	}

	.malldetail-free-tips {
		margin: 29.2upx 33upx;
		font-size: 31.3upx;
		color: #1a1a1a;
	}

	.comments-content {
		display: flex;
		flex-direction: column;
		margin: 0upx 33upx;
		padding-bottom: 33.3upx;
	}

	.comments-header {
		display: flex;
		padding: 24.2upx 0upx;
		align-items: center;
	}

	.comments-title {
		flex: 1;
		font-size: 31.3upx;
		color: #1a1a1a;
	}

	.comments-more {
		padding: 0upx 9upx 0upx 0upx;
		font-size: 27.1upx;
		color: #808080;
	}

	.comments-header-image {
		height: 16upx;
		width: 16upx;
	}

	.comments-person-title {
		color: #1a1a1a;
		font-size: 27.1upx;
	}

	.comments-item-active {
		padding: 0upx 15upx;
		margin: 14.6upx 16.7upx 16.7upx 0upx;
		font-size: 20.8upx;
		color: #ff7500;
		border: 1upx solid #ff7500;
		border-radius: 8.3upx;
	}

	.comments-detail-box {
		display: flex;
		flex-direction: column;
		background-color: #f3f3f3;
		border-radius: 8.3upx;
	}

	.comments-detail-person {
		display: flex;
		align-items: center;
		margin: 36upx 0upx 18upx 33.3upx;
	}

	.comments-person-img {
		width: 83.3upx;
		height: 83.3upx;
		border-radius: 83.3upx;
	}

	.comments-name {
		margin: 0upx 0upx 0upx 16.7upx;
		color: #1a1a1a;
		font-size: 31.3upx;
	}

	.comments-detail-wrap {
		display: flex;
		margin: 0upx 33.3upx 33.3upx 33.3upx;
	}

	.comments-detail {
		flex: 1;
		margin-right: 16.7upx;
		color: #1a1a1a;
		font-size: 27.1upx;
	}

	.comments-detail-img {
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
		margin-left: 20upx;
	}
</style>
