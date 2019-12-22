<template>
  <el-card v-loading="load" element-loading-background="rgba(0, 0, 0, 0.8)" element-loading-spinner="el-icon-loading" element-loading-text="拼命加载中" style="margin-top: 20px;" layout="prev, pager, next">
    <bread-bits slot="header">
      <template slot="title">评论管理</template>
    </bread-bits>
    <!-- 表格通过data属性来绑定数据，列表项通过prop属性来绑定字段，这要可以让数据显示到表格中 -->
    <el-table :data="infoList">
      <el-table-column prop="title" width="600" label="标题"></el-table-column>

      <!-- formatter是一个属性绑定一个方法，定义的方法接收4个参数 row, column, cellValue, store   最后将处理好的值返回-->
      <el-table-column :formatter="formatterBoolean" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">

        <!-- 通过slot-scope可以获取行内的数据 -->
        <template slot-scope="obj">
          <el-button size="small" type="text">修改</el-button>
          <el-button @click="openOrclose(obj.row)" size="small" type="text">{{obj.row.comment_status ? "关闭评论" : "打开评论"}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center">
      <el-pagination @current-change="pageChange" background :current-page="page.currentPage" :page-size="page.pageSize" :total="page.total"></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      infoList: [],
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      load: false
    }
  },
  created () {
    this.getCommontData()
  },
  methods: {

    // 每点击一页，将当前页赋值给请求的页数，去请求该页
    pageChange (newPage) {
      this.page.currentPage = newPage

      // 重新获取点击页面的数据
      this.getCommontData()
    },

    getCommontData () {
      this.load = true
      // 发送请求获取评论数据
      this.$http({

        url: 'articles',
        method: 'get',
        params: {

          // 指定获取评论数据
          response_type: 'comment',
          page: this.page.currentPage,
          per_page: this.page.pageSize

        }
      }).then(result => {
        this.infoList = result.data.results

        // 先获取到总页码数
        this.page.total = result.data.total_count
        setTimeout(() => {
          this.load = false
        }, 300)
      })
    },

    formatterBoolean (row, column, cellValue, store) {
      return cellValue ? '正常' : '关闭'
    },

    openOrclose (obj) {
      // 点击按钮之后判断状态，如果当前状态打开的话，就显示关闭，如果是关闭就显示打开
      let msg = obj.comment_status ? '关闭' : '打开'
      this.$confirm(`真的要${msg}评论吗`).then(() => {
        this.$http({
          url: 'comments/status',
          method: 'put',
          params: {

            // 使用第三方插件解决后的id是数值类型的，如果要字符串类型的需要转换一下
            article_id: obj.id.toString()
          },
          data: {
            allow_comment: !obj.comment_status
          }
        }).then(result => {
          // 请求成功之后再次调用函数，重新获取数据
          this.getCommontData()
        })
      })
    }
  }
}
</script>

<style>

</style>
