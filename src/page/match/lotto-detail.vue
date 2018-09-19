<template>
  <div class="lotto-detail">
      <div class="top">彩期信息 <el-button class="return" size="medium" type="primary" @click="goBack">返回</el-button></div>
      <div class="title">超级大乐透</div>
      <div class="main">
        <div class="row">
          <p class="substance">系统编号：<span>18012345</span></p>
          <p class="substance">彩期编号：<span>180777</span></p>
          <p class="substance">类型：<span>数字彩</span></p>
          <p class="substance">彩期状态：<span>开售</span></p>
          <p class="substance">开售时间：<span>2018-07-01 09：00：00</span></p>
          <p class="substance">停售时间：<span>2018-07-01 22：00</span></p>
        </div>
      </div>
      <div class="win">
        <div class="number">开奖号码：</div>
        <span class="selected">01</span>
        <span>02</span>
        <span>03</span>
        <span>04</span>
        <span>51</span>
        <el-button class="edit" size="medium" type="primary">修改</el-button>
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
    goBack () {
      this.$router.push({name: '赛事/彩期'})
    }
  }
}
</script>
<style lang="less" scoped>
.lotto-detail{
  width: 900px;
  .top{
    font-size: 24px;
    line-height: 30px;
    margin: 30px 0 20px;
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
  .title{
    font-size: 28px;
    text-align: center;
    margin-bottom: 30px;
  }
  .main{
    font-size: 18px;
    .row{
      .substance{
        display: inline-block;
        margin: 10px 40px 0 0;
        span{
          color: #4daedb;
        }
      }
    }
  }
  .win{
    font-size: 18px;
    margin-top: 20px;
    .number{
      display: inline;
      font-size: 28px;
    }
    span{
      display: inline-block;
      width: 40px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      border-radius: 50%;
      border: 1px solid #f4f4f4;
      margin-right: 20px;
      &.selected{
        color: #ffffff;
        background: #4daedb;
      }
    }
    .edit{
      margin-left: 30px;
    }
  }
}
</style>
