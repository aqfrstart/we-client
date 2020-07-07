<template>
  <div>
    <el-form ref="form" :model="form" label-width="120px" :rules="rules">
      <el-form-item label="关键词" prop="keyWords">
        <el-input v-model="form.keyWords"></el-input>
      </el-form-item>
      <el-form-item label="回复内容" prop="content">
        <el-input v-model="form.content" type="textarea" :rows="5"></el-input>
      </el-form-item>
      <el-form-item label="查询方式" prop="searchType">
        <el-select v-model="form.searchType" stretch>
          <el-option
            v-for="(item, index) in MATCH_TYPE_DICT"
            :label="item.name"
            :value="item.value"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属地区" prop="country">
        <el-select v-model="form.country" stretch>
          <el-option
            v-for="(item, index) in MOVIE_TYPE_DICT"
            :label="item.name"
            :value="item.value"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电影/电视剧" prop="contentType">
        <el-select v-model="form.contentType" stretch>
          <el-option
            v-for="(item, index) in CONTENT_TYPE_DICT"
            :label="item.name"
            :value="item.value"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类" prop="contentTag" required>
        <el-select v-model="form.contentTag" stretch multiple>
          <el-option
            v-for="(item, index) in TAG_TYPE_LIST"
            :label="item.name"
            :value="item.value"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否完结" prop="endedType">
        <el-select v-model="form.endedType" stretch>
          <el-option
            v-for="(item, index) in IS_END_DICT"
            :label="item.name"
            :value="item.value"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电影更新时间" prop="updateTime" required>
        <el-select v-model="form.updateTime" stretch multiple>
          <el-option
            v-for="(item, index) in MOVIE_UPDATE_TIME_DICT"
            :label="item.name"
            :value="item.value"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="edit">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from 'axios'

import { MATCH_TYPE_DICT, MOVIE_TYPE_DICT, CONTENT_TYPE_DICT, TAG_TYPE_LIST, MOVIE_UPDATE_TIME_DICT, IS_END_DICT } from '../dict.js'
export default {
  name: 'edit-movie',
  props: {
    editStatus: String,
    movieInfo: Object
  },
  data() {
    return {
      form: {
        keyWords: "",               // 关键词
        content: "",                // 内容
        searchType: 1,              // 搜索类型 1模糊 2完全
        country: 1,                 // 国家 1国产 2美国 3日本 4韩国 5英国 6泰国
        contentType: 2,             // 分类 1电影 2电视剧 3综艺 4动漫
        contentTag: [0],            // 标签 0其它 1偶像爱情 2古装历史 3玄幻史诗 4都市生活 5当代主旋律 6罪案谍战 7历险科幻 8军旅抗战 9喜剧 10武侠江湖 11时代传奇 12体育电影 13真人动漫
        endedType: 1,               // 完结类型 1未完结 2已完结
        updateTime: [1]             // 更新时间 1周一 2周二 3周三 4周四 5周五 6周六 7周日 8每天 ,分割
      },

      // 校验
      rules: {
        keyWords: [
          { required: true, message: '请输入关键字', trigger: 'blur' },
          { max: 20, message: '最多输入20个字符', trigger: ['blur', 'change'] }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { max: 300, message: '最多输入300个字符', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  created() {
    this.MATCH_TYPE_DICT = MATCH_TYPE_DICT
    this.MOVIE_TYPE_DICT = MOVIE_TYPE_DICT
    this.CONTENT_TYPE_DICT = CONTENT_TYPE_DICT
    this.TAG_TYPE_LIST = TAG_TYPE_LIST
    this.MOVIE_UPDATE_TIME_DICT = MOVIE_UPDATE_TIME_DICT
    this.IS_END_DICT = IS_END_DICT
  },
  methods: {
    /**
     * 新增/编辑
     */
    async edit() {
      let params = Object.assign({}, this.form)
      // 拼接字符串 标签字段 更新时间字段
      params.contentTag = params.contentTag.join(',')
      params.updateTime = params.updateTime.join(',')
      if (this.editStatus === 'update') {
        params.id = this.movieInfo.id
      }
      let content = await axios({
        url: `/api/media/${this.editStatus}`,
        method: 'POST',
        data: params
      })
      if (content.data.code === 200) {
        this.$message({
          message: this.editStatus === 'add' ? '新增成功' : '更新成功',
          type: 'success'
        })
        this.$emit('close')
        this.$emit('refresh')
      } else {
        this.$message({
          message: this.editStatus === 'add' ? '新增失败' : '更新失败',
          type: 'error'
        })
      }
    },

    cancel() {
      this.$emit('close')
    }
  },
  mounted() {
    // 编辑回显数据 先处理字符串为数组
    if (this.editStatus === 'update') {
      let info = Object.assign({}, this.movieInfo)
      info.contentTag = info.contentTag.split(',').map(item => +item)
      info.updateTime = info.updateTime.split(',').map(item => +item)

      this.form = Object.assign(this.form, info)
    }
  }
}
</script>
<style scoped>
</style>
