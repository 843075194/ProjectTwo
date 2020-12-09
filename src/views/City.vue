<template>
  <div>
    <!-- 这个:index-list地方，可以用indexList这个数组，也可以用计算属性computedCityList -->
    <!-- <van-index-bar :index-list="indexList"> -->
      <!-- select 是 序列组件给提供的一个事件，有什么想要加的东西根据这个事件来触发 -->
    <van-index-bar :index-list="computedCityList" @select="handleSelect">
      <!-- 这个for循环是循环的每一个大项，比如A这个大项 -->
      <div v-for="data in cityList" :key="data.type">
        <van-index-anchor :index="data.type" />
        <!-- 这个for循环是循环的每一个小项，比如A大项里面的ai,au,ao这些 -->
        <van-cell :title="item.name" v-for="(item,index) in data.list"
          :key="index" @click="handeleChangePage(item.name,item.cityId)"/>
          <!-- 在这个点击事件里将item.name传进去，也就是把城市名传进去了 -->
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import Vue from 'vue'
import { IndexBar, IndexAnchor, Toast } from 'vant'
import http from '@/util/http'
import { mapMutations } from 'vuex'

Vue.use(IndexBar)
Vue.use(IndexAnchor).use(Toast)
export default {
  data () {
    return {
      indexList: [],
      cityList: [
        // {
        //   type: 'A',
        //   list: ['A1', 'A2', 'A3']
        // },
        // {
        //   type: 'B',
        //   list: ['B1', 'B2', 'B3']
        // },
        // {
        //   type: 'C',
        //   list: ['C1', 'C2', 'C3']
        // },
      ]
    }
  },
  computed: {
    computedCityList () {
      return this.cityList.map(item => item.type)
    }
  },
  mounted () {
    http({
      url: 'https://m.maizuo.com/gateway?k=7038301',
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then(res => {
      // console.log(res.data)
      // 这个地方     调用handleCityData函数  ，拿到我们处理过后的数组
      this.cityList = this.handleCityData(res.data.data.cities)
      console.log(this.cityList)
    })
  },
  methods: {
    ...mapMutations('CityModule', ['changeCityName', 'changeCityId']),
    // 这里的形参cities
    // 就是指代的上面的实参res.data.data.cities
    // 这个函数主要是为了将请求数据转化成我们想要的数据格式
    handleCityData (cities) {
      // console.log(cities)
      // 好比拿到的是这个值res.data.data.cities
      const letterArr = []
      const newCities = []
      const newArr = [] // 存储过滤后的数组的，有一些字母开头没有对应的城市
      // 先拿到26个英文字母的数组
      for (let code = 65; code < 91; code++) {
      // String.fromCharCode(code)这个方法可以把建码转换成对应的字母
        letterArr.push(String.fromCharCode(code))
      }
      // console.log(letterArr)  letterArr拿到的是一个26英文字母的数组
      // 这里根据上面拿到的26个英文字母的数组和传参数组cities进行比对
      // letterArr是26个英文字母的数组
      letterArr.forEach((data) => {
        // cities是我们请求回来的大数组数据，进行过滤
        const list = cities.filter((item) => item.pinyin.substring(0, 1).toUpperCase() === data)
        // 这个地方判断是为了过滤掉没有的字母开头，比如：字母O，下面就没有城市
        if (list.length > 0) {
          newCities.push({
            type: data,
            list: list
          })
          newArr.push(data)
        }
      })
      // console.log(newArr) // ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"]
      this.indexList = newArr
      // console.log(newCities)
      return newCities
    },
    handleSelect (index) {
      console.log(index)
      Toast(index)
    },
    handeleChangePage (name, cityId) { // 点击每一个城市的时候
      // 这个地方是城市的详情列表，返回的时候
      // 要在这个时候把cityId金额和cotyName名称记录下来
      // 在cinema.vue页面进行访问
      // this.$store.state.cityName = name // 在点击的时候把store的值给改了，也就是把全局的改了

      // this.$store.commit('changeCityName', name)
      // this.$store.commit('changeCityId', cityId)
      this.changeCityName(name)
      this.changeCityId(cityId)
      this.$router.back()
    }
  }
}
</script>

<style>
  .van-toast--text {
    min-width: 50px!important;
    min-height: 50px!important;
    border-radius: 100%;
    background-color:cyan;
  }
</style>
