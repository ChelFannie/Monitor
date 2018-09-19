<template>
  <div class="match-detail">
    <div class="top">赛事信息 <el-button class="return" size="medium" type="primary" @click="goBack">返回</el-button></div>
    <div class="team">
        <div class="host">
            <div class="name">{{hostName}}</div>
            <p>(主队)</p>
        </div>
        <span>VS</span>
        <div class="guest">
            <div class="name">{{guestName}}</div>
            <p>(客队)</p>
        </div>
    </div>
    <p class="leagueMatch">联赛：{{leagueMatch}}</p>
    <div class="detail">
      <div>
         <p>系统编号：<span class="substance">FB201807017051</span></p>
         <p>赛事编号：<span class="substance">周日051</span></p>
         <p>类型：<span class="substance">竞彩</span></p>
         <p>开售日期：<span class="substance">FB2007017051</span></p>
         <p>停售时间：<span class="substance">周日01</span></p>
         <p>赛事状态：<span class="substance">竞彩</span></p>
      </div>
    </div>
    <div class="play marginTop">
      <el-table :data="playData" border style="width: 900px">
          <el-table-column prop="play" label="玩法" width="300" align="center"></el-table-column>
          <el-table-column label="单关" width="300" align="center">
            <template slot-scope="scope">
              <span class="white" v-if="scope.row.single == 1"></span>
              <span class="blue" v-if="scope.row.single == 0"></span>
            </template>
          </el-table-column>
          <el-table-column label="过关" width="299" align="center">
            <template slot-scope="scope">
              <span class="white" v-if="scope.row.pass == 1"></span>
              <span class="blue" v-if="scope.row.pass == 0"></span>
            </template>
          </el-table-column>
      </el-table>
    </div>
    <div class="winFlatLoss marginTop">
      <div class="title">胜平负</div>
      <el-table :data="winFlatLossData" border style="width: 900px">
        <el-table-column v-for="(item, index) in winFlatLossColumn"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align="center">
        </el-table-column>
      </el-table>
    </div>
    <div class="halfFull marginTop">
      <div class="title">半全场胜平负</div>
      <el-table :data="halfFullData" border style="width: 900px">
        <el-table-column v-for="(item, index) in halfFullColumn"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align="center">
        </el-table-column>
      </el-table>
    </div>
    <div class="letwinFlatLoss marginTop">
      <div class="title">让球胜平负(+1)</div>
      <el-table :data="letwinFlatLossData" border style="width: 900px">
        <el-table-column v-for="(item, index) in letwinFlatLossColumn"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align="center">
        </el-table-column>
      </el-table>
    </div>
    <div class="score marginTop">
      <div class="title">比分</div>
      <el-table :data="scoreData1" border style="width: 900px">
        <el-table-column v-for="(item, index) in scoreColumn1"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align="center">
        </el-table-column>
      </el-table>
      <el-table :data="scoreData2" border style="width: 900px">
        <el-table-column v-for="(item, index) in scoreColumn2"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align="center">
        </el-table-column>
      </el-table>
      <el-table :data="scoreData3" border style="width: 900px">
        <el-table-column v-for="(item, index) in scoreColumn3"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align="center">
        </el-table-column>
      </el-table>
    </div>
    <div class="goals marginTop">
      <div class="title">总进球</div>
      <el-table :data="goalsData" border style="width: 900px">
        <el-table-column v-for="(item, index) in goalsColumn"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align="center">
        </el-table-column>
      </el-table>
    </div>
    <div class="singlePair marginTop">
      <div class="title">上下盘单双</div>
      <el-table :data="singlePairData" border style="width: 900px">
        <el-table-column v-for="(item, index) in singlePairColumn"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align="center">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      hostName: '俄罗斯',
      guestName: '西班牙',
      leagueMatch: '世界杯',
      playData: [
        {play: '胜平负', single: 0, pass: 1},
        {play: '半全场平负', single: 0, pass: 1},
        {play: '比分', single: 1, pass: 1},
        {play: '总进球', single: 1, pass: 1},
        {play: '上下盘单双', single: 0, pass: 0},
        {play: '让球胜平负', single: 0, pass: 0},
        {play: '大小球', single: 1, pass: 1},
        {play: '混合过关', single: 0, pass: 1}
      ],
      winFlatLossColumn: [
        {prop: 'time', label: '时间', width: '225'},
        {prop: 'win', label: '胜', width: '225'},
        {prop: 'flat', label: '平', width: '225'},
        {prop: 'loss', label: '负', width: '224'}
      ],
      winFlatLossData: [],
      halfFullColumn: [
        {prop: 'time', label: '时间', width: '90'},
        {prop: 'time', label: '胜胜', width: '90'},
        {prop: 'time', label: '胜平', width: '90'},
        {prop: 'time', label: '胜负', width: '90'},
        {prop: 'time', label: '平胜', width: '90'},
        {prop: 'time', label: '平平', width: '90'},
        {prop: 'time', label: '平负', width: '90'},
        {prop: 'time', label: '负胜', width: '90'},
        {prop: 'time', label: '负平', width: '90'},
        {prop: 'time', label: '负负', width: '89'}
      ],
      halfFullData: [],
      letwinFlatLossColumn: [
        {prop: 'time', label: '时间', width: '225'},
        {prop: 'time', label: '让胜', width: '225'},
        {prop: 'time', label: '让平', width: '225'},
        {prop: 'time', label: '让负', width: '224'}
      ],
      letwinFlatLossData: [],
      scoreColumn1: [
        {prop: 'time', label: '1:0', width: '69'},
        {prop: 'time', label: '2:0', width: '69'},
        {prop: 'time', label: '2:1', width: '69'},
        {prop: 'time', label: '3:0', width: '69'},
        {prop: 'time', label: '3:1', width: '69'},
        {prop: 'time', label: '3:2', width: '69'},
        {prop: 'time', label: '4:0', width: '69'},
        {prop: 'time', label: '4:1', width: '69'},
        {prop: 'time', label: '4:2', width: '69'},
        {prop: 'time', label: '5:0', width: '69'},
        {prop: 'time', label: '5:1', width: '69'},
        {prop: 'time', label: '5:2', width: '69'},
        {prop: 'time', label: '胜其他', width: '71'}
      ],
      scoreData1: [],
      scoreColumn2: [
        {prop: 'time', label: '0:0', width: '80'},
        {prop: 'time', label: '1:1', width: '80'},
        {prop: 'time', label: '2:2', width: '80'},
        {prop: 'time', label: '3:3', width: '80'},
        {prop: 'time', label: '平其他', width: '80'}
      ],
      scoreData2: [],
      scoreColumn3: [
        {prop: 'time', label: '0:1', width: '69'},
        {prop: 'time', label: '0:2', width: '69'},
        {prop: 'time', label: '1:2', width: '69'},
        {prop: 'time', label: '0:3', width: '69'},
        {prop: 'time', label: '1:3', width: '69'},
        {prop: 'time', label: '2:3', width: '69'},
        {prop: 'time', label: '0:4', width: '69'},
        {prop: 'time', label: '1:4', width: '69'},
        {prop: 'time', label: '2:4', width: '69'},
        {prop: 'time', label: '0:5', width: '69'},
        {prop: 'time', label: '1:5', width: '69'},
        {prop: 'time', label: '2:5', width: '70'},
        {prop: 'time', label: '负其他', width: '70'}
      ],
      scoreData3: [],
      goalsColumn: [
        {prop: 'time', label: '时间', width: '100'},
        {prop: 'time', label: '0', width: '100'},
        {prop: 'time', label: '1', width: '100'},
        {prop: 'time', label: '2', width: '100'},
        {prop: 'time', label: '3', width: '100'},
        {prop: 'time', label: '4', width: '100'},
        {prop: 'time', label: '5', width: '100'},
        {prop: 'time', label: '6', width: '100'},
        {prop: 'time', label: '7+', width: '99'}
      ],
      goalsData: [],
      singlePairColumn: [
        {prop: 'time', label: '时间', width: '180'},
        {prop: 'time', label: '上单', width: '180'},
        {prop: 'time', label: '上双', width: '180'},
        {prop: 'time', label: '下单', width: '180'},
        {prop: 'time', label: '下双', width: '179'}
      ],
      singlePairData: []
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
.match-detail{
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
  .team{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    text-align: center;
    .host,.guest{
      width: 150px;
      text-align: center;
      p{
        margin: 10px 0;
      }
    }
    .name{
      font-size: 28px;
      color: #4daedb;
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
  .leagueMatch{
    text-align: center;
    margin: 20px 0;
    letter-spacing:5px;
    font-size: 16px;
  }
  .play{
    .white{
      width: 20px;
      height: 20px;
      display: inline-block;
      text-align: center;
      background-color: #fff;
      border: #00b0e0 solid 1px;
      border-radius: 50%;
    }
    .blue{
      width: 20px;
      height: 20px;
      display: inline-block;
      background-color: #00b0e0;
      border: #00b0e0 solid 1px;
      border-radius: 50%;
    }
  }
  .title{
      width: 900px;
      height: 24px;
      padding: 12px 0;
      text-align: center;
      background-color: #e1e1e1;
  }
  .marginTop {
      margin-top: 30px;
  }
  .singlePair{
      margin-bottom: 100px;
  }
}
</style>
