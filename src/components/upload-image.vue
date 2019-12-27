<template>
  <div class="upload-image">
    <el-tabs v-model="uploadName" type="card">
        <el-tab-pane label="素材库" name="source">
           <el-radio-group @change="imgChange" v-model="radioBtn" style="margin-top: 10px;">
               <el-radio-button label="全部"></el-radio-button>
               <el-radio-button label="收藏"></el-radio-button>
                <div class="all">
                    <div class="all-item" v-for="item in imgList" :key="item.id" @click="url=item.url">
                        <img :src="item.url" alt="">
                    </div>
                </div>
           </el-radio-group>
           <el-row class="btn">
               <el-row style="margin: 30px 0;">
                 <el-pagination @current-change="pageChange" background layout="prev, pager, next" :current-page="page.page" :page-size="page.per_page" :total="page.total"></el-pagination>
               </el-row>
               <el-row>
                 <el-button @click="define()" plain>取消</el-button>
                 <el-button @click="define(true)" type="primary">确定</el-button>
               </el-row>
           </el-row>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
         <el-form>
            <el-form-item class="image-container">
              <img :src="imgUrl ? imgUrl : defaultImg" alt="">
            </el-form-item>
            <el-form-item label="用户图片">
              <el-upload :http-request="uploadImg" :auto-upload="false" ref="uploadImg" action="" :show-file-list="false">
                <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="primary" @click="uploadServer">开始上传</el-button>
              </el-upload>
              <el-row style="display: flex;justify-content: center;padding-top: 60px;">
                <el-button @click="deliver" type="primary">确定</el-button>
                <el-button @click="disappear">取消</el-button>
              </el-row>
            </el-form-item>
         </el-form>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      uploadName: 'source',
      radioBtn: '全部',
      imgList: [],
      url: '',
      page: {
        page: 1,
        total: 0,
        per_page: 6
      },
      imgUrl: '',
      defaultImg: require('../assets/img/pic_bg.png')
    }
  },
  // var arr = [0,1,0,21,3]
  // var arr =[0]
  // [1,3,21,0,0]

  methods: {

    // 当点击页面的时候将最新的页面赋值给定义的页数，并且重新渲染
    pageChange (newPage) {
      this.page.page = newPage
      this.getUserImage()
    },

    getUserImage () {
      this.$http({
        url: 'user/images',
        type: 'get',
        params: {
          collect: this.radioBtn === '收藏',
          page: this.page.page,
          per_page: this.page.per_page
        }
      }).then(result => {
        // 获取图片的总数量
        this.page.total = result.data.total_count
        this.imgList = result.data.results
      })
    },

    // 无论是点击了全部还是收藏都重新获取数据，并且将页面重置为第一页
    imgChange () {
      this.page.page = 1
      this.getUserImage()
    },
    define (flag) {
      if (flag) {
        this.$emit('imgurl', this.url, false)
      } else {
        this.$emit('imgurl', false)
      }
    },

    // 上传图片
    uploadImg (params) {
      let data = new FormData()
      data.append('image', params.file)
      this.$http({
        url: 'user/images',
        method: 'post',
        data
      }).then(result => {
        this.$message({

          type: 'success',
          message: '上传成功'
        })
        this.imgUrl = result.data.url
      })
    },

    // 点击确定向父级元素传递url地址
    deliver () {
      this.$emit('imgurl', this.imgUrl)

      // 每次上传图片的时候，先把上一次的清空
      this.imgUrl = ''
      this.clearFiles()
    },

    // 点击取消隐藏弹框
    disappear () {
      this.$emit('imgurl')
      this.imgUrl = ''
      this.clearFiles()
    },

    // 把上传的图片提交到服务器
    uploadServer () {
      this.$refs.uploadImg.submit()
    },

    // 清空已经上传的文件列表
    clearFiles () {
      this.$refs.uploadImg.clearFiles()
    }
  },

  created () {
    this.getUserImage()
  }

}
</script>

<style lang="less" scoped>
    .upload-image {
        .all {
            display: flex;
            flex-flow: wrap;
            height: 300px;
            .all-item {
                padding: 20px 30px;
                width: 200px;
                height: 160px;
                cursor: pointer;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .btn {
            display: flex;
            flex-direction: column;
            align-items: center;
            background: #fff;
        }
        .image-container {
          width: 100%;
          height: 210px;
          display: flex;
          justify-content: center;
          padding-top: 10px;
          img {
            width: 220px;
            height: 200px;
          }
        }
    }

</style>
