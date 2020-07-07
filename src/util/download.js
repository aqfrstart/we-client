const moment = require('moment')

/**
 * content 数据返回内容, 要求返回类型为blob
 */
const $download = function (content) {
  const blob = new Blob([content.data], { type: "application/vnd.ms-excel" })
  const currentTime = moment(Date.now()).format('YYYY.MM.DD_HH.mm.ss')
  let fileName = `导出数据${currentTime}.xlsx`
    if ('download' in document.createElement('a')) {  // 非IE下载
      let link = document.createElement('a')
      link.download = fileName
      link.style.display = 'none'
      link.href = URL.createObjectURL(blob)
      document.body.appendChild(link)
      link.click()
      URL.revokeObjectURL(link.href) // 释放URL 对象
      document.body.removeChild(link)
  } else {  // IE10+下载
    navigator.msSaveBlob(blob)
  }
}

export default $download
