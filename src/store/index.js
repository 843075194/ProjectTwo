import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/util/http'

Vue.use(Vuex)

// store 定义了一个类似于全局的对象
export default new Vuex.Store({
  state: {
    cityId: '310100',
    cityName: '上海',
    isTabbarShow: true,

    cinemaList: []
  },
  // 集中式修改状态 ,提供监控的功能，配合浏览器的vue小插件来看
  mutations: {
    // 从City.vue中handeleChangePage方法来调用的这个函数
    changeCityName (state, name) {
      state.cityName = name
    },
    changeCityId (state, cityId) {
      state.cityId = cityId
    },
    hide (state) { // 在Detail.vue中调用
      state.isTabbarShow = false
    },
    show (state) {
      state.isTabbarShow = true
    },
    setCinemaList (state, cinemaList) {
      // state.cinemaList表示上面我们定义的state里面的cinemaList数组
      // 注：这个地方与Cinema.vue中this.cinemaList = res.data.data.cinemas类似
      //    只不过是分成了两步，先在actions里调用，然后在这里赋值
      state.cinemaList = cinemaList
    },
    // 注：clearCinemaList
    // 这个方法是为了当我们加载其他城市数据的时候，
    // 我们可以不用缓存的数据，而是重新请求新的数据
    // 也就是此时需要清空state.cinemaList=[],
    // 因为用缓存的地方cinema.vue中我们做了判断
    // if (this.$store.state.cinemaList.length === 0) 做了这条判断
    clearCinemaList (state) {
      state.cinemaList = []
    }
  },
  // 专门处理异步操作的
  actions: {
    getCinemaList (store, cityId) {
      return http({
        url: `gateway?cityId=${cityId}&ticketFlag=1&k=2991016`,
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then(res => {
        // 请求数据之后，我们再根据commit进行监听数据，然后调用setCinemaList方法赋值
        console.log(res.data)
        // 在这个地方请求的数据，然后拿到了cinemaList，在上面的方法里进行了赋值
        store.commit('setCinemaList', res.data.data.cinemas)
        // 这个地方与Cinema.vue中this.cinemaList = res.data.data.cinemas类似
        // res.data.data.cinemas表示我们请求回来的数据
      })
    }
  },
  modules: {
  }
})

// store 只是 存在内存中 ，根据垃圾回收机制，每次刷新页面就回收掉了
