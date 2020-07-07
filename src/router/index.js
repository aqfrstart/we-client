import Vue from 'vue'
import VueRouter from 'vue-router'

import MovieManage from '../views/movie-manage/index.vue'
import Valid from '../views/movie-manage/components/valid.vue'
import FilterGroup from '../views/movie-manage/components/filter-group.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: MovieManage
  },
  {
    path: '/valid',
    component: Valid
  },
  {
    path: '/group',
    component: FilterGroup
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
