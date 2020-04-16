<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
      <!-- <sys-index></sys-index> -->
      <movie-manage></movie-manage>
    </div>
    <!-- <router-view/> -->
  </div>
</template>

<script>
// import sysIndex from './views/index.vue'
import movieManage from './views/movie-manage/index.vue'
export default {
  components: {
    // sysIndex,
    movieManage
  }
}
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
