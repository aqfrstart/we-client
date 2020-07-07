<template>
  <div>
    <div class="title">检测群是否设置进群欢迎</div>
    <el-row type="flex" justify="end" style="margin: 10px 0">
      <el-button @click="getGroupList" type="primary">获取群列表</el-button>
      <el-button @click="test" type="primary">检测</el-button>
      <el-button @click="setMsg" type="primary">设置入群欢迎</el-button>
    </el-row>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="QQ账号">
        <span class="qq-num">{{qqNum}}</span>
      </el-form-item>
      <el-form-item label="cookie">
        <el-input v-model="form.qqCookie"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="8">
          <el-form-item label="输入群号列表">
            <el-input
              v-model="form.groupStr"
              class="input-group"
              type="textarea"
              :autosize="{
            minRows: 10
          }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="已设置群号列表">
            <el-input
              v-model="form.setGroupListStr"
              class="input-group"
              type="textarea"
              :autosize="{
                minRows: 10
              }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="未设置群号列表">
            <el-input
              v-model="form.unSetGroupListStr"
              class="input-group"
              type="textarea"
              :autosize="{
                minRows: 10
              }"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'filter-group',
  data() {
    return {
      form: {
        qq: '',
        qqCookie: '',
        groupStr: '',
        setGroupListStr: '',
        unSetGroupListStr: ''
      }
    }
  },
  computed: {
    qqNum() {
      if (!this.form.qqCookie) return '此项无需填写，输入cookie自动获取'
      if (!this.form.qqCookie.match(/uin=(.*?);/)) return 'cookie输入错误, 无法获取qq号, 请检查后重试...'
      return RegExp.$1.match(/\d+/)[0]
    }
  },
  methods: {
    async test() {
      if (this.form.groupStr.endsWith('\n')) {
        this.form.groupStr = this.form.groupStr.replace(/^\n+|\n+$/g, "")
      }
      let { data } = await axios({
        url: '/ipa/group',
        method: 'POST',
        data: {
          qqCookie: this.form.qqCookie,
          groupList: this.form.groupStr.split('\n').map(item => +item)
        }
      })
      let setGroupList = data.content.filter(item => item.isSet === '已设置').map(item => item.id)
      let unSetGroupList = data.content.filter(item => item.isSet === '未设置').map(item => item.id)
      this.form.setGroupListStr = setGroupList.join('\n')
      this.form.unSetGroupListStr = unSetGroupList.join('\n')
    },

    async setMsg() {
      if (this.form.groupStr.endsWith('\n')) {
        this.form.groupStr = this.form.groupStr.replace(/^\n+|\n+$/g, "")
      }

      let { data } = await axios({
        url: '/ipa/setWelcomeMsg',
        method: 'POST',
        data: {
          qqCookie: this.form.qqCookie,
          groupList: this.form.groupStr.split('\n').map(item => +item),
          msg: '资源已转移总群，请点击链接加入总群获取：http://t.cn/A620x39l进不去请扫二维码',
          base64Img: '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'
        }
      })

      console.log(data)
    },

    async getGroupList() {
      const { data } = await axios({
        url: '/ipa/groupList',
        method: 'POST',
        data: {
          qqCookie: this.form.qqCookie
        }
      })

      this.form.groupStr = data.content.map(item => item.gc).join('\n')
    }
  }
}
</script>
<style scoped>
.title {
  font-size: 28px;
  font-weight: bold;
}

.input-group {
  max-height: 500px;
}

.qq-num {
  font-size: 18px;
  font-weight: bold;
  color: #f26279;
}
</style>
