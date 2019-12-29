<template>
  <div>
    <el-card>
      <bread-bits slot="header">
        <template slot="title">账户信息</template>
      </bread-bits>
      <div class="user-info-item">
        <el-row>
          <img :src="userInfoData.photo ? userInfoData.photo : imgSrc" alt="">
          <el-upload :show-file-list="false" action="" :http-request="uploadUserImage">
            <a href="javascript:;" style="font-size: 14px;color: blue;">更换头像</a>
          </el-upload>
        </el-row>
        <el-row class="item" v-show="flag">
          <p>{{ userInfoData.name }}</p>
          <p>{{ userInfoData.intro }}</p>
        </el-row>
        <el-form v-show="editFlage" style="padding-left: 50px;" lable-width="20%">
          <el-form-item label="名称">
            <el-input v-model="userInfoData.name"></el-input>
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="userInfoData.intro"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="keepUserInfo" type="primary" plain>保存</el-button>
            <el-button plain>取消</el-button>
          </el-form-item>
        </el-form>
        <el-row class="edit" v-show="flag">
          <a href="javascript:;" @click="edit">修改</a>
        </el-row>
      </div>
      <div class="user-fixed-info">
        <div class="user-top-info">
          <span>账号信息</span>
          <span>头条号类型</span>
          <span>个人</span>
        </div>
        <div class="user-center-info">
          <span>头条号ID</span>
          <span>{{ userInfoData.id }}</span>
        </div>
        <div class="user-bottom-info">
          <span>登录方式</span>
          <span>绑定手机号</span>
          <span>{{ userInfoData.mobile }}</span>
        </div>
        <div class="footer">
          <span>邮箱</span>
          <span>{{ userInfoData.email }}</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import EventBus from '../../../../utils/EventBus.js'
import { getUserInfoData, uploadUserPhoto } from '../../../../axios/index.js'
export default {
  data () {
    return {
      userInfoData: {},
      flag: true,
      editFlage: false,
      imgSrc: ''
    }
  },

  methods: {
    // 获取用户信息
    async getUserInfo () {
      let result = await getUserInfoData()
      this.userInfoData = result.data
      this.imgSrc = result.data.photo
    },

    // 上传用户头像
    async uploadUserImage (params) {
      let data = new FormData()
      data.append('photo', params.file)
      await uploadUserPhoto('patch', data)
      this.getUserInfo()
      EventBus.$emit('imgChange')
    },

    // 修改按钮的点击事件
    edit () {
      this.flag = false
      this.editFlage = true
    },

    // 保存按钮的事件
    async keepUserInfo () {
      let data = {
        name: this.userInfoData.name,
        intro: this.userInfoData.intro,
        email: this.userInfoData.email
      }
      let result = await getUserInfoData('patch', data)
      this.userInfoData = result.data
      this.flag = true
      this.editFlage = false
      EventBus.$emit('imgChange')
    }
  },

  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
  .user-info-item {
    display: flex;
    margin: 30px 50px;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    .item {

      padding-left: 50px;
      p {
        padding: 0;
        margin: 0;
        padding-top: 6px;
        color: #333;
      }
      p:nth-child(2) {
        color: #999;
        font-size: 14px;
      }
    }

    .edit {

      font-size: 14px;
      color: blue;
      margin-left: 580px;
      margin-top: 20px;
    }
  }
  .user-fixed-info {
    div {
      display: flex;
    }
    div:nth-child(2) {
      padding-left: 106px;
    }
    div:last-child{
      padding-left: 30px;
    }
    span {
      margin-left: 50px;
      margin-top: 60px;

      font-size: 14px;
    }
  }
</style>
