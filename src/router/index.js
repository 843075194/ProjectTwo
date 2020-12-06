import Vue from 'vue'
import VueRouter from 'vue-router'

import Film from '../views/Film.vue'
import Cinema from '../views/Cinema.vue'
// import Center from '../views/Center.vue'
import Detail from '../views/Detail.vue'
// import Login from '../views/Login.vue'

import Comingsoon from '../views/film/Comingsoon'
import Nowplaying from '../views/film/Nowplaying'

Vue.use(VueRouter) // 注册模块

const routes = [
  {
    path: '/film',
    component: Film,
    children: [
      {
        path: 'nowplaying',
        component: Nowplaying
      },
      {
        path: '/film/comingsoon',
        component: Comingsoon
      },
      {
        path: '',
        redirect: '/film/nowplaying'
      }
    ]
  },
  {
    path: '/cinema',
    component: Cinema
  },
  {
    path: '/cinema/search',
    component: () => import(/* webpackChunkName: "cinemagroup" */ '../views/Search.vue')
  },
  {
    path: '/city',
    component: () => import(/* webpackChunkName: "citygroup" */ '../views/City.vue')
  },
  {
    path: '/detail/:myid',
    component: Detail
    // name: 'kerwinDetail'
  },
  {
    path: '/center',
    // component: Center
    // component: () => import('../views/Center.vue')
    component: () => import(/* webpackChunkName: "kerwingroup" */ '../views/Center.vue')
  },
  {
    path: '/login',
    // component: Login
    // component: () => import('../views/Login.vue')
    component: () => import(/* webpackChunkName: "kerwingroup" */ '../views/Login.vue')
  },
  {
    path: '*', // 通配符
    redirect: '/film'
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})
// 全局路由守卫  ==> 全局路由拦截
router.beforeEach((to, from, next) => {
  console.log(to.fullPath)// /detail/5231 这样的
  // to="/center"  这个是Tabbar中定义的li中的to，指代的是路由的去向
  // 这个地方的话to.fullPath 也就是
  // if (to.fullPath === '/center') {
  //   alert('我不让你进')
  // } else {
  //   next()
  // }
  const auth = ['/center', '/order', '/money', '/card']
  if (auth.includes(to.fullPath)) {
    console.log('验证token,')
    if (!localStorage.getItem('token')) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
