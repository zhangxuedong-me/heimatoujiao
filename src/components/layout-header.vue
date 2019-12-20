<template>
  <div>
      <el-row class="header-title" type="flex" align="middle">
          <el-col :span="12">
              <span class="el-icon-tickets"></span>
              <span style="padding-left: 6px;">江苏传智播客教育科技股份有限公司</span>
          </el-col>
          <el-col :span="12" class="right">
              <el-row type="flex" justify="end" align="middle">

                  <!-- 使用表达式判断，如果对象中没有请求到用户的头像使用默认的头像 -->
                  <!-- 注意：如果src使用的是字符串的话可以正常解析，
                        但是一旦用到了变量格式的路径的话，那么使用三元表达式的时候，
                        如果想使用第二个url路径的话，那么也必须是一个变量，使用require的方式
                        导入图片，称为属性url的值
                   -->
                  <img :src="infoData.photo ? infoData.photo: imgSrc" alt="">

                    <!-- trigger="click"是以点击时形式来显示， @command="menvClick"给菜单项
                        注册单机事件
                    -->
                  <el-dropdown trigger="click" @command="menvClick">
                    <span class="el-dropdown-link">
                        {{ infoData.name }}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="userMsg">个人信息</el-dropdown-item>
                        <el-dropdown-item command="gitUrl">git地址</el-dropdown-item>
                        <el-dropdown-item command="edit" divided>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
              </el-row>
          </el-col>
      </el-row>
  </div>
</template>

<script>
export default {

  data () {
    return {

      // 先将一个图片转换成了一个变量
      imgSrc: require('../assets/img/avatar.jpg'),
      infoData: {}
    }
  },
  methods: {
    menvClick (command) {
      // 判断如果是点击git按钮的话，跳转到git地址去
      // 如果是退出按钮的话删除token令牌，并且返回到登录页面
      if (command === 'gitUrl') {
        window.location.href = 'https://github.com/zhangxuedong-me/heimatoujiao'
      } else if (command === 'edit') {
        this.$router.go(-1)
        window.localStorage.removeItem('token-item')
      }
    }
  },

  created () {
    // 获取用户的token
    let token = window.localStorage.getItem('token-item')

    // 页面一初始化完毕先获取用户的资料
    this.$http({
      url: 'user/profile',
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(result => {
      this.infoData = result.data.data
    })
  }
}
</script>

<style lang="less" scoped>
    .header-title {

        height: 50px;
        font-size: 14px;
        .el-icon-tickets {

            font-size: 20px;

        }
       .right {
           cursor: pointer;
            img {

                height: 40px;
                border-radius: 50%;
                margin-right: 20px;
            }
       }
    }
</style>
