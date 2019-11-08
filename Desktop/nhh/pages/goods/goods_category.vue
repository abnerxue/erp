<template>
	<view>
		<view class="example-body">
			<uni-search-bar @confirm="search" @input="input" @cancel="cancel" />
		</view>
		<view class="container">
			<view class="page-body">
				<scroll-view class="nav-left" scroll-y :style="'height:'+height+'px'">
					<view class="nav-left-item" @click="categoryClickMain(item,index)" :key="index" :class="index==categoryActive?'active':''"
					 v-for="(item,index) in categoryList">
						{{item.name}}
					</view>
				</scroll-view>
				<scroll-view class="nav-right" scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:'+height+'px'"
				 scroll-with-animation>
					<view :id="index===0?'first':''" class="nav-right-item" v-for="(item,index) in subCategoryList" :key="index">
						<navigator :url="'/pages/goods/goods_list?id='+item.id+'&fid='+item.fid">
							<image :src="item.thumb" />
							<view>{{item.name}}</view>
						</navigator>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	const server = require('../../utils/server');
	import uniSearchBar from '../../components/uni-search-bar/uni-search-bar.vue'
	export default {
		components: {
			uniSearchBar
		},
		data() {
			return {
				searchVal: '',
				categoryList: [],
				subCategoryList: [],
				height: 0,
				categoryActive: 0,
				scrollTop: 0,
				scrollHeight: 0,
				name: "七月_"
			}
		},
		methods: {
			search(res) {
				uni.showModal({
					content: '搜索：' + res.value,
					showCancel: false
				})
			},
			scroll(e) {
				this.scrollHeight = e.detail.scrollHeight;
			},
			categoryClickMain(categroy, index) {
				var temp = uni.getStorageSync('goods_category');
				this.categoryActive = index;
				this.subCategoryList = temp.second[temp.first[index].id];
				this.scrollTop = -this.scrollHeight * index;
			},

		},
		onShow: function() {},
		onLoad: function() {
			var that = this;
			var temp = uni.getStorageSync('goods_category');
			if (server.isEmpty(temp.first) || server.isEmpty(temp.second)) {
				server.getJSON(
					'/goods/get_category', {},
					function(res) {
						//存储商品分类
						uni.setStorage({
							key: 'goods_category',
							data: res.data
						});
						that.categoryList = res.data.first;
						that.subCategoryList = res.data.second[res.data.first[0].id];
						that.height = uni.getSystemInfoSync().windowHeight;
					}
				);
			} else {
				that.categoryList = temp.first;
				that.subCategoryList = temp.second[temp.first[0].id];
				that.height = uni.getSystemInfoSync().windowHeight;
			}
		}
	}
</script>

<style>
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4
	}

	view {
		font-size: 28upx;
		line-height: inherit
	}

	.example {
		padding: 0 30upx 30upx
	}

	.example-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32upx;
		color: #464e52;
		padding: 30upx 30upx 30upx 50upx;
		margin-top: 20upx;
		position: relative;
		background-color: #fdfdfd;
		border-bottom: 1px #f5f5f5 solid
	}

	.example-title__after {
		position: relative;
		color: #031e3c
	}

	.example-title:after {
		content: '';
		position: absolute;
		left: 30upx;
		margin: auto;
		top: 0;
		bottom: 0;
		width: 6upx;
		height: 32upx;
		background-color: #ccc
	}

	.example .example-title {
		margin: 40upx 0
	}

	.example-body {
		padding: 30upx;
		background: #fff;
		padding-top: 0upx;
		padding-bottom: 0upx;
	}

	.example-info {
		padding: 30upx;
		color: #3b4144;
		background: #fff
	}

	.search-result {
		margin-top: 10px;
	}

	.page-body {
		margin-top: 10upx;
		display: flex;
	}

	.nav {
		display: flex;
		width: 100%;
	}

	.nav-left {
		width: 30%;
	}

	.nav-left-item {
		height: 100upx;
		border-right: solid 1px #E0E0E0;
		border-bottom: solid 1px #E0E0E0;
		font-size: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nav-right {
		width: 70%;
	}

	.nav-right-item {
		width: 45%;
		height: 220upx;
		float: left;
		text-align: center;
		padding: 11upx;
		font-size: 28upx;
	}

	.nav-right-item image {
		width: 100upx;
		height: 100upx;
	}

	.active {
		color: #007AFF;
	}
</style>
