<template>
  <div>
    <el-container>
      <el-aside style="width: 230px;height:100vh;background-color:#353b4e;">
        <layout-aside></layout-aside>
      </el-aside>

      <el-container>

        <el-header>
          <layout-header></layout-header>
        </el-header>

        <el-main>
          <!-- 中间需要路由的部分 -->
          <router-view></router-view>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {

  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>

</style>
