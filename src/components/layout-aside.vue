<template>
    <div class="aside-container">
        <div class="title">
            <img :src="this.flag ? smallImage : bigImage" alt="">
        </div>
        <el-menu :collapse="this.flag" router background-color="#353b4e" text-color="#adafb5" active-text-color="#ffd04b">
            <el-menu-item style="padding-left: 40px;">
                <i class="el-icon-s-home"></i>
                <span>首页</span>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                     <i  style="padding-left: 20px;" class="el-icon-document"></i>
                     <span style="padding-left: 20px;">内容管理</span>
                </template>
                <el-menu-item class="hov" index="/home/publish" style="padding-left: 80px;">发布文章</el-menu-item>
                <el-menu-item class="hov" index="/home/articles" style="padding-left: 80px;">内容列表</el-menu-item>
                <el-menu-item class="hov" index="/home/comment" style="padding-left: 80px;">评论列表</el-menu-item>
                <el-menu-item class="hov" index="/home/source" style="padding-left: 80px;">素材管理</el-menu-item>
             </el-submenu>
             <el-submenu index="3">
                <template slot="title">
                    <i style="padding-left: 20px;" class="el-icon-news"></i>
                    <span style="padding-left: 20px;">粉丝管理</span>
                </template>
                <el-menu-item class="hov" index="/home/imgtext" style="padding-left: 80px;">图文数据</el-menu-item>
                <el-menu-item class="hov" index="/home/summarize" style="padding-left: 80px;">粉丝概括</el-menu-item>
                <el-menu-item class="hov" index="/home/image" style="padding-left: 80px;">粉丝画像</el-menu-item>
                <el-menu-item class="hov" index="/home/list" style="padding-left: 80px;">粉丝列表</el-menu-item>
             </el-submenu>
              <el-menu-item index="/home/account" style="padding-left: 36px;">
                <i class="el-icon-s-custom"></i>
                <span>账户信息</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
  props: ['flag'],
  data () {
    return {
      bigImage: require('../assets/img/logo_admin.png'),
      smallImage: require('../assets/img/toutiao.png')
    }
  }
}
</script>

<style lang="less" scoped>

    .aside-container {

        width: 100%;
        .title {

            width: 100%;
            height: 60px;
            background-color: #2e2f32;
            text-align: center;
            img {
                height: 35px;
                margin-top: 10px;
            }
        }

        .hov:hover {

           background: #19b0f6 !important;
           color: #fff !important;
        }
    }
    .el-menu {

        border: none;
    }
</style>
