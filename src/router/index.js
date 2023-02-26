import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


//解决一个路由不能访问两次的问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode:'history', //去掉页面访问url的/#
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/view/login/index')
    }
  ]
})
