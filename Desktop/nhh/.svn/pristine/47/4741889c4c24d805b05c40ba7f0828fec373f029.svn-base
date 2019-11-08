<template>
	<view class="page">
		<swiper indicator-dots="true" class="swiper-warp">
			<swiper-item v-for="(img, key) in imgUrls" :key="key">
				<image :src="img.img" />
			</swiper-item>
		</swiper>
		<view class="goods_category_warp">
			<view class="image-warp" v-for="(category,index) in goodsCategory" :key="index">
				<navigator class="navigator-warp" :url="'/pages/goods/goods_list?id='+goodsCategory2[category.id][0].id+'&fid='+category.id">
					<image class="image" :src="category.thumb" />
					<text class="text">{{category.name}}</text>
				</navigator>
			</view>
			<view class="image-warp" v-for="(item,key) in index_link" :key="key+10">
				<navigator class="navigator-warp" :url="item.url">
					<image class="image" :src="item.img" />
					<text class="text">{{item.name}}</text>
				</navigator>
			</view>
		</view>
		<view class="uni-swiper-msg">
			<view class="uni-swiper-msg-icon">
				<image src="/static/huainanhuixueyuan.png" mode="widthFix"></image>
			</view>
			<swiper vertical="true" autoplay="true" circular="true" interval="3000">
				<swiper-item v-for="(item, index) in msg" :key="index">
					<view @click="showArticleDetail(item.id)">{{item.title}}</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="uni-product-list">
			<view class="uni-product" v-for="(goods,index) in goodsList" :key="index">
				<navigator :url="'/pages/activity/activity_detail?activity='+goods.activity+'&id='+goods.id" hover-class="navigator-hover">
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
				showSwiper: false,
				imgUrls: [],
				goodsList: [],
				title: '最新活动',
				goodsCategory: [],
				goodsCategory2: [],
				msg: [],
				index_link: []
			};
		},
		methods: {
			showArticleDetail: function(id) {
				uni.navigateTo({
					url: '/pages/article/article_detail?id=' + id
				});
			}
		},
		/**
		 * 当 searchInput 配置 disabled 为 true 时触发
		 */
		onNavigationBarSearchInputClicked(e) {
			uni.navigateTo({
				url: '/pages/search/search'
			});
		},
		/**
		 *  点击导航栏 buttons 时触发
		 */
		onNavigationBarButtonTap() {
			uni.showModal({
				title: '提示',
				content: '用户点击了功能按钮，这里仅做展示。',
				success: res => {
					if (res.confirm) {
						console.log('用户点击了确定');
					}
				}
			});
		},

		onLoad: function() {
			//console.log(678);
			var that = this;
			that.index_link = [{
					url: '/pages/activity/activity?activity=1',
					img: '../../static/ico/tuangou.png',
					name: '团购'
				},
				{
					url: '/pages/activity/activity?activity=2',
					img: '../../static/ico/miaosha.png',
					name: '秒杀'
				},
				{
					url: '/pages/activity/activity?activity=3',
					img: '../../static/ico/kanjia.png',
					name: '砍价'
				},
				{
					url: '/pages/activity/activity?activity=3',
					img: '../../static/ico/jifenhuangou.png',
					name: '积分换购'
				},
				{
					url: '/pages/activity/activity?activity=3',
					img: '../../static/ico/fenxiang.png',
					name: '分享'
				}
			];
			server.getJSON(
				'/app/home/get', {
					ajax: 'true'
				},
				function(res) {
					//console.log(res);
					that.imgUrls = res.data.slide;
					that.goodsList = res.data.goods;
					that.goodsCategory = res.data.goodsCategory.first;
					that.goodsCategory2 = res.data.goodsCategory.second;
					that.msg = res.data.newsList;
					//存储商品分类
					uni.setStorage({
						key: 'goods_category',
						data: res.data.goodsCategory
					});
				}
			);
		},
	};
</script>

<style>
	uni-swiper.swiper-warp {
		height: 390upx;
	}

	.uni-swiper-wrapper image,
	.uni-swiper-wrapper swiper,
	.uni-swiper-wrapper .img-view {
		width: 750upx;
	}


	.page swiper image {
		width: 750upx;
	}

	.uni-swiper-wrapper .page-section-title {
		margin-top: 50upx;
	}

	.uni-product-tip {
		background-color: #ff2244;
	}

	.goods_category_warp {
		background: #fff;
		display: flex;
		flex-wrap: wrap;
		border-bottom: #cccccc solid 2upx;
	}

	.image-warp {
		width: 150upx;
		text-align: center;
		margin-top: 20upx;
		margin-bottom: 20upx;
	}

	.navigator-warp {
		text-align: center;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
	}

	.image-warp .text {
		font-size: 24upx;
	}

	.image-warp .image {
		width: 110upx;
		height: 110upx;
		margin-bottom: 10upx;
		margin-left: 20upx;
		margin-right: 20upx;
		border-radius: 55upx;
	}

	.uni-swiper-msg {
		position: relative;
		padding-left: 200upx;
	}

	.uni-swiper-msg .uni-swiper-msg-icon {
		position: absolute;
		top: 0upx;
		left: 0upx;
		height: 76upx;
		width: 158upx;
		padding-left: 10upx;
	}

	.uni-swiper-msg .uni-swiper-msg-icon image {
		height: 100%;
	}

	.uni-product-list {
		padding-bottom: 100upx;
	}

	.uni-product {
		width: 335upx;
	}

	.uni-product-price-original {
		color: #ff2244;
	}

	.uni-product-title {
		height: 88upx;
	}
</style>
