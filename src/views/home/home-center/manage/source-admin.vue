<template>
  <div>
    <el-card v-loading="flag" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
      <bread-bits slot="header">
          <template slot="title">
            <span>素材管理</span>
          </template>
      </bread-bits>

        <!-- 上档次的上传图片 -->
        <el-button type="primary" @click="dialogTableVisible = true">上传图片</el-button>
        <el-dialog title="上传的图片" :visible.sync="dialogTableVisible">
          <el-row type="flex" justify="center">
            <el-card style="width: 200px;height: 200px;margin-bottom: 30px;">
              <img src="" alt="" width="300" height="400">
            </el-card>
          </el-row>
          <el-row type="flex">
            <p style="margin-right: 10px;">用户图片</p>
            <el-upload :http-request="uploadImg" :auto-upload="false" ref="upload" action="">
              <el-button slot="trigger" size="small" type="primary">选择图片</el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submit">上传图片</el-button>
            </el-upload>
          </el-row>
        </el-dialog>

        <!-- 档次比较低 -->
        <el-row type="flex" justify="end">
          <el-upload action="" multiple :http-request="uploadImg" :show-file-list="false">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-row>
        <el-tabs v-model="activeName" @tab-click="checkTab">
          <el-tab-pane label="全部图片" name="all"></el-tab-pane>
          <el-tab-pane label="收藏图片" name="collect"></el-tab-pane>
          <div class="all-img">
            <el-card v-for="(item, index) in list" :key="item.id" class="all-card">
              <img style="cursor: pointer;" :src="item.url" alt="" @click="openDialog(index)">
                <el-row class="ele_btn" type="flex" justify="space-around">
                  <span :style="{color: item.is_collected ? 'red' : '#666'}" @click="collectClick(item)" class="el-icon-star-on"></span>
                  <span class="el-icon-delete" @click="delImg(item.id)"></span>
                </el-row>
            </el-card>
          </div>
          <el-row type="flex" justify="center" style="margin-top: 20px;">
            <el-pagination @current-change="pageChange" :page-size="page.pageSize" :current-page="page.currPage" background layout="prev, pager, next" :total="page.total"></el-pagination>
          </el-row>
        </el-tabs>
        <el-dialog @opened="opeEnd" :visible="dialogShow" @close="closeDialog">
          <el-carousel ref="dialog" indicator-position="outside">
            <el-carousel-item v-for="(item, index) in list" :key="index">
              <img class="bigImg" :src="item.url" alt="">
            </el-carousel-item>
          </el-carousel>
        </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { uploadUserImage, deleteUserImage } from '../../../../axios/index.js'
export default {
  data () {
    return {
      dialogTableVisible: false,
      activeName: 'all',
      list: [],
      page: {
        pageSize: 9,
        currPage: 1,
        total: 0
      },
      flag: false,
      dialogShow: false,
      imgIndex: null
    }
  },

  methods: {
    submit () {
      // 调用submit方法上传选中列表中的图片
      this.$refs.upload.submit()
    },
    // 上图用户图片素材
    async uploadImg (params) {
      let fd = new FormData()
      fd.set('image', params.file)
      await uploadUserImage('post', fd)
      this.getImgData()
    },

    // 删除素材
    async delImg (id) {
      await this.$confirm('您确定要删除这条评论吗？')
      await deleteUserImage('delete', id)
      this.getImgData()
    },

    // 切换页面的事件
    pageChange (currPage) {
      this.page.currPage = currPage
      this.getImgData()
    },

    async getImgData () {
      this.flag = true
      let params = {
        // 为false的话返回所有的图片数据，为true的话返回收藏的图片数据
        // 若果activeName === collect说明是收藏图片的tab栏此时返回的是true，为true返回的就是
        // 收藏的图片，否则为false返回的就是全部的图片
        collect: this.activeName === 'collect',
        page: this.page.currPage,
        per_page: this.page.pageSize
      }
      let result = await uploadUserImage('get', null, params)
      // 获取到图片的总数
      this.page.total = result.data.total_count
      // 将获取到的图片信息数据赋值给定义的数组
      this.list = result.data.results

      setTimeout(() => {
        this.flag = false
      }, 300)
    },

    checkTab () {
      this.page.currPage = 1
      this.getImgData()
    },
    async collectClick (item) {
      let data = {
        // 如果图片是收藏的那么状态是true，那么点击的时候肯定要取消收藏，所有需要取反
        collect: !item.is_collected
      }
      // 设置收藏图片，需要将收藏的图片的id传递过去，还要将状态以body形式传递过去
      await deleteUserImage('put', item.id, data)
      this.getImgData()
    },

    openDialog (index) {
      this.dialogShow = true
      this.imgIndex = index
    },

    closeDialog () {
      this.dialogShow = false
    },

    opeEnd () {
      this.$refs.dialog.setActiveItem(this.imgIndex)
    }
  },

  created () {
    this.getImgData()
  }
}
</script>

<style lang="less" scoped>

  .all-img{
    display: flex;
    flex-wrap: wrap;
    .all-card {
      width: 200px;
      height: 200px;
      margin: 30px 70px;
      position: relative;
      img {
        width: 100%;
        height: 130px;
      }
    }
    .ele_btn {

      font-size: 22px;
      width: 100%;
      height: 30px;
      background-color: #f4f5f6;
      position: absolute;
      left: 0;
      bottom: 0;
      padding-top: 6px;
      span {
        cursor: pointer;
      }
    }
  }
  .bigImg {

    width: 100%;
    height: 100%;
  }
</style>
