<template>
  <div class="order-information">
    <div class="top">订单基本信息 <el-button class="return" size="medium" type="primary">返回</el-button></div>
    <div class="detail">
    <div>
        <p>订单号：<span class="substance">FB2341201807017051</span></p>
        <p>彩种：<span class="substance">足球混合过关</span></p>
        <p>类型：<span class="substance">竞彩</span></p>
        <p>金额：<span class="substance">200元</span></p>
        <p>归属地：<span class="substance">河南省郑州市中原区</span></p>
        <p>订单时间：<span class="substance">2018-07-01 12::09:15</span></p>
        <p>渠道：<span class="substance">中国移动河南分公司</span></p>
        <p>支付状态：<span class="substance">已支付</span></p>
        <p>订单状态：<span class="substance">处理中</span></p>
        <p>失效时间：<span class="substance">2018-07-30 12::09:15</span></p>
        <p>支付渠道：<span class="substance">WechatPay</span></p>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  created () {

  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.order-information{
  width: 900px;
  .top{
    font-size: 24px;
    line-height: 30px;
    margin: 30px 0 20px;
    overflow: hidden;
    &::before{
      content: '';
      display: inline-block;
      width: 2px;
      height: 30px;
      background: red;
      margin-right: 10px;
      vertical-align: middle;
    }
    .return{
      float: right;
    }
  }
  .detail{
    font-size: 18px;
    line-height: 30px;
    p{
      display: inline-block;
      margin: 10px 40px 0 0;
    }
    .substance{
      color: #4daedb;
    }
  }
}
</style>
