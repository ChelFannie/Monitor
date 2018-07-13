<template>
  <div class="competitive">
      <p class="title">{{title}}</p>
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
        <el-tab-pane label="高频彩" name="third">高频彩</el-tab-pane>
      </el-tabs>

      <div ref="myChart" :style="{width: '850px', height: '300px'}"></div>
      <el-tabs v-model="activeName2" type="card" class="bottom">
        <el-tab-pane label="出票" name="first">
          <el-table
            :data="competitiveData"
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

export default {
  data () {
    return {
      title: '竞彩',
      activeName1: 'first',
      activeName2: 'first',
      competitiveColumn: [
        {label: '赛事', prop: 'date', width: '266'},
        {label: '截至时间', prop: 'name', width: '266'},
        {label: '待出票', prop: 'address', width: '268'}
      ],
      competitiveData: [{
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
      alreadyColumn: [
        {label: '', prop: 'date', width: '100'},
        {label: '已出票', prop: 'date', width: '110'},
        {label: '已出票(金额)', prop: 'name', width: '150'},
        {label: '待出票', prop: 'address', width: '150'},
        {label: '待出票(金额)', prop: 'address', width: '150'},
        {label: '可用店铺', prop: 'address', width: '138'}
      ],
      notColumn: [
        {label: '', prop: 'date', width: '100'},
        {label: '已兑奖', prop: 'date', width: '110'},
        {label: '已兑奖(金额)', prop: 'name', width: '150'},
        {label: '待兑奖', prop: 'address', width: '150'},
        {label: '待兑奖(金额)', prop: 'address', width: '150'},
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
      }
    }
  },
  created () {

  },
  mounted () {
    this.myChart = this.$echarts.init(this.$refs.myChart)
    this.drawLine()
  },
  methods: {
    drawLine () {
      // 绘制图表
      this.myChart.setOption(this.option)
    },
    handleClick (tab, event) {
      this.title = tab.label
    }
  }
}
</script>
<style lang="less">
.competitive{
  margin-bottom: 60px;
  .title{
    font-size: 20px;
    font-weight: 800;
    color: #333333;
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
