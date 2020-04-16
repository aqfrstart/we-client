<template>
  <div>
    <el-form :model="addMovieForm" ref="addMovieForm" size="small" label-width="100px">
      <el-form-item label="关键字" prop="keyword">
        <el-input v-model="addMovieForm.keyword" placeholder="请输入关键字"></el-input>
      </el-form-item>
      <el-form-item label="回复内容" prop="content">
        <el-input v-model="addMovieForm.content" type="textarea" placeholder="请输入回复内容"></el-input>
      </el-form-item>
      <el-form-item label="匹配方式" prop="matchType">
        <el-select v-model="addMovieForm.matchType">
          <el-option v-for="item in MATCH_TYPE_DICT" :key="item.key" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电影类型" prop="movieType">
        <el-select v-model="addMovieForm.movieType">
          <el-option v-for="item in MOVIE_TYPE_DICT" :key="item.key" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="更新时间" prop="movieUpdateTime">
        <el-select v-model="addMovieForm.movieUpdateTime" multiple collapse-tags>
          <el-option v-for="item in MOVIE_UPDATE_TIME_DICT" :key="item.key" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="简介" prop="desc">
        <el-input v-model="addMovieForm.desc" placeholder="请输入简介"></el-input>
      </el-form-item>
      <el-form-item label="主演" prop="actor">
        <el-input v-model="addMovieForm.actor" placeholder="请输入主演"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addMovie">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  MATCH_TYPE_DICT,
  MOVIE_UPDATE_TIME_DICT,
  MOVIE_TYPE_DICT
} from './movie-manage/dict.js'

export default {
  name: 'sys-index',
  components: {},
  props: {},
  data () {
    return {
      addMovieForm: {
        keyword: '',                  // 查询关键字
        content: '',                  // 回复内容
        matchType: 0,                 // 匹配类型  0: 模糊匹配  1: 完全匹配
        movieType: 0,                 // 电影类型
        desc: '',                     // 简介
        actor: '',                    // 主演
        movieUpdateTime: 0            // 电影更新时间
      }
    }
  },
  watch: {},
  methods: {
    /**
     * 新增数据
     */
    addMovie () {
      this.$request({
        url: '/api/movie-manage',
        method: 'POST',
        data: this.addMovieForm
      })
    }
  },
  created () {
    this.MATCH_TYPE_DICT = MATCH_TYPE_DICT
    this.MOVIE_UPDATE_TIME_DICT = MOVIE_UPDATE_TIME_DICT
    this.MOVIE_TYPE_DICT = MOVIE_TYPE_DICT
  },
  mounted () { }
}
</script>
<style lang="postcss" scoped>
>>> .el-select {
  display: block;
}
</style>
