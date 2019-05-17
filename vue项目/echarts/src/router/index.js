import Vue from 'vue'
import Router from 'vue-router'
import echarts from '@/components/echarts'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'echarts',
      component: echarts
    }
  ]
})
