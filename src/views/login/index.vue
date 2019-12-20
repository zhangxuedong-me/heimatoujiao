<template>
  <div class="login">
      <el-card class="box-card">
        <h1 class="title">
            <img src="../../assets/img/logo_index.png" alt="">
        </h1>

        <!-- 给form表单元素通过:model属性绑定需要验证的数据，通过:rules属性绑定需要验证的规则 -->
        <el-form ref="myForm" :model="loginForm" :rules="loginRules">

            <!-- 通过prop属性验证需要验证的每一个字段 -->
            <el-form-item prop="mobile">

                <!-- 给input按钮设置数据的双向绑定，收集数据 -->
                <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-input v-model="loginForm.code" style="width: 70%;" placeholder="请输入验证码"></el-input>
                <el-button class="login-btn" style="width: 20%; float: right;" plain>发送验证码</el-button>
            </el-form-item>
            <el-form-item prop="flag">
                <el-checkbox v-model="loginForm.flag">我已阅读并同意用户协议和隐私条款</el-checkbox>
            </el-form-item>
            <el-form-item>
                 <el-button @click="isData" class="login-submit" type="primary">登录</el-button>
            </el-form-item>
        </el-form>
      </el-card>
  </div>
</template>

<script>
export default {

  data () {
    return {

      // 定义要验证的数据
      loginForm: {

        mobile: '',
        code: '',
        flag: false
      },

      // 要验证的规则
      loginRules: {

        // 要验证data中的那个属性，就定义那个属性，必须是一个数组，
        // 因为要验证的规则可能会有很多
        mobile: [

          // require如果设置为true的话，就是必须填的字段，如果不填的话，
          // 就指向message属性的值
          { required: true, message: '请输入手机号' },

          // pattern：属性也是匹配规则，接收一个正则表达式的匹配，如果匹配失败，
          // 也执行message后面的语句
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' }
        ],
        code: [

          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码' }
        ],
        flag: [

          // validator是固定的，自定义验证函数来验证，第一个参数是验证规则，
          // 第二个参数是要验证的值，第三参数是回调函数，必须调用，否则该函数无法执行
          { validator (rule, value, callback) {
            value ? callback() : callback(new Error('请勾选协议'))
          } }
        ]
      }
    }
  },
  methods: {
    isData () {
      // 获取表单元素验证是否通过，validate是一个方法第一个参数是验证成功，第二个参数是一个对象，是没有验证成功的字段
      // 第一个参数会返回boolean类型的值，成功为true，否则为false
      this.$refs.myForm.validate((isOk, obj) => {
        if (isOk) {
          // 发送请求判断用户输入的手机号和密码是否正确
          this.$http({

            url: 'authorizations',
            data: this.loginForm,
            method: 'post'
          }).then(result => {
            // 本地存储token，每次登陆的时候携带过去
            window.localStorage.setItem('token-item', result.data.data.token)

            // 跳转到主页免去
            this.$router.push('/home')
          }).catch(() => {
            setTimeout(() => {
              this.$message({
                message: '请输入正确的手机号或者验证码',
                type: 'warning'
              })
            }, 500)
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

    .login {

        height: 100vh;
        background: url('../../assets/img/beijin.jpg') no-repeat;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;

        .box-card {

            width: 440px;
            height: 360px;

            .title {
                margin: 0;
                padding: 0;
                margin-bottom: 20px;
                text-align: center;

                 img {

                    height: 40px;
                }
            }
            .login-btn {

                padding: 0;
                font-size: 14px;
                height: 40px;
            }
            .login-submit {

                width: 100%;
            }
        }
    }
</style>
