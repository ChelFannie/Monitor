<template>
  <div class="nav">
    <div class="top">
        <div class="left">分布式出票监控平台</div>
        <div class="right"><span>abcd</span><img src="../assets/image/三角形.png" alt="" srcset=""></div>
    </div>
    <div class="content">
        <div class="grid-content bg-purple">
            <el-menu
                :default-active="activeIndex"
                class="el-menu-vertical"
                @open="handleOpen"
                @close="handleClose"
                @select="handleSelect">
                <el-menu-item index="/welcome" class="fontSize">
                    <span slot="title">菜单导航</span>
                </el-menu-item>
                <el-menu-item index="/real-time-monitoring/monitor" class="fontSize">
                    <span slot="title">实时监控</span>
                </el-menu-item>
                <el-menu-item index="/match/match" class="fontSize">
                    <span slot="title">赛事/彩期</span>
                </el-menu-item>
                <el-menu-item index="/order-query/order-List" class="fontSize">
                    <span slot="title">订单查询</span>
                </el-menu-item>
                <!-- <el-submenu index="4" class="fontSize">
                    <template slot="title">
                    <span class="fontSize">销售统计</span>
                    </template>
                    <el-menu-item-group>
                    <el-menu-item index="4-1">竞彩</el-menu-item>
                    <el-menu-item index="4-2">数字彩</el-menu-item>
                    <el-menu-item index="4-3">高频彩</el-menu-item>
                    </el-menu-item-group>
                </el-submenu> -->
                <el-menu-item index="/shop-list/shop-list" class="fontSize">
                    <span slot="title">商铺列表</span>
                </el-menu-item>
                <!-- <el-menu-item index="6" class="fontSize">
                    <span slot="title">渠道列表</span>
                </el-menu-item> -->
            </el-menu>
        </div>
        <div class="content1">
            <router-view></router-view>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: '/welcome'
    }
  },
  created () {
  },
  mounted () {
    if (this.$router.currentRoute.redirectedFrom === '/') {
      this.activeIndex = '/welcome'
      localStorage.setItem('activeIndex', '/welcome')
    } else {
      this.activeIndex = localStorage.getItem('activeIndex')
    }
  },
  methods: {
    handleSelect (index, indexPath) {
      localStorage.setItem('activeIndex', index)
      this.$router.push({path: index})
    },
    handleOpen (val) {
    },
    handleClose () {

    }
  }
}
</script>
<style lang="less" scoped>
.nav{
    .top{
        height: 50px;
        font-size: 20px;
        color: #fff;
        padding-left: 40px;
        padding-right: 40px;
        line-height: 50px;
        background-color: #4dafdb;
        display: flex;
        justify-content: space-between;
        .right{
            span{
                margin-right: 10px;
            }
        }
    }
    .content{
        padding: 0 30px;
        display: flex;
        .el-menu-vertical{
            width: 220px;
            background-color: #f4f4f4;
            .fontSize{
                font-size: 18px;
                color: #333333;
            }
        }
        .content1{
            width: 100%;
            padding-left: 30px;
        }
    }
    .el-menu-item.is-active{
        background-color: #4dafdb !important;
        color: #fff !important;
        border-top: 1px solid #f4f4f4;
    }
}
</style>
