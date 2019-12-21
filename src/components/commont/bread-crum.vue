<template>
  <div>
      <el-breadcrumb separator=">">
          <el-breakcrumb-item to="/home">首页</el-breakcrumb-item>
          <el-breakcrumb-item>
              <slot name="title"></slot>
          </el-breakcrumb-item>
      </el-breadcrumb>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
