<template>
  <div class="match">
    <i-layout :gray="true">
      <div slot="grayLayout">
          <i-form @search="search" @empty="empty">
            <el-form-item label="开售时间">
              <el-date-picker
                v-model="form.createDate"
                type="datetime"
                placeholder="选择日期"
                value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="停售时间">
              <el-date-picker
                v-model="form.stopSaleTime"
                type="datetime"
                placeholder="选择日期"
                value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="赛事编号" v-if="activeName == 'first'">
              <el-input v-model="form.matchUniqueId" maxlength="30"></el-input>
            </el-form-item>
            <el-form-item label="赛果" v-if="activeName == 'first'">
              <el-select v-model="form.regFrom" placeholder="请选择">
                <el-option
                  v-for="item in species"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="类型" v-if="activeName == 'first'">
              <el-select v-model="form.matchType" placeholder="请选择">
                <el-option
                  v-for="item in competitiveType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="彩期" v-if="activeName == 'second' || activeName == 'third'">
              <el-input v-model="form.systemUnionid" maxlength="30"></el-input>
            </el-form-item>
            <el-form-item label="状态" v-if="activeName == 'second' || activeName == 'third'">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option
                  v-for="item in type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="彩种" v-if="activeName == 'second'">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option
                  v-for="item in type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="彩种" v-if="activeName == 'third'">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option
                  v-for="item in type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </i-form>
        </div>

      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="竞彩" name="first">
          <el-table
            ref="multipleTable"
            :data="competitiveData"
            tooltip-effect="dark"
            border
            style="width: 100%"
            @row-dblclick="rowClick">
            <el-table-column v-for="(item, index) in competitiveColumn"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              align="center">
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
              <template slot-scope="scope">
                <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看赛果</el-button>
                <el-button type="text" size="small">开售</el-button>
                <el-button type="text" size="small">停售</el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="数字彩" name="second">
          <el-table
            :data="digitalData"
            border
            style="width: 100%">
            <el-table-column v-for="(item, index) in digitalColumn"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              align="center">
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看赛果</el-button>
                <el-button type="text" size="small">开售</el-button>
                <el-button type="text" size="small">停售</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="高频彩" name="third">
          <el-table
            :data="highData"
            border
            style="width: 100%">
            <el-table-column v-for="(item, index) in digitalColumn"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              align="center">
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看赛果</el-button>
                <el-button type="text" size="small">开售</el-button>
                <el-button type="text" size="small">停售</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
        <el-pagination
          class="page"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="dataTotal">
        </el-pagination>
    </i-layout>
  </div>
</template>
<script>
import req from '../../api/match'
export default {
  data () {
    return {
      activeName: 'first',
      form: {
        matchUniqueId: '',
        matchType: '',
        stopSaleTime: '',
        createDate: '',
        outDate: '',
        type: '',
        status: '',
        memberName: '',
        mobile: '',
        regFrom: '',
        systemUnionid: ''
      },
      competitiveColumn: [
        {prop: 'matchUniqueId', label: '赛事编号', width: '220'},
        {prop: 'systemUnionid', label: '开售时间', width: '220'},
        {prop: 'stopSaleTime', label: '停售时间', width: '220'}
      ],
      competitiveData: [],
      digitalColumn: [
        {prop: 'matchUniqueId', label: '彩期', width: '160'},
        {prop: 'systemUnionid', label: '彩种', width: '100'},
        {prop: 'systemUnionid', label: '开售时间', width: '200'},
        {prop: 'stopSaleTime', label: '停售时间', width: '200'}
      ],
      digitalData: [],
      highData: [],
      competitiveType: [
        {value: '1', label: '足球'},
        {value: '2', label: '篮球'}
      ],
      type: [
        {value: '1', label: '竞彩'},
        {value: '2', label: '数字彩'},
        {value: '3', label: '高频彩'}
      ],
      species: [],
      status: [
        {value: '1', label: '未出票'},
        {value: '2', label: '出票中'},
        {value: '3', label: '已出票'},
        {value: '4', label: '已推送'},
        {value: '5', label: '推送失败'},
        {value: '6', label: '中奖'},
        {value: '7', label: '已兑奖'}
      ],
      pageIndex: 1,
      pageSize: 10,
      dataTotal: 0,
      searchFlag: false
      // loading: true
    }
  },
  created () {
    // if (localStorage.getItem('lastRouter') === '/member/user-basic-information') {
    //   this.dataTotal = JSON.parse(localStorage.getItem('page')).total
    //   this.pageIndex = JSON.parse(localStorage.getItem('page')).page
    // }
    this.getData()
  },
  methods: {
    getData () {
      this.searchFlag || Object.keys(this.form).map(key => {
        this.form[key] = ''
      })
      let nullFlag = false
      Object.keys(this.form).map(key => {
        this.form[key] !== '' && (nullFlag = true)
      })
      nullFlag || (this.searchFlag = false)
      let params = {
        ...this.form,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      req('getMatchList', params)
        .then(res => {
          if (res.code === '00000') {
            this.competitiveData = res.data.result
            this.dataTotal = res.data.totalCount
          } else {
            this.$message({
              type: 'error',
              message: res.msg
            })
          }
        })
    },
    search () {
      this.searchFlag = true
      this.pageIndex = 1
      this.getData()
    },
    empty () {
      Object.keys(this.form).map(key => {
        this.form[key] = ''
      })
      this.searchFlag = false
      this.pageIndex = 1
      this.getData()
    },
    // 双击行数据
    rowClick (row, event, column) {
      localStorage.setItem('page', JSON.stringify({page: this.pageIndex, total: this.dataTotal}))
      this.$router.push({name: '用户基本信息', params: {systemUnionId: row.systemUnionid}})
    },
    handleSizeChange () {

    },
    handleCurrentChange (val) {
      this.pageIndex = val
      this.getData()
    },
    handleClick (row) {

    }
  }
}
</script>
<style lang="less">
.match{
  .page{
    margin-top: 15px;
    margin-left: 100px;
  }
  // .el-pagination{
  //   text-align:center;
  //   margin-top:20px;
  // }
  .el-table{
    margin-top: 1px;
  }
  .el-tabs__nav{
    .el-tabs__item{
      width: 230px;
      text-align: center;
      background-color: #f4f4f4;
    }
    .is-active{
      width: 398px;
      background-color: #fff;
    }
  }
}
</style>
