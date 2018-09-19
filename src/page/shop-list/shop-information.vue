<template>
  <div class="shop-information">
    <div class="top">店铺信息 <el-button class="return" size="medium" type="primary" @click="goBack">返回</el-button></div>
    <el-form :inline="true" label-width="100px" size="mini" class="basic">
      <el-form-item label="店铺名称">
        <el-input v-model="form.systemUnionid" disabled></el-input>
      </el-form-item>
      <el-form-item label="彩类">
        <el-checkbox-group v-model="form.checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox disabled v-for="city in form.cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="归属地">
        <el-input v-model="form.address" disabled></el-input>
      </el-form-item>
      <el-form-item label="单票金额">
        <el-input v-model="form.singleAmountStart" disabled></el-input>
        <span> —— </span>
        <el-input v-model="form.singleAmountEnd" disabled></el-input>
      </el-form-item>
      <el-form-item label="出票限额">
        <el-input v-model="form.limitAmount" disabled></el-input>
      </el-form-item>
      <el-form-item label="设备数">
        <el-input v-model="form.equipmentNum" disabled></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status" placeholder="请选择" disabled >
          <el-option
            v-for="item in status"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="店铺分点">
        <el-input v-model="form.shopBranch" disabled></el-input>
      </el-form-item>
    </el-form>
    <el-form class="location" :inline="true">
      <el-form-item label="名称">
        <el-input v-model="formInfor.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="formInfor.address" disabled></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="formInfor.tel" disabled></el-input>
      </el-form-item>
      <el-form-item label="网点编号">
        <el-input v-model="formInfor.number" disabled></el-input>
      </el-form-item>
      <el-form-item label="在线设备">
        <el-input v-model="formInfor.equipment" disabled></el-input>
      </el-form-item>
    </el-form>
    <div class="equipment">
      <div class="detail" v-for="(item, index) in equipmentData" :key="index">
        <div class="equipment-top">
          <span>{{item.equipmentTop}}</span>
        </div>
        <div class="explain">
          <div>
            <span class="left-word">编&nbsp;&nbsp;&nbsp;&nbsp;号:</span>
            <span class="num">{{item.terminalCode}}</span>
          </div>
          <div>
            <span class="left-word">状&nbsp;&nbsp;&nbsp;&nbsp;态:</span>
            <span class="num" v-if="item.statusFlag">{{item.terminalStatus}}</span>
            <el-select v-model="item.terminalStatus" v-if="!item.statusFlag"  placeholder="请选择">
              <el-option
                v-for="item in statusOther"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div>
            <span class="left-word">订单号:</span>
            <span class="num">{{item.orderId}}</span>
          </div>
        </div>
        <el-button type="primary" v-if="!item.statusFlag" @click="saveStatus(item)">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import req from '../../api/shop-list'
export default {
  data () {
    return {
      form: {
        systemUnionid: '',
        checkedCities: ['竞彩', '数字彩', '高频彩'],
        cities: ['竞彩', '数字彩', '高频彩'],
        address: '河南省郑州市中原区',
        singleAmountStart: 2,
        singleAmountEnd: 100,
        limitAmount: 10000,
        equipmentNum: 3,
        status: '',
        shopBranch: 5
      },
      isIndeterminate: true,
      type: [
        {value: '1', label: '竞彩'},
        {value: '2', label: '数字彩'},
        {value: '3', label: '高频彩'}
      ],
      status: [
        {value: '0', label: '未激活'},
        {value: '1', label: '离线'},
        {value: '2', label: '准备'},
        {value: '3', label: '工作'},
        {value: '4', label: '扫码'},
        {value: '5', label: '分配'},
        {value: '6', label: '反馈'},
        {value: '7', label: '未知'},
        {value: '8', label: '停用'},
        {value: '9', label: '异常'},
        {value: '10', label: '兑奖'}
      ],
      statusOther: [
        {value: 3, label: '工作'},
        {value: 6, label: '反馈'}
      ],
      formInfor: {
        name: '名称',
        address: '地址',
        tel: '联系电话',
        number: '网点编号',
        equipment: '在线设备'
      },
      selectList: '',
      equipmentData: [],
      storeCode: ''
    }
  },
  created () {
    if (this.$route.params.storeCode) {
      this.storeCode = this.$route.params.storeCode
      localStorage.setItem('storeCode', this.$route.params.storeCode)
    } else {
      this.storeCode = localStorage.getItem('storeCode')
    }
    this.getData()
  },
  methods: {
    getData () {
      req('getStoreDetail', {storeCode: this.storeCode})
        .then(res => {
          if (res.code === '00000') {
            res.data.machines.map(val => {
              val['statusFlag'] = true
              switch (val.terminalStatus) {
                case 0:
                  val.terminalStatus = '未激活'
                  break
                case 1:
                  val.terminalStatus = '离线'
                  break
                case 2:
                  val.terminalStatus = '准备'
                  break
                case 3:
                  val.terminalStatus = '工作'
                  break
                case 4:
                  val.terminalStatus = '扫码'
                  break
                case 5:
                  val.terminalStatus = '分配'
                  break
                case 6:
                  val['statusFlag'] = false
                  break
                case 7:
                  val.terminalStatus = '未知'
                  break
                case 8:
                  val.terminalStatus = '停用'
                  break
                case 9:
                  val.terminalStatus = '异常'
                  break
                case 10:
                  val.terminalStatus = '兑奖'
                  break
                default:
                  break
              }
            })
            this.equipmentData = res.data.machines
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
          console.log(res)
        })
    },
    saveStatus (item) {
      req('changeMachineStatus', {terminalCode: item.terminalCode, terminalStatus: item.terminalStatus})
        .then(res => {
          if (res.code === '00000') {
            this.$message({
              type: 'success',
              message: '保存成功'
            })
            this.getData()
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
    },
    handleCheckedCitiesChange () {},
    goBack () {
      this.$router.push({name: '商铺列表'})
    }
  }
}
</script>
<style lang="less">
.shop-information{
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
  .basic{
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    border: 1px solid #f4f4f4;
    padding-top: 10px;
    margin-bottom: 10px;
    .el-form-item{
      float: left;
       margin-bottom: 15px;
      .el-input {
        width: 180px !important;
      }
    }
    .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
      background-color: #409EFF;
      border-color: #409EFF;
    }
  }
  .location{
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    border: 1px solid #f4f4f4;
    padding-top: 10px;
    .el-form-item{
      float: left;
      width: 100%;
      margin-left: 10px;
      margin-bottom: 15px;
      .el-form-item__label{
        width: 10%;;
      }
      .el-form-item__content{
        width: 75%;
        .el-input{
          width: 100%;
        }
      }
    }
  }
  .equipment{
    font-size: 14px;
    color: #606266;
    width: 900px;
    box-sizing: border-box;
    padding: 5px 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    .detail{
      width: 288px;
      height: 380px;
      border: 1px solid #eaeaea;
      box-sizing: border-box;
      padding: 5px;
      margin-bottom: 100px;
      margin-left: 10px;
      .equipment-top{
        display: flex;
        justify-content: center;
        span{
          width: 100px;
          height: 200px;
          background-color: #444444;
        }
      }
      .explain{
        margin-top: 10px;
        >div{
          padding: 5px 0;
        }
        span.left-word{
          display: inline-block;
          // width: 60px;
          text-align: left;
          margin-right: 3px;
        }
      }
      .el-button{
        width: 60%;
        margin-left: 55px;
        margin-top: 10px;
      }
    }
  }
}
</style>
