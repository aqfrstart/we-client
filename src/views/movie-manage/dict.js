/**
 * 下拉字典
 */

// 匹配类型字典
const MATCH_TYPE_DICT = [
  {
    key: 0,
    name: '模糊匹配',
    value: 0
  },
  {
    key: 1,
    name: '完全匹配',
    value: 1
  }
]

// 电影更新时间字典
const MOVIE_UPDATE_TIME_DICT = [
  {
    key: 0,
    name: '完结',
    value: 0
  },
  {
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
    value: 5
  },
  {
    key: 7,
    name: '周日',
    value: 7
  }
]

// 电影类型
// 国产剧 美剧 日剧 泰剧 韩剧 电影
const MOVIE_TYPE_DICT = [
  {
    key: 0,
    name: '电影',
    value: 0
  },
  {
    key: 1,
    name: '老刘退散',
    value: 1
  },
  {
    key: 2,
    name: '韩剧',
    value: 2
  },
  {
    key: 3,
    name: '日剧',
    value: 3
  },
  {
    key: 4,
    name: '美剧',
    value: 4
  },
  {
    key: 5,
    name: '泰剧',
    value: 5
  },
  {
    key: 6,
    name: '其他',
    value: 6
  }
]

export {
  MATCH_TYPE_DICT,
  MOVIE_UPDATE_TIME_DICT,
  MOVIE_TYPE_DICT
}
