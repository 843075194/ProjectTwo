import http from '@/util/http'

const mudule = {
  namespaced: true, // 命名空间
  state: {
    cinemaList: [],
    cityQuId: 0,
    cityList: [
      { text: '全城', value: 0 }
    ],
    appId: 0,
    appList: [
      { text: 'app订票', value: 0 },
      { text: '前台兑换', value: 1 }
    ],
    whereId: 0,
    whereList: [
      { text: '最近去过', value: 0 },
      { text: '离我最近', value: 1 }
    ]
  },
  getters: { // 这个往计算机属性computed里写
    cinemaListGetFive (state) {
      return state.cinemaList.slice(0, 5)
    },
    // 4、根据市区选择影院
    cinemaListGetByDistrictName (state) {
      // cityQuId 与 cityList结合 找到当前选择的 市区名称
      var cityObj = state.cityList.find(item => item.value === state.cityQuId)
      // 额外判定 如果是全城 就不必再过滤了
      if (cityObj.text === '全城') {
        return state.cinemaList
      }
      // 再根据市区名称过滤出所有影院中地区是该名称的影院
      // 市北的，把所有市北的找出来
      return state.cinemaList.filter(item => item.districtName === cityObj.text)
    }
  },
  mutations: {
    setCinemaList (state, cinemas) {
      // state.cinemaList表示上面我们定义的state里面的cinemaList数组
      // 注：这个地方与Cinema.vue中this.cinemaList = res.data.data.cinemas类似
      //    只不过是分成了两步，先在actions里调用，然后在这里赋值
      state.cinemaList = cinemas
    },
    clearCinemaList (state) {
      state.cinemaList = []
    },
    clearCityList (state) {
      state.cityQuId = 0
      state.cityList = [
        { text: '全城', value: 0 }
      ]
    },
    // 注：clearCinemaList
    // 这个方法是为了当我们加载其他城市数据的时候，
    // 我们可以不用缓存的数据，而是重新请求新的数据
    // 也就是此时需要清空state.cinemaList=[],
    // 因为用缓存的地方cinema.vue中我们做了判断
    // if (this.$store.state.cinemaList.length === 0) 做了这条判断
    updateCityList (state, value) {
      console.log(value)
      var arr = state.cityList.concat(value) // 为了加上第一项 {全城 index:0}
      state.cityList = arr
    }
  },

  actions: {
    getCinemaList (store, cityId) { // 对应cinema.vue , 请求影院城市信息
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
        // 1、 过滤出所有的区县

        var arr = res.data.data.cinemas.map(value => value.districtName)
        var NewArr = [...new Set(arr)] // 去重后的区县
        var arr1 = NewArr.map((value, index) => {
          return { text: value, value: index + 1 }
          // 去重后的区县+相应的下标
          // 2、调用mutations的方法将数据更新
        })
        store.commit('updateCityList', arr1)
      })
    }
  }
}

export default mudule
