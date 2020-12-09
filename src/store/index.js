import Vue from 'vue'
import Vuex from 'vuex'
import CityModule from './module/CityModule'
import CinemaModule from './module/CinemaModule'
import TabbarModule from './module/TabbarModule'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  // 当城市切换后，我们手动点刷新的话，之前的情况是返回我们的默认值城市上海，
  // 加了持久化之后，我们切换到哪个城市，呢么刷新之后还是这个页面
  plugins: [createPersistedState({ storage: window.sessionStorage })],
  // 存放公共状态的
  state: {
    cinemaList: []
  },
  // 集中式修改状态 ,提供监控的功能，配合浏览器的vue小插件来看
  mutations: {

  },
  // 专门处理异步操作的
  actions: {

  },
  // 各个模块进行整合的地方
  modules: {
    CityModule,
    CinemaModule,
    TabbarModule
  }
})

// store 只是 存在内存中 ，根据垃圾回收机制，每次刷新页面就回收掉了
