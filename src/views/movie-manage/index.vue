<template>
  <div>
    <!-- 筛选条件 -->
    <akou-widget>
      <template slot="title-left">
        筛选条件
      </template>
      <el-form ref="searchForm" :model="searchForm" size="small" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="关键字" prop="keyword">
              <el-input v-model="searchForm.keyword" placeholder="请输入关键字"></el-input>
            </el-form-item>

            <el-form-item label="电影类型" prop="movieType">
              <el-select stretch multiple collapse-tags v-model="searchForm.movieType">
                <el-option v-for="item in MOVIE_TYPE_DICT" :key="item.key" :label="item.name" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否更新" prop="isUpdate">
              <el-select stretch v-model="searchForm.isUpdate">
                <el-option v-for="item in WHETHER_UPDATE_DICT" :key="item.key" :label="item.name" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="更新时间" prop="movieUpdateTime">
              <el-select stretch multiple collapse-tags v-model="searchForm.movieUpdateTime">
                <el-option v-for="item in MOVIE_UPDATE_TIME_DICT" :key="item.key" :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否有效" prop="isValid">
              <el-select stretch v-model="searchForm.isValid">
                <el-option v-for="item in WHETHER_VALID_DICT" :key="item.key" :label="item.name" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="主演" prop="actor">
              <el-input v-model="searchForm.actor"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </el-row>
      </el-form>
    </akou-widget>
  </div>
</template>

<script>
import akouWidget from '@/views/components/akou-widget.vue'

import { MOVIE_UPDATE_TIME_DICT, MOVIE_TYPE_DICT } from './dict.js'

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
    akouWidget
  },
  props: {},
  data () {
    return {
      searchForm: {
        keyword: '',          // 关键字
        movieType: [],        // 电影类型
        isUpdate: 0,          // 检测是否更新 0: 未更新 1: 已更新
        isValid: 0,           // 检测是否有效 0: 失效 1: 有效
        movieUpdateTime: [],  // 电影更新时间
        actor: ''             // 主演
      }
    }
  },
  watch: {},
  computed: {},
  methods: {
    // 查询列表
    search () {
      this.$request({
        url: '/api/movie-manage/list',
        method: 'POST',
        data: this.searchForm
      })
    },

    // 重置表单
    reset () {
      this.$refs.searchForm.resetFields()
    }
  },
  created () {
    this.WHETHER_UPDATE_DICT = WHETHER_UPDATE_DICT
    this.WHETHER_VALID_DICT = WHETHER_VALID_DICT
    this.MOVIE_UPDATE_TIME_DICT = MOVIE_UPDATE_TIME_DICT
    this.MOVIE_TYPE_DICT = MOVIE_TYPE_DICT
  },
  mounted () { }
}
</script>
<style lang="postcss" scoped>
</style>
