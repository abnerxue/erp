<template>


    <view class="content top-pad">

        <view class="mo-top">
            <view class="h1">0元</view>
            <view class="p">
                总余额
<!--                <view class="a">提现</view>-->
            </view>
        </view>



        <view class="tit">
            消费记录
        </view>

        <view class="mo-ul">
            <view class="li">
                下单消费
                <view class="span">-100</view>
            </view>

            <view class="li">
                下单消费
                <view class="span">-50</view>
            </view>

        </view>

    </view>


</template>

<script>
    const server = require('../../utils/server');

    export default {
        data() {
            return {
                couponValidList:[],


                page:0,
                span:0,
            }
        },

        onLoad() {

            this.getCouponList(this.page, 0, this.span);



        },
        methods: {

            //获取订单列表
            getCouponList(page, sort, span) {
                let token = uni.getStorageSync('token');
                var that = this;
                server.getJSON(
                    '/user/red_paper/get_list', {
                        ajax: 'true',
                        'span': span,
                        'page': page,
                        'sort': sort,
                        'token':token,

                    },
                    function(res) {


                        that.couponValidList=res.data.list;



                    }
                );
            }



        }
    }
</script>

<style>
    view{
        display: flex;
        flex-wrap: wrap;

        color:#333;
        font-size: 20px;
        line-height: 20px;
        letter-spacing: 0.1rem;

        margin:0;
        padding:0;

    }

    .content {
        position: absolute;
        top: -88px;
        right: 0;
        left: 0;
        bottom: 0;
        overflow: auto;
    }

    .top-pad {
        margin-top: 4.5rem;
    }

    .mo-top {
        width: 100%;
        height: 150px;
        display: inline-block;
        text-align: center;
        background-color:#e10;
    }

    .mo-top .h1 {
        margin-top: 3rem;
        color:
                #fff;
        font-weight: lighter;
        font-size: 28px;
        line-height: 4rem;

        display: flex;
        justify-content:center;/*x轴对齐方式*/
        align-items:center;     /*y轴对滴方式*/

        margin-top:5px

    }

    .mo-top .p {
        color:
                #ddd;
        margin-top: .3rem;

        display: flex;
        justify-content:center;/*x轴对齐方式*/
        align-items:center;     /*y轴对滴方式*/
        font-size: 18px;
    }

    .mo-top .p .a {
        display: inline-block;
        background-color:
                #debc74;
        padding: .1rem 1rem;
        -webkit-border-radius: .3rem;
        border-radius: .3rem;

        color:
                #333;
        text-decoration: none;
    }

    .tit {
        width: 100%;
        font-size: 20px;

        background-color:
                #fff;

        position:absolute;
        top:160px;
        font-weight: 800;
        margin-left:10px
    }

    .mo-ul {
        width: 100%;

        display: inline-block;
        background-color:
                #fff;
        position:absolute;
        top:190px;



    }

    .mo-ul .li {
        width: 100%;

        border-bottom: 1px dashed
        #eee;
        padding: 1rem 0;
        font-size:18px;
        margin-left:10px;
        flex:1;
    }

    .mo-ul .li .span{

        margin:0px 100px
    }



</style>