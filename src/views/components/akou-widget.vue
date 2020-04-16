<template>
  <div class="akou-widget">
    <!----- Header 左-中-右布局----->
    <div class="title">
      <slot name="title-left"></slot>
    </div>
    <main :style="mainStyle">
      <slot></slot>
    </main>
    <footer :style="footerStyle">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'akou-widget',
  props: {
    // 是否有阴影
    shadow: {
      type: String,
      default: 'always' // always: 一直有阴影；never: 不加阴影； hover: 鼠标移动上去显示阴影
    },
    /** 控制 header 渐变背景类型 */
    headerType: {
      type: String,
      default: '' // primary（渐变）、plain-border（透明背景有下边框）、header-float-right（tab 菜单 + 右边显示操作按钮）
    },
    /** 定义整个组件全局样式 */
    globalStyle: Object,
    /** 定义 Header 样式 */
    headerStyle: Object,
    /** 定义 Main 的样式 */
    mainStyle: Object,
    /** 定义 Footer 的样式 */
    footerStyle: Object

  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.akou-widget {
  margin: 0 12px 12px 0;
  /* border: var(--widget-border); */
  border-radius: 2px;
  background-color: #fff;
}
.title {
  width: 100%;
  overflow: hidden;
  display: inline-block;
  text-align: left;
  font-weight: bold;
  font-size: 20px;
  line-height: inherit;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
