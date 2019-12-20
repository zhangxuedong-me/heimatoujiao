<template>
    <div class="aside-container">
        <div class="title">
            <img src="../assets/img/logo_admin.png" alt="">
        </div>
        <el-menu router background-color="#353b4e" text-color="#adafb5" active-text-color="#ffd04b">
            <el-menu-item style="padding-left: 60px;">
                首页
            </el-menu-item>
            <el-submenu index="2">
                <span slot="title" style="padding-left: 40px;">内容管理</span>
                <el-menu-item index="/home/publish" style="padding-left: 80px;">发布文章</el-menu-item>
                <el-menu-item index="/home/articles" style="padding-left: 80px;">内容列表</el-menu-item>
                <el-menu-item index="/home/comment" style="padding-left: 80px;">评论列表</el-menu-item>
                <el-menu-item index="/home/source" style="padding-left: 80px;">素材管理</el-menu-item>
             </el-submenu>
             <el-submenu index="3">
                <span slot="title" style="padding-left: 40px;">粉丝管理</span>
                <el-menu-item index="/home/imgtext" style="padding-left: 80px;">图文数据</el-menu-item>
                <el-menu-item index="/home/summarize" style="padding-left: 80px;">粉丝概括</el-menu-item>
                <el-menu-item index="/home/image" style="padding-left: 80px;">粉丝画像</el-menu-item>
                <el-menu-item index="/home/list" style="padding-left: 80px;">粉丝列表</el-menu-item>
             </el-submenu>
              <el-menu-item index="/home/account" style="padding-left: 60px;">
                账户信息
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {

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

                width: 120px;
                margin-top: 10px;
            }
        }
    }
</style>
