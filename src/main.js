import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router, // this.$router就可以拿到这个路由
  store, // this.store就可以拿到这个对象
  render: h => h(App)
}).$mount('#app')
