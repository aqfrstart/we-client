/**
 * 下拉字典
 */

// 匹配类型字典
const MATCH_TYPE_DICT = [{
    key: 1,
    name: '模糊匹配',
    value: 1
  },
  {
    key: 2,
    name: '完全匹配',
    value: 2
  }
]

// 字典转换
const MATCH_TYPE_TEMP = {
  1: '模糊匹配',
  2: '完全匹配'
}

// 所属国家 // 国家 1中国大陆 2中国台湾 3中国香港 4英国 5美国 6日本 7泰国 8韩国
const MOVIE_TYPE_DICT = [{
    key: 1,
    name: '国产',
    value: 1
  },
  {
    key: 2,
    name: '美国',
    value: 2
  },
  {
    key: 3,
    name: '日本',
    value: 3
  },
  {
    key: 4,
    name: '韩国',
    value: 4
  },
  {
    key: 5,
    name: '英国',
    value: 5
  },
  {
    key: 6,
    name: '泰国',
    value: 6
  },
  {
    key: 7,
    name: '俄罗斯',
    value: 7
  },
  {
    key: 8,
    name: '德国',
    value: 8
  },
  {
    key: 9,
    name: '土耳其',
    value: 9
  }
]

const MOVIE_TYPE_TEMP = {
  1: '国产',
  2: '美国',
  3: '日本',
  4: '韩国',
  5: '英国',
  6: '泰国',
  7: '俄罗斯',
  8: '德国',
  9: '土耳其'
}

// 分类类型  分类 1电影 2电视剧
const CONTENT_TYPE_DICT = [{
    key: 1,
    name: '电影',
    value: 1
  },
  {
    key: 2,
    name: '电视剧',
    value: 2
  },
  {
    key: 3,
    name: '综艺',
    value: 3
  },
  {
    key: 4,
    name: '动漫',
    value: 4
  }
]

const CONTENT_TYPE_TEMP = {
  1: '电影',
  2: '电视剧',
  3: '综艺',
  4: '动漫'
}

// 标签分类
const TAG_TYPE_LIST = [{
    key: 0,
    name: '其它',
    value: 0
  },
  {
    key: 1,
    name: '偶像爱情',
    value: 1
  },
  {
    key: 2,
    name: '古装历史',
    value: 2
  },
  {
    key: 3,
    name: '玄幻史诗',
    value: 3
  },
  {
    key: 4,
    name: '都市生活',
    value: 4
  },
  {
    key: 5,
    name: '当代主旋律',
    value: 5
  },
  {
    key: 6,
    name: '罪案谍战',
    value: 6
  },
  {
    key: 7,
    name: '历险科幻',
    value: 7
  },
  {
    key: 8,
    name: '军旅抗战',
    value: 8
  },
  {
    key: 9,
    name: '喜剧',
    value: 9
  },
  {
    key: 10,
    name: '武侠江湖',
    value: 10
  },
  {
    key: 11,
    name: '时代传奇',
    value: 11
  },
  {
    key: 12,
    name: '体育电影',
    value: 12
  },
  {
    key: 13,
    name: '真人动漫',
    value: 13
  }
]

const TAG_TYPE_TEMP = {
  0: '其它',
  1: '偶像爱情',
  2: '古装历史',
  3: '玄幻史诗',
  4: '都市生活',
  5: '当代主旋律',
  6: '罪案谍战',
  7: '历险科幻',
  8: '军旅抗战',
  9: '喜剧',
  10: '武侠江湖',
  11: '时代传奇',
  12: '体育电影',
  13: '真人动漫'
}

// 是否完结
const IS_END_DICT = [{
    key: 1,
    name: '未完结',
    value: 1
  },
  {
    key: 2,
    name: '已完结',
    value: 2
  }
]

const IS_END_TEMP = {
  1: '未完结',
  2: '已完结'
}

// 电影更新时间字典
const MOVIE_UPDATE_TIME_DICT = [{
    key: 1,
    name: '周一',
    value: 1
  },
  {
    key: 2,
    name: '周二',
    value: 2
  },
  {
    key: 3,
    name: '周三',
    value: 3
  },
  {
    key: 4,
    name: '周四',
    value: 4
  },
  {
    key: 5,
    name: '周五',
    value: 5
  },
  {
    key: 6,
    name: '周六',
    value: 6
  },
  {
    key: 7,
    name: '周日',
    value: 7
  },
  {
    key: 8,
    name: '每天',
    value: 8
  }
]

const MOVIE_UPDATE_TIME_TEMP = {
  1: '周一',
  2: '周二',
  3: '周三',
  4: '周四',
  5: '周五',
  6: '周六',
  7: '周日',
  8: '每天'
}

export {
  MATCH_TYPE_DICT,
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
  IS_END_TEMP
}
