<template>
	<view>
		<view class="user-card">
			<view class="usercard-top">
				<view :class="expand.length > 0 ? 'avatar' : 'avatar-noexpand'">
					<image :src="userinfo.avatar"></image>
					<view class="name">
						<text>{{ userinfo.userName }}</text>
					</view>
				</view>
			</view>

				<view class="usercard-bottom">


						<view class="usercard-bottom-item"  @click="showRedPaper()">
							<view class="item-top">
								<text>{{userinfo.redPaperCount}}</text>
							</view>
							<view class="item-bottom">
								<text>优惠券</text>
							</view>
						</view>


						<block><view class="line"></view></block>
						<view class="usercard-bottom-item" @click="showScore()">
							<view class="item-top">
								<text>{{ userinfo.score }}</text>
							</view>
							<view class="item-bottom">
								<text>积分</text>
							</view>
						</view>

						<block><view class="line"></view></block>
						<view class="usercard-bottom-item" @click="showMoney()">
							<view class="item-top">
								<text>{{ userinfo.money }}</text>
							</view>
							<view class="item-bottom">
								<text>余额</text>
							</view>
						</view>

				</view>

		</view>

				<view class="nav">
					<view class="nav-item" v-for="(item, index) in orderNavList" :key="index" @click="goDetail(item.url)">
						<block v-if="item.type > 0 && item.type<4 && item.count>0"><view class="bridge">{{item.count}}</view></block>
						<image :src="item.image" class="nav-image"></image>
						<text class="nav-text">{{item.name}}</text>

					</view>
				</view>


		<uni-list>
			<uni-list-item title="地址管理" @click="goAddress"></uni-list-item>
			<uni-list-item title="设置" @click="goSetting"></uni-list-item>
			<uni-list-item title="关于" @click="goAbout"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
import userCard from '@/components/mine/user-card.vue';
import grid from '@/components/common/grid.vue';
import uniList from '@/components/mine/uni-list.vue';
import uniListItem from '@/components/mine/uni-list-item.vue';
import mockData from '@/data/mine.js';


const server = require('../../utils/server');


export default {


	components: {

        userCard,
		grid,
		uniList,
		uniListItem,

	},
	data() {
		return {
			orderNavList:[],
			userinfo: {},
			expand: [],



		};
	},
	methods: {
		goAddress() {
			this.$jump('/pages/address/address-list/address-list');
		},
		goSetting() {
			this.$jump('/pages/setting/setting');
		},
		goAbout() {
			this.$jump('/pages/about/about');
		},
		goDetail(e) {
			uni.navigateTo({
				url:e
			})
		},
		showRedPaper(){
			this.$jump('/pages/coupon/coupon');
		},
		showMoney(){
			this.$jump('/pages/money/money');
		},
        showScore(){
            this.$jump('/pages/score/score');
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

		this.expand = mockData.walletInfo;



		this.getOrderNav();


	}
};
</script>

<style>

.bridge{
	display: flex;
	flex-direction:column-reverse;
	background: orangered;
	color:#fff;
	border-radius: 40upx;
	right:0;
	min-width: 20upx;
	position: relative;
	margin-left: 40px;
	margin-top:-20px;
	font-size:10px;
	width:20px;
	height: 20px;
    line-height: 20px;
	text-align: center;
}
.user-card {
	margin: 5% 5%;
	width: 90%;
	display: flex;
	flex-direction: column;
	height: 320upx;
	border-radius: 15upx;
	background: linear-gradient(45deg, #ffff00, #f0ad4e);
}

.usercard-top {
	width: 100%;
}

.avatar {
	width: 40%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	align-content: center;
	text-align: right;
}

.avatar-noexpand {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	text-align: right;
}

.avatar image {
	border-radius: 70upx;
	width: 100upx;
	height: 100upx;
	margin: 50upx 33.3upx 0upx 50upx;
}

.avatar-noexpand image {
	border-radius: 70upx;
	width: 100upx;
	height: 100upx;
}

.name text {
	font-size: 31upx;
	color: #5b441a;
	margin: 50upx 0upx 0upx 0upx;
}

.usercard-bottom {
	width: 100%;
	height: 160upx;
	display: flex;
	justify-content: center;
	align-items: center;
}

.usercard-bottom-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 25%;
}

.item-top text {
	font-size: 31upx;
	text-align: center;
	color: #5b441a;
}

.item-bottom text {
	font-size: 25upx;
	text-align: center;
	color: #5b441a;
}

.line {
	height: 50upx;
	width: 3upx;
	margin: 0 20upx;
	background-color: rgba(0, 0, 0, 0.2);
}
.nav {
	margin: 15upx;
	border-radius: 15upx;
	width: 720upx;
	height:120upx;
	display: flex;
	flex-wrap: wrap;
	background-color: #ffffff;




}

.nav .nav-item {
	width: 20%;
	height: 200 upx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;



}
.nav .nav-item .nav-image {
	 width: 50upx;
	 height: 50upx;
 }
.nav .nav-item .nav-text {
	height: 40upx;
	line-height: 40upx;
	font-size: 28upx;
	text-align: center;
}




</style>
