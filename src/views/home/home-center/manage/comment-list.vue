<template>
  <el-card>
    <bread-bits slot="header">
      <template slot="title">评论管理</template>
    </bread-bits>
    <el-table :data="infoList">
      <el-table-column prop="title" width="600" label="标题"></el-table-column>
      <el-table-column :formatter="formatterBoolean" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="obj">
          <el-button size="small" type="text">修改</el-button>
          <el-button @click="openOrclose(obj.row.comment_status)" size="small" type="text">{{obj.row.comment_status ? "关闭评论" : "打开评论"}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      infoList: []
    }
  },
  created () {
    this.getCommontData()
  },
  methods: {

    getCommontData () {
      this.$http({

        url: 'articles',
        method: 'get',
        params: {
          response_type: 'comment'
        }
      }).then(result => {
        this.infoList = result.data.results
      })
    },

    formatterBoolean (row, column, cellValue, store) {
      return cellValue ? '正常' : '关闭'
    },

    openOrclose (state) {

    }
  }
}
</script>

<style>

</style>
