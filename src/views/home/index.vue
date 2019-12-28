<template>
  <div>
    <el-container>
      <el-aside :style="foldOrOpen ? 'width: 88px;' : 'width: 230px;'" style="transition: all 0.5s;min-height:100vh;background-color:#353b4e;">
        <layout-aside :flag="foldOrOpen"></layout-aside>
      </el-aside>

      <el-container>
        <el-header>
          <layout-header></layout-header>
        </el-header>

        <el-main>
          <!-- 中间需要路由的部分 -->
          <transition name="el-fade-in-linear">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import EventBus from '../../utils/EventBus.js'
export default {
  data () {
    return {
      foldOrOpen: false
    }
  },

  mounted () {
    EventBus.$on('btnChange', () => {
      this.foldOrOpen = !this.foldOrOpen
    })
  }
}
</script>

<style lang="less" scoped>
</style>
