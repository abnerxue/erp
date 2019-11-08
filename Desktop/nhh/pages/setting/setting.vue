<template>
	<view>
		<view class="content">
			<view class="list">
				<view class="row">
					<view class="title">头像</view>
					<view class="right"><view class="tis">
						<image :src="userinfo.avatar" mode="widthFix"></image>
					</view><view class="icon xiangyou"></view></view>
				</view>
				<view class="row">
					<view class="title">昵称</view>
					<view class="right"><view class="tis">{{ userinfo.userName }}</view><view class="icon xiangyou"></view></view>
				</view>
				<view class="row">
					<view class="title">个性签名</view>
					<view class="right"><view class="tis">这人太懒了，什么都不写</view><view class="icon xiangyou"></view></view>
				</view>


			</view>

			<view class="list">
				<view class="row">
					<view class="title">版本升级</view>
					<view class="right"><view class="tis">v1.0.1</view><view class="icon xiangyou"></view></view>
				</view>
				<view class="row">
					<view class="title">清除缓存</view>
					<view class="right"><view class="tis"></view><view class="icon xiangyou"></view></view>
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

			};
		},
		data() {
			return {

				userinfo: {},




			};
		},
		methods: {
			showType(tbIndex){
				this.tabbarIndex = tbIndex;
				this.list = this.orderList[tbIndex];
			},
			getOrderNav() {
				let token = uni.getStorageSync('token');
				var that = this;
				server.postJSON(
						'/api/user/home_index', {
							ajax: 'true',
							'token':token,


						},
						function(res) {


							that.orderNavList=res.data.orderinfo;
							that.userinfo=res.data.result;


						}
				);
			},
		},
		onLoad() {
			let token = uni.getStorageSync('token');

			if (token.length < 10) {
				uni.navigateTo({
					url: '/pages/login/login'
				});
			}

	         this.getOrderNav();


		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f3f3f3;

	}

	.icon {
		font-size: 30upx;

	}
	.content{
		padding-bottom: 20upx;
		.list{
			width: 96%;
			padding-left: 4%;
			background-color: #fff;
			margin-bottom: 20upx;
			.row{
				widows: 100%;
				min-height: 90upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: solid 1upx #eee;
				&:last-child{
					border-bottom: none;
				}
				.title{
					font-size: 32upx;
					color: #333;
				}
				.right{
					display: flex;
					align-items: center;
					color: #999;
					.tis{
						font-size: 26upx;
						margin-right: 5upx;
						max-height: 120upx;
						image{
							width: 100upx;
							height: 100upx;
							border-radius: 100%;
							margin: 10upx 0;
						}
					}
					.icon{
						width: 40upx;
						color: #cecece;
					}
				}

			}
		}
	}

</style>
