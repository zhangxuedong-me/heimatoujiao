<template>
  <div class="cover-image">
      <!-- 显示选中的图片区域 -->
      <div @click="openDialog(index)" class="cover-image-item" v-for="(item, index) in imgsList" :key="index">
          <img :src="item ? item : defaultUrl " alt="">
      </div>
      <!-- 弹层区域 -->
      <el-dialog width="50%" @close="closeDialog" title="请选择图片" :visible="show">
        <upload-image  @imgurl="getUrl"></upload-image>
      </el-dialog>
  </div>
</template>

<script>
export default {

  // 接收传过来的图片数组
  props: ['imgsList'],
  data () {
    return {
      defaultUrl: require('../assets/img/pic_bg.png'),
      show: false,
      url: '',
      index: 0
    }
  },

  methods: {

    openDialog (index) {
      this.show = true
      this.index = index
    },
    closeDialog () {
      this.show = false
    },

    // 选择图片素材穿的值和上传传递的值用同一个方法
    getUrl (url) {
      if (url) {
        this.$emit('imgUrl', url, this.index)
      }
      this.closeDialog()
    }

  }
}
</script>

<style lang="less" scoped>
    .cover-image {
        margin: 20px 100px;
        display: flex;
        .cover-image-item {
            width: 200px;
            height: 200px;
            border: #ccc solid 1px;
            margin-left: 10px;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
