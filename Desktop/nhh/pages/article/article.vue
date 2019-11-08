<template>
	<view class="tabs">
		<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
			<view class="uni-tab-item">
				<text class="uni-tab-item-title uni-tab-item-title-active">买家互动</text>
			</view>
			<view class="uni-tab-item">
				<navigator url="/pages/article/article_list?id=72" hover-class="navigator-hover">
					<text class="uni-tab-item-title">关于我们</text>
				</navigator>
			</view>
			<view class="uni-tab-item">
				<navigator url="/pages/article/article_list?id=80" hover-class="navigator-hover">
					<text class="uni-tab-item-title">珠宝知识</text>
				</navigator>
			</view>
			<view class="uni-tab-item">
				<navigator url="/pages/article/article_list?id=78" hover-class="navigator-hover">
					<text class="uni-tab-item-title">版通文化</text>
				</navigator>
			</view>
		</scroll-view>
		<view class="line-h"></view>
		<view class="uni-padding-wrap">
			<view class="uni-comment">
				<view class="uni-comment-list" v-for="(item, key) in commentList" :key="key">
					<view class="uni-comment-face">
						<image :src="item.avatar" mode="widthFix"></image>
					</view>
					<view class="uni-comment-body">
						<view class="uni-comment-top">
							<text>{{item.userName}}</text>
						</view>
						<view class="uni-comment-date">
							<text>{{item.postTimeDate.substring(5,16)}}</text>
						</view>
						<view class="uni-comment-content">{{item.content}}</view>
						<view class="image-warp">
							<image @click="previewImages(item.images)" class="image" :src="img" v-for="(img, k) in item.images" :key="k" />
						</view>
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
				commentList: [],
				scrollInto: '',
				totalPage: 0,
				isBottomErr: false ,//是否到地府的弹窗出现了没有，出现了就不要再出现了
				requireUrl:'/goods/get_comment',//求情路径
				requireData:{ajax:'true',span:16,page:1,categoryId:0}//请求参数
			}
		},
		onLoad() {
			let that = this;
			server.getJSON(
				that.requireUrl,
				that.requireData,
				function(res) {
					that.commentList = res.data.list;
					that.totalPage = res.data.totalPage;
				}
			);
		},
		onReachBottom() { //触底获取新的评论
			let that = this;
			if(that.totalPage<2){
				return false;
			}
			that.requireData.page += 1;
			if (that.requireData.page > 20) {
				server.showNotice("已经够多了，不要再浏览了。");
				return false;
			} else if (that.requireData.page >= that.totalPage) {
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
							that.commentList.push(result[i]);
						}
					}
				}
			);
		},
		methods: {
			previewImages:function(path) {
				uni.previewImage({
					urls: path
				});
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

	.uni-tab-item-title-active {
		color: #ff2244;
	}

	.uni-comment-top uni-text {
		color: #ff2244;
		font-size: 28upx;
	}

	.uni-comment-body {
		position: relative;
	}

	.uni-comment-content {
		width: 100%;
	}

	.uni-comment-date uni-text {
		font-size: 24upx;
		position: absolute;
		right: 30upx;
		top: 0upx;
	}

	.image-warp {
		display: flex;
	}
	.image-warp image {
		margin-right: 20upx;
		border-radius: 10upx;
	}

	.image-warp image {
		width: 100upx;
		height: 100upx;
		flex-direction: row;
		padding: 0upx;
	}

	.uni-comment-list {
		border-bottom: #cccccc solid 2upx;
	}
</style>
