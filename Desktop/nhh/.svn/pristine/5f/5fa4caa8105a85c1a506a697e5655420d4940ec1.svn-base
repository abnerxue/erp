<template>


    <view class="content top-pad">

        <view class="mo-top">
            <view class="h1">{{ userinfo.score }}</view>
            <view class="p">
                总积分
            </view>
        </view>



        <view class="tit">
            积分日志
        </view>

        <view class="mo-ul">
            <view v-for="(item,index) in scoreList" :key='index' >

            <view class="li">
                {{item.explain}}

            </view>

                <view class="span">{{item.score}}积分</view>
            </view>

        </view>

    </view>


</template>

<script>
    const server = require('../../utils/server');

    export default {
        data() {
            return {
                scoreList:[],
                userinfo:[],

                page:0,
                span:0,
            }
        },

        onLoad() {

            this.getScoreList(this.page, 0, this.span);

            this.getOrderNav();

            this.page += 1;

        },
        methods: {

            //获取订单列表
            getScoreList(page, sort, span) {
                let token = uni.getStorageSync('token');
                var that = this;
                server.getJSON(
                    '/api/user/get_score_list', {
                        ajax: 'true',
                        'span': span,
                        'page': page,
                        'sort': sort,
                        'token':token,

                    },
                    function(res) {


                        that.scoreList=res.data.list;



                    }
                );
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


                        that.userinfo=res.data.result;


                    }
                );
            },



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
        font-size:14px;
        margin-left:10px;
        flex:1;
    }

    .mo-ul .span{

        position:relative;
        top:28px;
        left:-46px
    }



</style>