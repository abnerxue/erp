const userInfo = {
	username: '会员',
	avatar: 'http://cdn.mzyun.tech/mzyun.png'
}
const walletInfo = [{
	number: 0,
	name: '优惠券'
}, {
	number: 0,
	name: '积分'
}, {
	number: 0,
	name: '零钱'
}]
const nav = [{
	image: '/static/mine/order1.png',
	name: '全部订单',
	url:'/pages/order/order?index=0',
	count:11,
	maxCount:9
}, {
	image: '/static/mine/order2.png',
	name: '待付款2',
	url:'/pages/order/order?index=1',
	count:10,
	maxCount:9
}, {
	image: '/static/mine/order3.png',
	name: '待收货',
	url:'/pages/order/order?index=2',
	count:10,
	maxCount:9
}, {
	image: '/static/mine/order4.png',
	name: '待评价',
	url:'/pages/order/order?index=3',
	count:10,
	maxCount:9
}, {
	image: '/static/mine/order5.png',
	name: '已完成',
	url:'/pages/order/order?index=4',
	count:10,
	maxCount:9
}]
export default {
	userInfo,
	walletInfo,
	nav
}
