<template>
  <div>
    <el-row type="flex" justify="start" style="margin: 0 0 10px 0;">
      <el-button type="primary" size="small" @click="goToManage">返回管理界面</el-button>
      <el-button type="warning" size="small" @click="valid" :loading="checkValidLoading">检测失效</el-button>
    </el-row>
    <el-row type="flex" justify="end" style="margin: 10px 0">
      <el-radio-group v-model="showStatus" @change="changeShowStatus">
        <el-radio-button label="all">全部</el-radio-button>
        <el-radio-button label="valid">有效</el-radio-button>
        <el-radio-button label="invalid">失效</el-radio-button>
      </el-radio-group>
    </el-row>

    <!-- 表格 start -->
    <el-table
      ref="validList"
      :data="validList"
      style="width: 100%; marginBottom: 10px"
      height="430px"
      border
      header-align="center"
      stripe
    >
      <el-table-column type="index" width="40" align="center"></el-table-column>
      <el-table-column type="selection" width="45" align="center"></el-table-column>
      <el-table-column prop="keyWords" label="关键字" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="isValid" label="链接是否有效" align="center" show-overflow-tooltip>
        <template v-slot="scope">
          <el-tag type v-if="scope.row.isValid === '有效'">有效</el-tag>
          <el-tag type="warning" v-else>失效</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="120">
        <template v-slot="scope">
          <el-button size="mini" @click="edit(scope.row.keyWords)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格 end -->

    <!-- 新增/编辑数据弹窗 start -->
    <el-dialog :close-on-click-modal="false" title="编辑数据" :visible.sync="dialogVisible" width="60%">
      <edit-movie
        v-if="dialogVisible"
        editStatus="update"
        :movieInfo="currentData"
        @close="dialogVisible = false"
      ></edit-movie>
    </el-dialog>
    <!-- 新增/编辑数据弹窗 start -->
  </div>
</template>
<script>
import axios from 'axios'
import editMovie from './edit-movie.vue'

export default {
  name: 'valid',
  data() {
    return {
      validList: [],
      validListTemp: [],
      checkValidLoading: false,
      showStatus: 'all',
      dialogVisible: false,
      currentData: {}
    }
  },
  components: {
    editMovie
  },
  methods: {
    goToManage() {
      this.$router.push('/')
    },

    async edit(keyWords) {
      this.dialogVisible = true
      let searchForm = {
        page: 1,
        limit: 10,
        all: 0,           // 如果为1 则下面的条件不生效
        keyWords          // 关键字
      }
      const data = await axios({
        method: 'POST',
        url: '/api/media/list',
        data: searchForm
      })
      this.currentData = data.data.data.records[0]
    },

    changeShowStatus(status) {
      if (status === 'all') {
        this.validList = this.validListTemp
      }

      if (status === 'valid') {
        this.validList = this.validListTemp.filter(item => item.isValid === '有效')
      }

      if (status === 'invalid') {
        this.validList = this.validListTemp.filter(item => item.isValid === '失效')
      }

    },

    // 检测失效
    async valid() {
      this.$confirm('此操作将对所有数据进行有效性校验！请谨慎操作！是否继续检测？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let content
        this.checkValidLoading = true
        content = await axios({
          method: 'GET',
          url: '/ipa/valid'
        })
        if (content.data.status === 'success') {
          this.validList = content.data.content.validResult
          this.validListTemp = content.data.content.validResult
          this.$message({
            type: 'success',
            message: '检测完成!'
          })
        } else {
          this.$message({
            type: 'error',
            message: '检测失败!'
          })
        }
        this.checkValidLoading = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  watch: {}
}
</script>
<style scoped>
</style>
