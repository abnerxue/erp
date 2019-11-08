<template>
	<view>
		<view class="comments-content">
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
	</view>
</template>

<script>
	const server = require('../../utils/server');
	export default {
		data() {
			return {
				commentdata: [],
				totalPage: 0,
				isBottomErr: false, //是否到地府的弹窗出现了没有，出现了就不要再出现了
				requireUrl: '/goods/get_comment', //求情路径
				requireData: {
					ajax: 'true',
					span: 16,
					page: 1,
					categoryId: 0
				} //请求参数
			};
		},
		onLoad(option) {
			let that = this;
			that.requireData.categoryId;
			server.getJSON(
				that.requireUrl,
				that.requireData,
				function(res) {
					that.totalPage = res.data.totalPage;
					that.commentdata = res.data.list;
				}
			);
		},
		onReachBottom() { //触底获取新的商品
			let that = this;
			if (that.totalPage < 2) {
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
							that.commentdata.push(result[i]);
						}
					}
				}
			);
		},
		methods: {
			previewImages:function(path) {
				console.log(path);
				uni.previewImage({
					urls: path
				});
			}
		}
	};
</script>

<style>
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
		width: 133.3upx;
		height: 133.3upx;
		border-radius: 8.3upx;
	}

	.comments-detail-img {
		margin-left: 20upx;
	}
</style>
