<template>
	<view class="container">
		<view v-if='cartList.length===0'>
			<view class="empty">
				<image src="/static/emptyCart.jpg" mode="aspectFit"></image>
				<view class="empty-tips">
					空空如也
					<navigator class="navigator" url="/pages/index/index" open-type="switchTab">随便逛逛></navigator>
				</view>
			</view>
		</view>
		<view v-else :cartList="cartList">
			<view class="cart-list">
				<view v-for="(item, index) in cartList" :key="item.id">
					<view class="cart-item">
						<checkbox :checked='item.checked' color='#FF3333' @click="check('item', index)" />
						<view class="image-wrapper">
							<image :src="item.thumb" mode="aspectFill"></image>
						</view>
						<view class="item-right">
							<text class="title">{{item.title}}</text>
							<text class="attr"></text>
							<view class="item-last">
								<text class="discount-price">¥{{item.price}}</text>
								<text class="goods-price"></text>
								<view class="uni-numbox">
									<view class="uni-numbox-minus" @click="_calcValue('subtract',index)">
										<text :class="minDisabled?'uni-numbox-disabled': ''">-</text>
									</view>
									<input class="uni-numbox-value" type="number" :disabled="disabled" :value="item.number" @blur="_onBlur">
									<view class="uni-numbox-plus" @click="_calcValue('add',index)">
										<text :class="maxDisabled?'uni-numbox-disabled': ''">+</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 底部菜单栏 -->
			<view class="action-section">
				<view class="total-box">
					<text class="price-title">合计：</text>
					<text class="price-number">¥{{totalPrice}}</text>
				</view>
				<view class="confirm-btn" @click="createOrder">去结算</view>
			</view>
		</view>
	</view>
</template>

<script>
	const server = require('../../utils/server');
	export default {
		data() {
			return {
				cartList: [],
				minDisabled: false,
				maxDisabled: false,
				disabled: true,
				totalPrice: 0
			};
		},
		onShow() {
			uni.hideTabBar();
		},
		onLoad(){
			let that = this;
			server.postJSON(
				'/api/cart/get_list?ajax=true', {
					token: uni.getStorageSync('token')
				},
				function(res) {
					let result = res.data.cart;
					if (res.data.login == "0") {
						server.noLogin('你未登录，请登陆后再操作购物车');
					} else if (res.data.code != 1) {
						server.showErr("网络延迟，请重新请求");
					} else if (result.length > 0) {
						if (result.length > 0) {
							for (var i in result) {
								result[i].checked = true;
								that.cartList.push(result[i]);
							}
						}
						that.updateTotalPrice();
					}
				}
			);
		},
		methods: {
			_calcValue: function(type, index) {
				let that = this;
				let gid = that.cartList[index].gid;
				let token = uni.getStorageSync('token');
				let number = 1;
				if (type == "subtract") {
					number = -1;
				}
				if (that.cartList[index].number < 2 && type == "subtract") {
					uni.showModal({
						title: "提示",
						content: "确定要删除购物车中的商品？",
						success: (showResult) => {
							if (showResult.confirm) { //确定删除
								that.updateCart(gid, number, index);
							}
						}
					})
				} else {
					that.updateCart(gid, number, index);
				}
			},
			check(type, index) {
				if (type === 'item') {
					this.cartList[index].checked = !this.cartList[index].checked
				}
				this.updateTotalPrice();
			},
			updateCart(gid, number, index) {
				var that = this;
				server.postJSON(
					'/user/cart/add?ajax=true', {
						token: uni.getStorageSync('token'),
						gid: gid,
						number: number
					},
					function(res) {
						if (res.data.code == "0") {
							if (type == "subtract") {
								server.showErr("更新购物车失败");
							} else {
								server.showErr("加入购物车失败");
							}
						} else {
							var temp = parseInt(that.cartList[index].number) + number;
							if (temp < 1) {
								that.cartList.splice(index, 1);
							} else {
								that.cartList[index].number = temp;
							}
							that.updateTotalPrice();
						}
					}
				);
			},
			//计算总价
			updateTotalPrice() {
				let that = this;
				let list = this.cartList;
				if (list.length === 0) {
					console.log('fadsfdsf');
					return;
				}
				let totalPrice = 0;
				list.forEach(item => {
					if (item.checked === true) {
						console.log('fadsfdsf');
						totalPrice += item.price * item.number;
					}
				});

				that.totalPrice = server.cent2dollar(totalPrice * 100);
			}

		}
	}
</script>

<style lang='scss'>
	.container {
		padding-bottom: 134upx;

	}

	.empty {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
		padding-bottom: 100upx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		background: #fff;

		image {
			width: 240upx;
			height: 160upx;
			margin-bottom: 30upx;
		}

		.empty-tips {
			display: flex;
			font-size: 26upx;
			color: gray;

			.navigator {
				color: $uni-color-primary;
				margin-left: 16upx;
			}
		}
	}

	/* 购物车列表项 */
	.cart-item {
		display: flex;
		position: relative;
		align-content: center;
		align-items: center;
		padding: 30upx 40upx;

		.cart-check {
			width: 30upx;
			height: 30upx;
		}

		.image-wrapper {
			width: 140upx;
			height: 140upx;
			flex-shrink: 0;
			position: relative;

			image {
				width: 140upx;
				height: 140upx;
				border-radius: 8upx;
			}
		}


		.item-right {
			display: flex;
			flex-direction: column;
			flex: 1;
			overflow: hidden;
			position: relative;
			padding-left: 30upx;

			.title {
				font-size: 30upx;
				color: black;
				height: 40upx;
				line-height: 40upx;
			}


			.attr {
				font-size: 26upx;
				color: gray;
				height: 50upx;
				line-height: 50upx;
			}

			.item-last {
				display: flex;
				align-items: center;
				align-content: center;

				.discount-price {
					font-size: 30upx;
					color: $theme-color;
					height: 50upx;
					line-height: 50upx;
				}

				.goods-price {
					margin: 15upx;
					flex-grow: 1;
					font-size: 24upx;
					color: gray;
					text-decoration: line-through;
				}
			}
		}

	}

	/* 底部栏 */
	.action-section {
		margin-bottom: 0upx;
		position: fixed;
		bottom: 0;
		z-index: 95;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 750upx;
		height: 100upx;
		background: #FFFFFF;
		.total-box {
			display: flex;
			margin-left: 30upx;
			.price-title {
				font-size: 32upx;
				color: black;
			}
			.price-number {
				font-size: 32upx;
				color: $theme-color;
			}
		}
		.confirm-btn {
			width: 250upx;
			height: 100upx;
			line-height: 100upx;
			text-align: center;
			font-size: 32upx;
			background: $theme-color;
			color: #FFFFFF;

		}
	}

	.uni-numbox {
		display: inline-flex;
		justify-content: flex-start;
		align-items: center;
		height: 50upx;
		position: relative;
		border: 1px solid #C0C0C0;
		border-radius: 8upx;
	}

	.uni-numbox-minus,
	.uni-numbox-plus {
		margin: 0;
		background-color: #f8f8f8;
		width: 50upx;
		height: 50upx;
		font-size: 30upx;
		line-height: 50upx;
		text-align: center;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: #333;
		position: relative;
	}

	.uni-numbox-value {
		position: relative;
		width: 50upx;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		padding: 0;
		font-size: 30upx;
		border-left: 1px solid #C0C0C0;
		border-right: 1px solid #C0C0C0;
	}
	.uni-numbox-disabled {
		color: #d6d6d6;
	}
</style>
