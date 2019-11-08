<template>
	<view class="page">
		<view class="uni-padding-wrap">
			<uParse :content="article" />
		</view>
	</view>
</template>

<script>
	const server = require('../../utils/server');
	//本示例引用组件uParse forked from ：mpvue-wxparse
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		components: {
			uParse
		},
		data() {
			return {
				article: ''
			}
		},
		onLoad: function(option) {
			var that = this;
			server.getJSON(
				'/api/article/detail', {
					ajax: 'true',
					id: option.id
				},
				function(res) {
					that.article = res.data.content;
					uni.setNavigationBarTitle({
						title: res.data.title
					});
				}
			);
		}
	}
</script>

<style>
	.content {
		padding-left: 1.5em;
		padding-right: 1.5em;
		/* 在这里调整，整体字体大小 */
		font-size: 35upx;
	}
</style>
