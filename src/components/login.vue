<template>
  <div class="login">
      <div class="content">
          <div class="loginCon">
            <p class="title">分布式监控平台</p>
            <el-form ref="form" :model="form" label-width="80px" class="form">
                <el-form-item>
                    <el-input class="user" v-model="form.userName" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input class="pass" type="password" v-model="form.pwd" placeholder="密码"></el-input>
                </el-form-item>
                <div class="code">
                  <el-form-item>
                      <el-input class="left" v-model="inputCode" placeholder="验证码"></el-input>
                  </el-form-item>
                  <div @click="createCode" class="right">{{validateCode}}</div>
                </div>
            </el-form>
            <el-button type="primary" size="medium" class="btn" @click="login">登录</el-button>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  created () {
    this.createCode()
  },
  data () {
    return {
      form: {
        userName: '',
        pwd: ''
      },
      validateCode: '',
      inputCode: '',
      validateFlag: false
    }
  },
  methods: {
    login () {
      this.validate()
      if (this.validateFlag) {
        if (this.form.userName === 'admin' && this.form.pwd === '123') {
          sessionStorage.setItem('token', 'token')
          this.$store.commit('token', 'token')
          this.$router.push({path: '/'})
        } else {
          this.$message({
            message: '用户名或密码错误!',
            type: 'warning'
          })
          // 刷新验证码
          this.createCode()
        }
      }
    },
    createCode () {
      let code = ''
      let codeLength = 4
      let random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      for (let i = 0; i < codeLength; i++) {
        let index = Math.floor(Math.random() * 36)
        code += random[index]
      }
      this.validateCode = code
    },
    validate () {
      this.inputCode = this.inputCode.toUpperCase()
      if (this.inputCode.length <= 0) {
        this.$message({
          message: '请输入验证码！',
          type: 'warning'
        })
      } else if (this.inputCode !== this.validateCode) {
        this.$message({
          message: '验证码输入错误！',
          type: 'warning'
        })
        // 刷新验证码
        this.createCode()
        // 清空文本框
        this.inputCode = ''
      } else {
        this.validateFlag = true
      }
    }
  }
}
</script>
<style lang="less">
.login{
    width: 100%;
    height: 100%;
    .content{
        width: 100%;
        height: 100%;
        margin: 0 auto;
        background-image: url('../assets/image/login.png');
        background-size:100% 100%;
        color: red;
        position: relative;
        .loginCon{
            width: 500px;
            height: 360px;
            background:rgba(255, 255, 255, .3);
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            text-align: center;
            .title{
              height: 50px;
              line-height: 50px;
              font-size: 38px;
              letter-spacing: 3px;
              color: #ffffff;
              text-align: center;
              position: absolute;
              left: 0;
              right: 0;
              top: -60px;
              margin: auto;
            }
            .form{
              margin: 40px auto;
              .el-form-item__content{
                margin: 0!important;
                text-align: center;
                .el-input{
                  input{
                    width: 320px;
                    height: 50px;
                    padding-left: 50px;
                    background: transparent;
                    color: #ffffff;
                  }
                  &.user:before{
                    content:'';
                    display:inline-block;
                    width:25px;
                    height:25px;
                    background:url('../assets/image/user.png');
                    background-size:100% 100%;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    margin-left:10px;
                  }
                  &.pass:before{
                    content:'';
                    display:inline-block;
                    width:20px;
                    height:25px;
                    background:url('../assets/image/pass.png');
                    background-size:100% 100%;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    margin-left:10px;
                  }
                }
              }
              .code{
                width: 320px;
                display: inline-block;
                overflow: hidden;
                .el-form-item{
                  width: 200px;
                  float: left;
                  margin-bottom: 0;
                  .left{
                    input{
                      width: 200px;
                      padding-left: 10px;
                    }
                  }
                }
                .right{
                  float: right;
                  width: 100px;
                  height: 50px;
                  line-height: 50px;
                  background: #409EFF;
                  color: #fff;
                  letter-spacing: 6px;
                  cursor:pointer;
                }
              }
            }
            .btn{
              width: 200px;
              height: 40px;
            }
        }
    }
}
</style>
