<template>
  <div>
    <el-card>
      <bread-bits slot="header">
        <template slot="title">发表文章</template>
      </bread-bits>
      <el-form :model="formData" :rules="publishRuls" ref="form" style="margin-left: 20px;"  label-width="100px">
        <el-form-item prop="title" label="标题">
          <el-input v-model="formData.title" style="width: 60%;"></el-input>
        </el-form-item>
        <el-form-item prop="content" label="内容">
          <quill-editor v-model="formData.content" style="height: 360px;"></quill-editor>
        </el-form-item>
        <el-form-item label="封面" prop="cover" style="padding-top: 100px;">
          <el-radio-group @change="imageChange" v-model="formData.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <cover-images @imgUrl="define" :imgsList="formData.cover.images"></cover-images>
        <el-form-item label="频道" prop="channel_id">
          <el-select placeholder="请选择" v-model="formData.channel_id">
            <el-option v-for="item in channelData" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="padding-left: 40px;padding-top: 10px;">
          <el-button @click="publishArticle()" type="primary">发布</el-button>
          <el-button @click="publishArticle(true)" plain>存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>

// 按需引入请求
import { getChannels, PublishArticles, getIdArticleInfo } from '../../../../axios/index.js'

export default {

  data () {
    return {
      arr: [],
      // 定义元素的双向绑定数据，格式就是提交的参数格式
      formData: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null // 频道的id
      },

      // 验证数据的规则
      publishRuls: {
        title: [
          { required: true, message: '文章标题不能为空' },
          { min: 5, max: 20, message: '注入5-到20之间的数字或者字符' }
        ],
        content: [
          { required: true, message: '文章内容不能为空' }
        ],
        channel_id: [
          { required: true, message: '频道id不能为空' }
        ]
      },

      // 接收频道的数据
      channelData: []
    }
  },
  methods: {
    async publishArticle (draft) {
      let isOk = await this.$refs.form.validate()
      let { id } = this.$route.params
      if (isOk) {
        await PublishArticles(id, draft, this.formData)
        setTimeout(() => {
          this.$router.push('/home/articles')
        }, 500)
      }
    },

    // 获取频道的数据
    async getChannelData () {
      let result = await getChannels()
      this.channelData = result.data.channels
    },

    // 根据传递过来的id获取该文章信息
    async getIdArticle () {
      // 判断一下是否有文章id的值有的话，再发送请求查找
      if (this.$route.params.id) {
        let result = await getIdArticleInfo(this.$route.params.id)
        // 将获取到的数据直接给我们默认定义的初始化的数据
        this.formData = result.data
      }
    },

    imageChange () {
      // 根据选择的type值来确定放置几张图片
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        this.formData.cover.images = []
      } else if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      }
    },

    define (url, index) {
      if (url) {
        this.formData.cover.images = this.formData.cover.images.map((item, i) => i === index ? url : item)
      }
    }
  },
  created () {
    this.getChannelData()
    this.getIdArticle()
  },
  watch: {

    // 当俩个不同的路由地址指向同一个组件的时候，如果相互切换，组件实例并不会销毁。
    // 不会执行钩子函数的一系列操作

    // 检测路由的变化，如果路由有id参数的话，不做处理，如果没有id参数的话，把所有元素绑定的数据，重置掉
    $route (to) {
      if (!to.params.id) {
        this.formData = {
          title: '',
          content: '',
          cover: {
            type: 0,
            images: []
          },
          channel_id: null
        }
      }
    }
  }

}

</script>

<style>

</style>
