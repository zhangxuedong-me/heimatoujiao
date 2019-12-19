<template>
  <div>
      <el-row class="header-title" type="flex" align="middle">
          <el-col :span="12">
              <span class="el-icon-tickets"></span>
              <span style="padding-left: 6px;">江苏传智播客教育科技股份有限公司</span>
          </el-col>
          <el-col :span="12" class="right">
              <el-row type="flex" justify="end" align="middle">
                  <img src="../assets/img/avatar.jpg" alt="">

                  <el-dropdown :hide-on-click="true" trigger="click">
                    <span class="el-dropdown-link">
                        个人中心<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人信息</el-dropdown-item>
                        <el-dropdown-item>git地址</el-dropdown-item>
                        <el-dropdown-item divided>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
              </el-row>
          </el-col>
      </el-row>
  </div>
</template>

<script>
export default {

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
