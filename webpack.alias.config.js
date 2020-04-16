const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
/**
 * vue cli3配置webpack alias别名
 */
module.exports = function (config) {
  config.resolve.alias
    .set('@', resolve('src')) // src路径
}
