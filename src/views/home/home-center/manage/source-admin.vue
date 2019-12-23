<template>
  <div>
    <el-card>
      <bread-bits slot="header">
          <template slot="title">
            <span>素材管理</span>
          </template>
      </bread-bits>
        <el-tabs v-model="activeName" @tab-click="checkTab">
          <el-tab-pane label="全部图片" name="all"></el-tab-pane>
          <el-tab-pane label="收藏图片" name="collect"></el-tab-pane>
          <div class="all-img">
            <el-card v-for="item in list" :key="item.id" class="all-card">
              <img :src="item.url" alt="">
                <el-row class="ele_btn" type="flex" justify="space-around">
                  <span :style="{color: item.is_collected ? 'red' : '#666'}" @click="collectClick(item)" class="el-icon-star-on"></span>
                  <span class="el-icon-delete"></span>
                </el-row>
            </el-card>
          </div>
          <el-row type="flex" justify="center" style="margin-top: 20px;">
            <el-pagination @current-change="pageChange" :page-size="page.pageSize" :current-page="page.currPage" background layout="prev, pager, next" :total="page.total"></el-pagination>
          </el-row>
        </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        pageSize: 9,
        currPage: 1,
        total: 0
      }
    }
  },

  created () {
    this.getImgData()
  },
  methods: {
    pageChange (currPage) {
      this.page.currPage = currPage
      this.getImgData()
    },
    getImgData () {
      this.$http({

        url: 'user/images',
        method: 'get',
        params: {

          // 为false的话返回所有的图片数据，为true的话返回收藏的图片数据
          // 若果activeName === collect说明是收藏图片的tab栏此时返回的是true，为true返回的就是
          // 收藏的图片，否则为false返回的就是全部的图片
          collect: this.activeName === 'collect',
          page: this.page.currPage,
          per_page: this.page.pageSize

        }
      }).then(result => {
        // 获取到图片的总数
        this.page.total = result.data.total_count
        // 将获取到的图片信息数据赋值给定义的数组
        this.list = result.data.results
      })
    },

    checkTab () {
      this.page.currPage = 1
      this.getImgData()
    },
    collectClick (item) {
      // 设置收藏图片，需要将收藏的图片的id传递过去，还要将状态以body形式传递过去
      this.$http({
        url: `user/images/${item.id}`,
        method: 'put',
        data: {

          // 如果图片是收藏的那么状态是true，那么点击的时候肯定要取消收藏，所有需要取反
          collect: !item.is_collected
        }
      }).then(result => {
        this.getImgData()
      })
    }
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
</style>
