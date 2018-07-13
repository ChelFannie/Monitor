<template>
  <div class="order-List">
    <i-layout :gray="true">
      <div slot="grayLayout">
          <i-form @search="search" @empty="empty">
            <el-form-item label="创建时间">
              <el-date-picker
                v-model="form.createDate"
                type="datetime"
                placeholder="选择日期"
                value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="出票时间">
              <el-date-picker
                v-model="form.outDate"
                type="datetime"
                placeholder="选择日期"
                value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="form.type" placeholder="请选择" @change="typeSelect">
                <el-option
                  v-for="item in type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="彩种">
              <el-select v-model="form.regFrom" placeholder="请选择">
                <el-option
                  v-for="item in species"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="订单状态">
              <el-select v-model="form.status" placeholder="请选择">
                <el-option
                  v-for="item in status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="渠道">
              <el-select v-model="form.regFrom" placeholder="请选择">
                <el-option
                  v-for="item in regFromOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备编号">
              <el-select v-model="form.regFrom" placeholder="请选择">
                <el-option
                  v-for="item in regFromOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="渠道自编号">
              <el-input v-model="form.systemUnionid" maxlength="30"></el-input>
            </el-form-item>
          </i-form>
        </div>
        <div slot="tableHead">
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          border
          style="width: 100%"
          @row-dblclick="rowClick">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column v-for="(item, index) in tableColumn"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            align="center">
          </el-table-column>
        </el-table>
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
import address from '../../assets/address.js'
export default {
  data () {
    return {
      form: {
        createDate: '',
        outDate: '',
        type: '',
        status: '',
        memberName: '',
        mobile: '',
        regFrom: '',
        systemUnionid: '',
        registeTimeBegin: '',
        registeTimeEnd: ''
        // realName: ''
      },
      tableColumn: [
        {prop: 'memberName', label: '系统编号', width: '220'},
        {prop: 'systemUnionid', label: '类型', width: '220'},
        {prop: 'dataTime', label: '名称', width: '120'},
        {prop: 'mobile', label: '状态', width: '120'},
        {prop: 'regFrom', label: '金额', width: '120'},
        {prop: 'status', label: '奖金', width: '120'}
      ],
      regFromOptions: [
        {value: '1', label: '中石化'},
        {value: '2', label: '自营'}
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
      competitiveSpecies: [
        {value: '1', label: '竞彩足球胜平负'},
        {value: '2', label: '竞彩足球比分'},
        {value: '3', label: '竞彩足球总进球'},
        {value: '4', label: '竞彩足球半全场'},
        {value: '5', label: '竞彩足球上下盘单双'},
        {value: '6', label: '竞彩足球让球胜平负'},
        {value: '7', label: '竞彩足球大小球'},
        {value: '8', label: '竞彩足球混合过关'},
        {value: '9', label: '竞彩篮球让分胜负'},
        {value: '10', label: '竞彩篮球胜负'},
        {value: '11', label: '竞彩篮球胜分差'},
        {value: '12', label: '竞彩篮球大小分'}
      ],
      digitalSpecies: [
        {value: '1', label: '大乐透'},
        {value: '2', label: '排列3'},
        {value: '3', label: '排列5'},
        {value: '4', label: '七星彩'}
      ],
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      dataTotal: 0,
      searchFlag: false,
      // 地区数据
      options: address,
      // 默认地区编码
      selectedOptions: [],
      // 勾选行数据
      selection: []
      // loading: true
    }
  },
  created () {
    if (localStorage.getItem('lastRouter') === '/member/user-basic-information') {
      this.dataTotal = JSON.parse(localStorage.getItem('page')).total
      this.pageIndex = JSON.parse(localStorage.getItem('page')).page
    }
    // this.getData()
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
      // let memberParams = {
      //   ...this.form,
      //   pageIndex: this.pageIndex,
      //   pageSize: this.pageSize
      // }
      // this.$ajax.post('/memberManage/getMemberListPage.json', memberParams)
      // req('getMemberListData', memberParams)
      //   .then(res => {
      //     if (res.data.code === '00000') {
      //     } else {
      //       this.$message({
      //         type: 'error',
      //         message: res.data.msg
      //       })
      //     }
      //   })
    },
    search () {
      console.log(this.form)
      // this.searchFlag = true
      // this.getData()
    },
    empty () {
      Object.keys(this.form).map(key => {
        this.form[key] = ''
      })
      this.searchFlag = false
      this.page = 1
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
    // 得到地区三级联动数据
    handleChange (value) {
      // console.log(this.selectedOptions)
    },
    // 类型选中
    typeSelect (val) {
      switch (val) {
        case '1':
          this.species = this.competitiveSpecies
          break
        case '2':
          this.species = this.digitalSpecies
          break
        default:
          break
      }
    }
  }
}
</script>
<style lang="less" scoped>
.order-List{
  .page{
    margin-top: 15px;
    margin-left: 100px;
  }
  .el-pagination{
    text-align:center;
    margin-top:20px;
  }
  .img{
    text-align: center;
  }
  img{
    width: 120px;
    height: 130px;
  }
  .uploadBtn{
    margin-top: 10px;
  }
}
</style>
