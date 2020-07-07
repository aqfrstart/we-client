<template>
  <div>
    <!-- 筛选条件 -->
    <akou-widget>
      <template slot="title-left">筛选条件</template>
      <el-form
        ref="searchForm"
        :model="searchForm"
        @keydown.enter.native="search"
        size="small"
        label-width="100px"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="关键字" prop="keyWords">
              <el-input v-model="searchForm.keyWords" placeholder="请输入关键字"></el-input>
            </el-form-item>

            <el-form-item label="分类" prop="contentTag">
              <el-select stretch multiple collapse-tags clearable v-model="searchForm.contentTag">
                <el-option
                  v-for="item in TAG_TYPE_LIST"
                  :key="item.key"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <!-- <el-form-item label="查询方式" prop="searchType">
              <el-select stretch v-model="searchForm.searchType">
                <el-option v-for="item in MATCH_TYPE_DICT" :key="item.key" :label="item.name" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>-->

            <el-form-item label="电影/电视剧" prop="contentType">
              <el-select stretch v-model="searchForm.contentType" clearable>
                <el-option
                  v-for="item in CONTENT_TYPE_DICT"
                  :key="item.key"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="电影更新时间" prop="updateTime">
              <el-select stretch multiple collapse-tags clearable v-model="searchForm.updateTime">
                <el-option
                  v-for="item in MOVIE_UPDATE_TIME_DICT"
                  :key="item.key"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所属地区" prop="country">
              <el-select stretch v-model="searchForm.country" clearable>
                <el-option
                  v-for="item in MOVIE_TYPE_DICT"
                  :key="item.key"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否完结" prop="endedType">
              <el-select stretch v-model="searchForm.endedType" clearable>
                <el-option
                  v-for="item in IS_END_DICT"
                  :key="item.key"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-button type="primary" @click="search" size="small">查询</el-button>
          <el-button type="primary" @click="reset" size="small">重置</el-button>
        </el-row>
      </el-form>
    </akou-widget>

    <!-- 新增/批量删除 -->
    <!-- <el-row type="flex" justify="start" style="margin: 10px 0">

    </el-row>-->

    <el-row style="margin: 10px 0">
      <div style="float: left">
        <el-button type="primary" size="small" @click="edit">新增</el-button>
        <el-button
          type="danger"
          size="small"
          @click="del('all')"
          :disabled="idList.length === 0"
        >批量删除</el-button>
      </div>
      <div style="float: right">
        <el-button type="warning" size="small" @click="goToValidPage">失效检测管理</el-button>
        <el-button type="warning" size="small" @click="valid" :loading="checkValidLoading">检测失效</el-button>
        <el-button type="primary" size="small" @click="exportFile">导出</el-button>
      </div>
    </el-row>

    <!-- 表格 start -->
    <el-table
      ref="movieList"
      :data="movieList"
      style="width: 100%; marginBottom: 10px"
      height="430px"
      border
      header-align="center"
      @selection-change="selectionChange"
      v-loading="tableLoadingStatus"
      stripe
    >
      <el-table-column type="index" width="40" align="center"></el-table-column>
      <el-table-column type="selection" width="45" align="center"></el-table-column>
      <el-table-column prop="keyWords" label="关键字" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="content" label="回复内容" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="validFlag" label="链接是否有效" align="center" show-overflow-tooltip>
        <template v-slot="scope">
          <el-tag type v-if="scope.row.validFlag === 1">有效</el-tag>
          <el-tag type="warning" v-else>失效</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="searchType" label="查询方式" align="center">
        <template v-slot="scope">{{MATCH_TYPE_TEMP[scope.row.searchType]}}</template>
      </el-table-column>
      <el-table-column prop="country" label="国家" align="center">
        <template v-slot="scope">{{MOVIE_TYPE_TEMP[scope.row.country]}}</template>
      </el-table-column>
      <el-table-column prop="contentType" label="所属分类" align="center">
        <template v-slot="scope">{{CONTENT_TYPE_TEMP[scope.row.contentType]}}</template>
      </el-table-column>
      <el-table-column prop="endedType" label="是否完结" align="center">
        <template v-slot="scope">{{IS_END_TEMP[scope.row.endedType]}}</template>
      </el-table-column>
      <el-table-column prop="contentTag" label="分类标签" align="center" show-overflow-tooltip>
        <template v-slot="scope">
          <span v-for="(item, index) in scope.row.contentTag.split(',')">{{TAG_TYPE_TEMP[item]}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="电影更新时间" align="center" show-overflow-tooltip>
        <template v-slot="scope">
          <span
            v-for="(item, index) in scope.row.updateTime.split(',')"
          >{{MOVIE_UPDATE_TIME_TEMP[item]}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="gmtCreated" label="创建时间" align="center" min-width="120"></el-table-column>
      <el-table-column prop="gmtModified" label="更新时间" align="center" min-width="120"></el-table-column>
      <el-table-column label="操作" align="center" min-width="120">
        <template v-slot="scope">
          <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="del('single', scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格 end -->

    <!-- 分页 start -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
    <!-- 分页 end -->

    <!-- 新增/编辑数据弹窗 start -->
    <el-dialog
      :close-on-click-modal="false"
      :title="editStatus === 'add' ? '新增数据' : '编辑数据'"
      :visible.sync="dialogVisible"
      width="60%"
    >
      <edit-movie
        v-if="dialogVisible"
        :editStatus="editStatus"
        :movieInfo="movieInfo"
        @close="dialogVisible = false"
        @refresh="search"
      ></edit-movie>
    </el-dialog>
    <!-- 新增/编辑数据弹窗 start -->
  </div>
</template>

<script>
import axios from 'axios'

import akouWidget from '@/views/components/akou-widget.vue'
import editMovie from './components/edit-movie.vue'

import $download from '../../util/download.js'

import {  MATCH_TYPE_DICT,
  MOVIE_UPDATE_TIME_DICT,
  MOVIE_TYPE_DICT,
  CONTENT_TYPE_DICT,
  TAG_TYPE_LIST,
  IS_END_DICT,
  MATCH_TYPE_TEMP,
  MOVIE_TYPE_TEMP,
  CONTENT_TYPE_TEMP,
  MOVIE_UPDATE_TIME_TEMP,
  TAG_TYPE_TEMP,
  IS_END_TEMP} from './dict.js'

const WHETHER_UPDATE_DICT = [
  {
    key: 0,
    name: '未更新',
    value: 0
  },
  {
    key: 1,
    name: '已更新',
    value: 1
  }
]

const WHETHER_VALID_DICT = [
  {
    key: 0,
    name: '失效',
    value: 0
  },
  {
    key: 1,
    name: '有效',
    value: 1
  }
]

export default {
  name: 'movie-manage',
  components: {
    akouWidget,
    editMovie
  },
  props: {},
  data() {
    return {
      searchForm: {
        page: 1,
        limit: 10,
        all: 0,               // 如果为1 则下面的条件不生效
        keyWords: '',         // 关键字
        // searchType: '',        // 搜索类型 1模糊 2完全
        country: '',            // 国家 1国产 2美国 3日本 4韩国 5英国 6泰国
        contentType: '',      // 分类 1电影 2电视剧
        contentTag: [],      // 标签 0其它
        endedType: '',         // 完结类型 1未完结 2已完结
        updateTime: []       // 更新时间 1周一 2周二 3周三 4周四 5周五 6周六 7周日 8每天
      },
      movieList: [],

      editStatus: 'add',
      dialogVisible: false,

      // 表格loading
      tableLoadingStatus: false,
      // 检测失效loading
      checkValidLoading: false,

      // 编辑回显数据
      movieData: {},
      movieInfo: {},

      idList: [],

      // 表格数据
      currentPage: 1
    }
  },
  computed: {
    totalCount() {
      return this.movieData.total
    }
  },
  methods: {
    // 查询列表
    async search() {
      let params = this._handleReqParams()
      this.tableLoadingStatus = true
      const data = await axios({
        method: 'POST',
        url: '/api/media/list',
        data: params
      })
      this.tableLoadingStatus = false
      this.movieData = data.data.data
      this.movieList = data.data.data.records
    },

    // 重置表单
    reset() {
      this.$refs.searchForm.resetFields()
    },

    // 新增 or 编辑
    edit(info) {
      this.dialogVisible = true
      if (info.id) {
        // 此时为编辑状态
        this.editStatus = 'update'
        this.movieInfo = info
      } else {
        // 此时为新增状态
        this.editStatus = 'add'
      }
    },

    // 删除
    async del(type, info) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let content
        if (type === 'all') {
          // 批量删除
          content = await axios({
            method: 'POST',
            url: '/api/media/delete',
            data: {
              idList: this.idList
            }
          })
        } else {
          // 单个删除
          content = await axios({
            method: 'POST',
            url: '/api/media/delete',
            data: {
              idList: [info.id]
            }
          })
        }
        if (content.data.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        } else {
          this.$message({
            type: 'error',
            message: '删除失败!'
          })
        }
        this.search()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
          method: 'POST',
          url: '/api/media/validAsync',
          data: {
            secret: '@ASYNC'
          }
        })
        if (content.data.code === 200) {
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
        // 刷新列表
        this.search()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    goToValidPage() {
      this.$router.push('/valid')
    },

    // 导出
    async exportFile() {
      let params = this._handleReqParams()
      const content = await axios({
        method: 'POST',
        url: '/api/media/export',
        data: params,
        responseType: 'blob'
      })
      $download(content)
      this.$message({
        type: 'success',
        message: '导出成功!'
      })
    },

    // 统一处理查询传参转换问题
    _handleReqParams() {
      let params = Object.assign({}, this.searchForm)
      // 处理数组为字符串
      if (params.contentTag.length === 0) {
        params.contentTag = ''
      } else {
        params.contentTag = params.contentTag.join(',')
      }

      if (params.updateTime.length === 0) {
        params.updateTime = ''
      } else {
        params.updateTime = params.updateTime.join(',')
      }
      return params
    },

    handleSizeChange(val) {
      this.searchForm.limit = val
      this.search()
    },

    handleCurrentChange(val) {
      this.searchForm.page = val
      this.search()
    },

    selectionChange(selection) {
      this.idList = selection.map(item => item.id)
    }
  },
  created() {
    this.WHETHER_UPDATE_DICT = WHETHER_UPDATE_DICT
    this.WHETHER_VALID_DICT = WHETHER_VALID_DICT

    this.MATCH_TYPE_DICT = MATCH_TYPE_DICT
    this.MOVIE_UPDATE_TIME_DICT = MOVIE_UPDATE_TIME_DICT
    this.MOVIE_TYPE_DICT = MOVIE_TYPE_DICT
    this.CONTENT_TYPE_DICT = CONTENT_TYPE_DICT
    this.TAG_TYPE_LIST = TAG_TYPE_LIST
    this.IS_END_DICT = IS_END_DICT

    this.MATCH_TYPE_TEMP = MATCH_TYPE_TEMP
    this.MOVIE_TYPE_TEMP = MOVIE_TYPE_TEMP
    this.CONTENT_TYPE_TEMP = CONTENT_TYPE_TEMP
    this.MOVIE_UPDATE_TIME_TEMP = MOVIE_UPDATE_TIME_TEMP
    this.TAG_TYPE_TEMP = TAG_TYPE_TEMP
    this.IS_END_TEMP = IS_END_TEMP
  },
  mounted() {
    this.search()
  }
}
</script>
<style lang="postcss" scoped>
</style>
