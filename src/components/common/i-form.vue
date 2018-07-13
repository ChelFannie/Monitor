<template>
  <div class="i-form">
      <el-form ref="form" label-width="100px" size="mini" @keydown.native.enter="search">
        <el-row>
            <el-col :span="20">
                <div class="grid-content bg-purple">
                    <slot></slot>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple-light">
                    <el-button type="primary" @click="empty" size="small">清空</el-button>
                    <el-button type="primary" @click="search" size="small">搜索</el-button>
                </div>
            </el-col>
        </el-row>
      </el-form>
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
  mounted () {
  },
  methods: {
    search () {
      this.$emit('search')
    },
    empty () {
      this.$emit('empty')
    }
  }
}
</script>
<style lang="less">
.i-form{
    .el-form-item {
        float: left;
        margin-left: 10px;
        .el-input {
            width: 180px !important;
        }
    }
    .grid-content {
        .el-button:last-child {
            margin-top: 30px;
            margin-left: 20px;
        }
        // .el-button+.el-button {
        //     margin-left: 0;
        // }
    }
}
</style>
