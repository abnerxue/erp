<template>
	<view>
		<uni-segmented-control :current="current" :values="tabArray" @clickItem="tabClick" styleType="text" activeColor='#d81e06'></uni-segmented-control>
		<view class="content">
			<view v-show="current === 0">

				<order-all :list='orderList'></order-all>
			</view>
			<view v-show="current === 1">

				<order-not-pay :list='orderListnotpayed'></order-not-pay>
			</view>
			<view v-show="current === 2">
				<order-not-receive :list='orderListnotreceived'></order-not-receive>
			</view>
			<view v-show="current === 3">
				<order-not-evaluate :list='orderListnotevaluate'></order-not-evaluate>
			</view>
			<view v-show="current === 4">
				<order-done :list='orderListNone'></order-done>
			</view>
		</view>
	</view>
</template>

<script>
	const server = require('../../utils/server');

	import uniSegmentedControl from '@/components/order/uni-segmented-control.vue'
	import orderAll from '@/components/order/order-all.vue'
	import orderNotPay from '@/components/order/order-not-pay.vue'
	import orderNotReceive from '@/components/order/order-not-receive.vue'
	import orderNotEvaluate from '@/components/order/order-not-evaluate.vue'
	import orderDone from '@/components/order/order-done.vue'
	import mockData from '@/data/order.js'

	export default {
		components: {
			uniSegmentedControl,
			orderAll,
			orderNotPay,
			orderNotReceive,
			orderNotEvaluate,
			orderDone,

		},



		data() {
			return {
				page: 0,
				current: 0,
				tabArray: ['全部', '待收款', '待收货', '待评价', '已完成'],
				allTradeList: [],
				notPayList: [],
				notReceiveList: [],
				notEvaluateList: [],
				tradeDoneList: [],
				orderList:[],
				orderListnotpayed:[],
				orderListnotreceived:[],
				orderListnotevaluate:[],
				orderListNone:[],
				span:0,
			};
		},
		methods: {
			tabClick(index) {
				if (this.current != index) {
					this.current = index
				}
			},
			//获取订单列表
			getOrderList(page, sort, span) {
				let token = uni.getStorageSync('token');
				var that = this;
				server.getJSON(
						'/api/user/order_list', {
							ajax: 'true',
							'span': span,
							'page': page,
							'sort': sort,
							'token':token,

						},
						function(res) {
                            //console.log(res);
							let result = res.data.list;
							if (page > 1 && res.data.totalPage <= page) {
								// uni.showModal({
								// 	title: '提示信息',
								// 	content: '已经到底部了！',
								// 	showCancel: false
								// })
                                if (!that.isBottomErr) {
									that.isBottomErr = true;
									server.showNotice("已经到底部了");
								}
							     return false;
							} else {

								if (result.length > 0) {
									for (var i in result) {
										that.orderList.push(result[i]);
									}
								}
							}
						}
				);
			},
			getOrderListNotPayed(page,sort,span) {
				let token = uni.getStorageSync('token');
				var that = this;
				server.getJSON(
						'/api/user/order_list', {
							ajax: 'true',
							'span': span,
							'page': page,
							'sort': sort,
							'token':token,
							'status':'un_payment',

						},
						function(res) {

							let result = res.data.list;


								if (result.length > 0) {
									for (var i in result) {
										that.orderListnotpayed.push(result[i]);
									}
								}

						}
				);
			},
			getOrderListNotReceived(page,sort,span) {
				let token = uni.getStorageSync('token');
				var that = this;
				server.getJSON(
						'/api/user/order_list', {
							ajax: 'true',
							'span': span,
							'page': page,
							'sort': sort,
							'token':token,
							'status':'un_received',

						},
						function(res) {

							let result = res.data.list;

                                if (result.length > 0) {
									for (var i in result) {
										that.orderListnotreceived.push(result[i]);
									}
								}

						}
				);
			},
			getOrderListNotEvaluate(page,sort,span) {
				let token = uni.getStorageSync('token');
				var that = this;
				server.getJSON(
						'/api/user/order_list', {
							ajax: 'true',
							'span': span,
							'page': page,
							'sort': sort,
							'token':token,
							'status':'un_evaluated',

						},
						function(res) {

							let result = res.data.list;


								if (result.length > 0) {
									for (var i in result) {
										that.orderListnotevaluate.push(result[i]);
									}
								}

						}
				);
			},
			getOrderListDone(page,sort,span) {
				let token = uni.getStorageSync('token');
				var that = this;
				server.getJSON(
						'/api/user/order_list', {
							ajax: 'true',
							'span': span,
							'page': page,
							'sort': sort,
							'token':token,
							'status':'un_done',

						},
						function(res) {

							let result = res.data.list;


								if (result.length > 0) {
									for (var i in result) {
										that.orderListNone.push(result[i]);
									}
								}

						}
				);
			},
			checklogin() {

				let token = uni.getStorageSync('token');
                console.log(token);
				if (token.length < 10) {

                   uni.navigateTo({
						url: '/pages/login/login'
					});


				}
			}

	},
		onLoad(options) {

			this.checklogin();

            this.current=Number(options.index);
			this.allTradeList = mockData.allTradeList;
			this.notPayList = mockData.notPayList;
			this.notReceiveList = mockData.notReceiveList;
			this.notEvaluateList = mockData.notEvaluateList;
			this.tradeDoneList = mockData.tradeDoneList;

			this.getOrderList(this.page, 0, this.span);
			this.getOrderListNotPayed(this.page, 0, this.span);
			this.getOrderListNotReceived(this.page, 0, this.span);
			this.getOrderListNotEvaluate(this.page, 0, this.span);
			this.getOrderListDone(this.page, 0, this.span);

			this.page += 1;


		},
		onReachBottom() {
			this.page += 1;
			this.getOrderList(this.page, 0, this.span);
			this.getOrderListNotPayed(this.page, 0, this.span);
			this.getOrderListNotReceived(this.page, 0, this.span);
			this.getOrderListNotEvaluate(this.page, 0, this.span);
			this.getOrderListDone(this.page, 0, this.span);
		},

	}
</script>

<style lang="scss">

</style>
