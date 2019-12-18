<template>
  <div class="login">
      <el-card class="box-card">
        <h1 class="title">
            <img src="../../assets/img/logo_index.png" alt="">
        </h1>
        <el-form ref="form">
            <el-form-item>
                <el-input placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input style="width: 70%;" placeholder="请输入验证码"></el-input>
                <el-button class="login-btn" style="width: 20%; float: right;" plain>发送验证码</el-button>
            </el-form-item>
            <el-form-item>
                <el-checkbox>我已阅读并同意用户协议和隐私条款</el-checkbox>
            </el-form-item>
            <el-form-item>
                 <el-button class="login-submit" type="primary">登录</el-button>
            </el-form-item>
        </el-form>
      </el-card>
  </div>
</template>

<script>
export default {

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
