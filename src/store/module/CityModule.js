const mudule = {
  namespaced: true, // 命名空间
  state: {
    cityId: '310100',
    cityName: '上海'
  },

  mutations: {
    // 从City.vue中handeleChangePage方法来调用的这个函数
    changeCityName (state, name) { // 在city.vue中调用
      state.cityName = name
    },
    changeCityId (state, cityId) { // 在city.vue中调用
      state.cityId = cityId
    }
  },

  actions: {

  }
}

export default mudule
