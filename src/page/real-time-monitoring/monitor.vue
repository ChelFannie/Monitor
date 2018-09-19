<template>
  <div class="competitive">
      <div class="top-title">
        <p class="title">{{title}}</p>
        <el-button size="small" @click="changeReceiveOrderStatus">{{receiveOrderStatus === 1 ? '开启': '停售'}}</el-button>
      </div>
      <el-tabs v-model="activeName1" type="card" @tab-click="handleClick">
        <el-tab-pane label="竞彩" name="first">
          <el-table
            :data="competitiveData"
            border
            class="noright"
            style="width: 801px"
            >
            <el-table-column v-for="(item, index) in competitiveColumn"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              align="center">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="数字彩" name="second">
          <el-table
            :data="digitalData"
            border
            style="width: 801px">
            <el-table-column v-for="(item, index) in digitalColumn"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              align="center">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="高频彩" name="third">
          <el-table
            :data="highData"
            border
            style="width: 801px">
            <el-table-column v-for="(item, index) in digitalColumn"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              align="center">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>

      <div ref="myChart" :style="{width: '850px', height: '300px'}"></div>
      <el-tabs v-model="activeName2" type="card" class="bottom">
        <el-tab-pane label="出票" name="first">
          <el-table
            :data="drawData"
            border
            class="noright"
            style="width: 800px">
            <el-table-column v-for="(item, index) in alreadyColumn"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              align="center">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="兑奖" name="second">
          <el-table
            :data="competitiveData"
            border
            class="noright"
            style="width: 800px">
            <el-table-column v-for="(item, index) in notColumn"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              align="center">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>
<script>
import req from '../../api/real-time-monitoring'
export default {
  data () {
    return {
      title: '竞彩',
      activeName1: 'first',
      activeName2: 'first',
      competitiveColumn: [
        {label: '赛事', prop: 'match', width: '266'},
        {label: '截至时间', prop: 'stopSaleTime', width: '266'},
        {label: '待出票', prop: 'orderList', width: '268'}
      ],
      drawData: [],
      competitiveData: [],
      digitalColumn: [
        {label: '期号', prop: 'date', width: '200'},
        {label: '彩种', prop: 'date', width: '200'},
        {label: '截至时间', prop: 'name', width: '200'},
        {label: '待出票', prop: 'address', width: '200'}
      ],
      digitalData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市'
      }],
      highData: [],
      alreadyColumn: [
        // {label: '', prop: 'date', width: '100'},
        {label: '已出票', prop: 'draw', width: '110'},
        {label: '已出票(金额)', prop: 'drawMoney', width: '200'},
        {label: '待出票', prop: 'ready', width: '150'},
        {label: '待出票(金额)', prop: 'readyMoney', width: '200'},
        {label: '可用店铺', prop: 'shop', width: '138'}
      ],
      notColumn: [
        // {label: '', prop: 'date', width: '100'},
        {label: '已兑奖', prop: 'date', width: '110'},
        {label: '已兑奖(金额)', prop: 'name', width: '200'},
        {label: '待兑奖', prop: 'address', width: '150'},
        {label: '待兑奖(金额)', prop: 'address', width: '200'},
        {label: '可用店铺', prop: 'address', width: '138'}
      ],
      myChart: null,
      option: {
        title: {
          left: 'center',
          text: '当天销量趋势'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          bottom: 0,
          left: 'center',
          data: ['邮件营销', '联盟广告', '视频广告']
        },
        // grid: {
        //   left: '3%',
        //   right: '4%',
        //   bottom: '3%',
        //   containLabel: true
        // },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
          }
        ]
      },
      receiveOrderStatus: 0
    }
  },
  created () {
    this.initSetTimeout(this.today)
  },
  mounted () {
    this.getCompetitiveData()
    this.orderStatusStatistics()
    this.myChart = this.$echarts.init(this.$refs.myChart)
    this.drawLine()
  },
  methods: {
    getCompetitiveData () {
      req('getCompetitiveOrderData')
        .then(res => {
          this.competitiveData = []
          if (res.code === '00000') {
            for (const key in res.data) {
              let _arr = {}
              _arr['match'] = key + '(' + res.data[key]['matchId'] + ')'
              _arr['stopSaleTime'] = res.data[key]['stopSaleTime']
              _arr['orderList'] = res.data[key]['orderList'].length
              this.competitiveData.push(_arr)
            }
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
    },
    drawLine () {
      // 绘制图表
      this.myChart.setOption(this.option)
    },
    handleClick (tab, event) {
      this.title = tab.label
    },
    changeReceiveOrderStatus () {
      this.receiveOrderStatus = this.receiveOrderStatus === 1 ? 0 : 1
      req('changeReceiveOrderStatus', {receiveOrderStatus: this.receiveOrderStatus})
        .then(res => {
          console.log(res)
        })
    },
    // 出票数据获取
    orderStatusStatistics () {
      req('orderStatusStatistics')
        .then(res => {
          this.drawData = []
          if (res.code === '00000') {
            let _arr = {}
            _arr['draw'] = res.data[2].printCount
            _arr['drawMoney'] = (res.data[2].printAmount / 100).toFixed(2)
            _arr['ready'] = res.data[1].printCount
            _arr['readyMoney'] = (res.data[1].printAmount / 100).toFixed(2)
            this.drawData.push(_arr)
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
    },
    // 定时5秒刷新一次数据
    initSetTimeout () {
      setInterval(() => {
        this.getCompetitiveData()
        this.orderStatusStatistics()
      }, 5000)
    }
  }
}
</script>
<style lang="less">
.competitive{
  margin-bottom: 60px;
  .top-title{
    .title{
      display: inline-block;
      font-size: 20px;
      font-weight: 800;
      color: #333333;
      margin-right: 20px;
    }
  }
  .el-tabs{
    margin-bottom: 30px;
  }
  .el-table{
    margin-top: 1px;
  }
  .noright{
    &.el-table--border::after, .el-table--group::after {
      width: 0;
    }
  }
  .tabPane{
    width: 200px;
  }
  .el-tabs__nav{
    .el-tabs__item{
      width: 200px;
      text-align: center;
      background-color: #f4f4f4;
    }
    .is-active{
      width: 398px;
      background-color: #fff;
    }
  }
  .bottom{
    margin-top: 50px;
    .el-tabs__item{
      width: 397px;
      text-align: center;
      background-color: #f4f4f4;
    }
    .is-active{
      width: 397px;
      background-color: #fff;
    }
  }
}
</style>
