<template>
  <div>
    <el-card>
      <bread-bits slot="header">
        <template slot="title">
          <span>内容列表</span>
        </template>
      </bread-bits>
      <div class="article_status">
        <el-form class="myFrom">
          <el-form-item label="文章状态">
            <el-radio-group v-model="formInfo.status" >
              <el-radio :label="5">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">待审核</el-radio>
              <el-radio :label="2">审核通过</el-radio>
              <el-radio :label="3">审核失败</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道列表">
             <el-select v-model="formInfo.channel" placeholder="请选择">
               <el-option v-for="item in channelData" :key="item.id" :value="item.id" :label="item.name"></el-option>
             </el-select>
          </el-form-item>
          <el-form-item label="时间选择">

            <!--  value-format：属性设置日期的格式 -->
            <el-date-picker value-format="yyyy-MM-dd" v-model="formInfo.date" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </el-form-item>
        </el-form>
        <div class="article-item">
          <p>共找到62312条符合条件的内容</p>
        </div>
        <div class="article-content" v-for="item in articleData" :key="item.id.toString()">
         <div class="article-content-right">
            <img :src="item.cover.images.length ? item.cover.images[0] : imgUrl" alt="">
            <div class="info">
              <span>{{ item.title }}</span>
              <el-tag :type="item.status | filterTagType" style="width: 60px;">{{ item.status | filterStatus }}</el-tag>
              <span>{{ item.pubdate }}</span>
            </div>
         </div>
          <div class="article-content-left">
            <i class="el-icon-edit" @click="modify(item.id.toString())">修改</i>
            <i class="el-icon-delete" @click="delData(item.id.toString())">删除</i>
          </div>
        </div>
        <el-row type="flex" justify="center">
          <el-pagination :current-page="page.currPage" :page-size="page.pageSize" background layout="prev, pager, next" :total="page.total" @current-change="pageChange"></el-pagination>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {

      // 获取请求的条件数据
      formInfo: {
        status: 5,
        channel: null,
        date: []
      },

      // 如果请求获取不到图片的话，就使用默认的路径
      imgUrl: require('../../../../assets/img/beijin.jpg'),
      // 接收请求获取到的频道信息
      channelData: [],

      // 接收请求到的文章列表的数据
      articleData: [],

      // 获取请求设置分页的数据
      page: {

        total: 0,
        pageSize: 10,
        currPage: 1
      }
    }
  },

  created () {
    this.getChannelData()
    this.getArticleData()
  },
  methods: {

    // 请求获取频道数据
    getChannelData () {
      this.$http({
        url: 'channels',
        method: 'get'
      }).then(result => {
        this.channelData = result.data.channels
      })
    },

    // 请求获取文章列表数据
    getArticleData (params) {
      this.$http({
        url: 'articles',
        method: 'get',
        params
      }).then(result => {
        // 获取到文章的总数量，赋值给分页的总页数
        this.page.total = result.data.total_count
        // 获取文章的数据
        this.articleData = result.data.results
      })
    },

    pageChange (newPage) {
      this.page.currPage = newPage
      this.packageFactorParams()
    },

    // 因为在条件筛选的时候，和点击的时候都需要这些参数所以封装
    packageFactorParams () {
      let params = {
        // 设置请求的页数
        page: this.page.currPage,
        // 设置每页请求的条数
        per_page: this.page.pageSize,
        // 因为后台获取全部的字段是null，而我们前端自定义的是5，所有需要做下判断
        status: this.formInfo.status === 5 ? null : this.formInfo.status,
        // 上传频道的id参数
        channel_id: this.formInfo.channel,
        // 判断数组中如果没有日期对象的话，返回null或者返回数组的第一项，因为第一项是开始时间
        begin_pubdate: this.formInfo.date.length ? this.formInfo.date[0] : null,
        // 判断如果数组项大于1的话，说明有结束时间的哪一项
        end_pubdate: this.formInfo.date.length > 1 ? this.formInfo.date[1] : null
      }

      // 调用请求文章列表数据重新渲染
      this.getArticleData(params)
    },

    // 删除数据
    delData (id) {
      this.$confirm('真的要删除吗，删除之后无法找回？').then(() => {
        this.$http({
          url: `articles/${id}`,
          method: 'delete'
        }).then(result => {
          // 重新渲染页面
          this.packageFactorParams()
        })
      })
    },

    modify (id) {
      this.$router.push(`/home/publish/${id}`)
    }
  },

  filters: {

    // 过滤出相应的内容
    filterStatus (value) {
      switch (value) {
        case 0 :
          return '草稿'
        case 1 :
          return '待审核'
        case 2 :
          return '已发表'
        case 3 :
          return '审核失败'
        default :
          break
      }
    },

    // 过滤出标签对应的type属性
    filterTagType (value) {
      switch (value) {
        case 0 :
          return 'warning'
        case 1 :
          return 'info'
        case 2 :
          return ''
        case 3 :
          return 'danger'
        default :
          break
      }
    }
  },

  watch: {
    formInfo: {
      handler () {
        // 每当条件改变的时候就把页面切换到第一页
        this.page.currPage = 1
        // 定义筛选的条件
        this.packageFactorParams()
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
  .article_status {
    .myFrom {
      padding-left: 50px;
    }
    .article-item {
      >p{
        border-bottom: #ccc dashed 1px;
        padding: 20px 0;
      }
    }
    .article-content {
      display: flex;
      justify-content: space-between;
      margin-bottom: 50px;
      .article-content-right {
        display: flex;
        img {

          width: 150px;
          height: 100px;
        }
        .info {

          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding-left: 10px;
          span:nth-child(1) {
            font-size: 14px;
          }
          span:nth-child(3) {
            font-size: 12px;
            color: #999;
          }
        }
      }
      .article-content-left {

        font-size: 14px;
        i {
          padding: 0 10px;
          cursor: pointer;
        }
        i:hover {
          color: orange;
        }
      }
    }
  }
</style>
