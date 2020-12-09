const mudule = {
  namespaced: true, // 命名空间
  state: {
    isTabbarShow: true

  },

  mutations: {
    hide (state) { // 在Detail.vue中调用
      state.isTabbarShow = false // 控制App.vue中底部导航栏是否显示
    },
    show (state) {
      state.isTabbarShow = true
    }
  },

  actions: {

  }
}

export default mudule
