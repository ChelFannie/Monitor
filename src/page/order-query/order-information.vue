<template>
  <div class="order-information">
    <div class="top">订单基本信息 <el-button class="return" size="medium" type="primary" @click="goBack">返回</el-button></div>
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
    <el-table
      :data="tableData"
      border
      class="noright"
      style="width: 900px">
      <el-table-column prop="order" label="系统票号" width="190" align="center">
        <template slot-scope="scope">
          <el-popover trigger="click" placement="right-start">
            <div class="hoverInput">
              <span>落地票号:</span>
              <el-input v-model="input" placeholder="请输入内容"></el-input>
              <el-button type="primary" size="small">确认票</el-button>
            </div>
            <div class="hoverContent">
              <p class="hoverItem">系统票号: <span class="substance">12222222222222</span></p>
              <p class="hoverItem">彩种: <span class="substance">足球混合过关</span></p>
              <p class="hoverItem">倍数: <span class="substance">11倍</span></p>
              <p class="hoverItem">金额: <span class="substance">4元</span></p>
              <p class="hoverItem">预计奖金: <span class="substance">25.43元</span></p>
              <p class="hoverItem">出票店铺: <span class="substance">广州乐盈盈店</span></p>
              <p class="hoverItem">最迟出票时间: <span class="substance">2018-07-01 22:09:15</span></p>
              <p class="hoverItem">出票时间: <span class="substance">2018-07-01 22:09:15</span></p>
            </div>
            <el-table :data="hoverData" border class="noright">
              <el-table-column v-for="(item, index) in hoverColumn"
                :key="index"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                align="center">
              </el-table-column>
              <el-table-column label="投注项" width="200" align="center">
                <template slot-scope="scope">
                  <span>足球胜平负</span>
                  <el-button type="text" size="small">[胜1.7]</el-button>
                  <el-button type="text" size="small">[负1.8]</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="img">
              <img src="../../assets/image/样图.jpg" alt="">
            </div>
            <div slot="reference">
              <el-tag size="medium">{{ scope.row.order1 }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column v-for="(item, index) in tableColumn"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        align="center">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableColumn: [
        {label: '设备', prop: 'order', width: '150'},
        {label: '店铺', prop: 'address', width: '120'},
        {label: '金额', prop: 'address', width: '80'},
        {label: '下发时间', prop: 'address', width: '120'},
        {label: '出票时间', prop: 'address', width: '120'},
        {label: '出票状态', prop: 'address', width: '119'}
      ],
      tableData: [
        {order: '123456789', order1: '123456789', address: 'hh'},
        {order: '123456789', order1: '123456789', address: 'hh'},
        {order: '123456789', order1: '123456789', address: 'hh'},
        {order: '123456789', order1: '123456789', address: 'hh'},
        {order: '123456789', order1: '123456789', address: 'hh'}
      ],
      hoverColumn: [
        {label: '编号', prop: 'order', width: '150'},
        {label: '主队', prop: 'address', width: '140'},
        {label: '客队', prop: 'address', width: '140'},
        {label: '预设', prop: 'address', width: '69'}
      ],
      hoverData: [
        {order: '123456789', order1: '123456789', address: 'hh'},
        {order: '123456789', order1: '123456789', address: 'hh'},
        {order: '123456789', order1: '123456789', address: 'hh'},
        {order: '123456789', order1: '123456789', address: 'hh'},
        {order: '123456789', order1: '123456789', address: 'hh'}
      ],
      input: ''
    }
  },
  created () {

  },
  methods: {
    goBack () {
      this.$router.push({name: '订单列表'})
    }
  }
}
</script>
<style lang="less">
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
  .noright{
    margin-top: 20px;
    margin-bottom: 500px;
  }
}
  .el-popover{
    width: 700px !important;
    top: 315px !important;
    // height: 1000px;
    .popper__arrow{
      top: 2% !important;
    }
    .hoverInput{
      display: flex;
      align-items: center;
      span{
        width: 100px;
      }
      .el-input__inner{
        width: 545px;
        height: 33px;
      }
    }
    .hoverItem{
      display: inline-block;
      margin: 10px 40px 0 0;
      .substance{
        color: #4daedb;
      }
    }
    .noright{
      margin-top: 20px;
    }
    .img{
      margin-top: 10px;
      text-align: center;
      img{
        width: 500px;
      }
    }
  }
</style>
