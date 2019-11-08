<template>
	<view class="tabs">
		<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
			<view class="uni-tab-item">
				<navigator url="/pages/article/article" open-type="switchTab" hover-class="navigator-hover">
					<text class="uni-tab-item-title">买家互动</text>
				</navigator>
			</view>
			<view class="uni-tab-item" v-for="(tab,index) in tabBars" :key="index">
				<navigator hover-class="navigator-hover" :url="'/pages/article/article_list?id='+tab.id">
					<text class="uni-tab-item-title" :class="categoryId==tab.id ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
				</navigator>
			</view>
		</scroll-view>
		<view class="line-h"></view>
		<view class="uni-list">
			<block v-for="(item,index) in articleList" :key="index">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover">
					<navigator hover-class="navigator-hover" :url="'/pages/article/article_detail?id='+item.id">
						<view class="uni-triplex-row">
							<view class="uni-triplex-left">
								<text class="uni-title uni-ellipsis">{{item.title}}</text>
								<text class="uni-text-small uni-ellipsis">{{item.description}}</text>
							</view>
							<view class="uni-triplex-right">
								<text class="uni-h5">{{item.putTime.substring(5,16)}}</text>
							</view>
						</view>
					</navigator>
				</view>
			</block>
		</view>
	</view>
</template>
<script>
	const server = require('../../utils/server');
	export default {
		data() {
			return {
				articleList: [],
				scrollInto: '',
				tabBars: [{
					name: '关于我们',
					id: '72',
					url: '/pages/article/article_list?id=72'
				}, {
					name: '珠宝知识',
					id: '80',
					url: '/pages/article/article_list?id=80'
				}, {
					name: '版通文化',
					id: '78',
					url: '/pages/article/article_list?id=78'
				}],
				categoryId: 0,
				totalPage: 0,
				isBottomErr: false ,//是否到地府的弹窗出现了没有，出现了就不要再出现了
				requireUrl:'/api/article/get_list',//求情路径
				requireData:{ajax:'true',span:16,page:1,categoryId:0}//请求参数
			}
		},
		onLoad(option) {
			var that = this;
			that.categoryId = option.id;
			that.requireData.categoryId = option.id;
			server.getJSON(
				that.requireUrl,
				that.requireData,
				function(res) {
					that.articleList = res.data.list;
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
							that.articleList.push(result[i]);
						}
					}
				}
			);
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

	.uni-triplex-row {
		width: 750upx;
		position: relative;
	}

	.uni-triplex-right {
		width: 200upx;
		position: absolute;
		right: 20upx;
		top: 24upx;
	}
</style>
