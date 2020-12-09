<template>
  <div>
    <!-- 影院的顶部导航栏 -->
    <van-nav-bar title="影院" @click-left="onClickLeft()" @click-right="onClickRight()">
      <template #left style="font-size:13px">
        <!-- <span class="local">上海</span> -->
        <!-- 这个地方是根据store里index.js文件里写的state对象来的 -->
        <!-- 注：这里是store的城市名称 -->
        <!-- <span>{{$store.state.cityName}}</span> -->
        <span>{{cityName}}</span>
        <van-icon name="arrow-down" size="5" color="black" style="padding-left:3px"/>
      </template>
      <template #right>
        <van-icon name="search" size="23" color="black"/>
      </template>
    </van-nav-bar>
    <!-- 第二个导航栏 -->
    <div class="operate">
     <van-dropdown-menu>
        <van-dropdown-item v-model='cityQuId' :options="cityList" />
      </van-dropdown-menu>
       <van-dropdown-menu>
        <van-dropdown-item v-model='appId' :options="appList" />
      </van-dropdown-menu>
       <van-dropdown-menu>
        <van-dropdown-item v-model='whereId' :options="whereList" />
      </van-dropdown-menu>
    </div>
    <!-- 影院列表 -->
    <div class="cinema-list-wrap" :style="{height:height}">
      <ul class="cinema-list">
        <!-- <li class="cinema-list-item" v-for="data in cinemaList" :key="data.cinemaId" > -->
        <!-- 这个地方最开始是用cinemaList来遍历的，但是现在我们利用vuex里的$store.state.cinemaList来做 -->
        <!-- <li class="cinema-list-item" v-for="data in $store.state.cinemaList" :key="data.cinemaId" > -->
          <!-- 现在通过vuex-modules来修改--对应...mapState('CinemaModule', ['cinemaList']) -->
        <li class="cinema-list-item" v-for="data in cinemaListGetByDistrictName" :key="data.cinemaId" >
          <a href="javascript:;" class="cinema-item-wrap">
            <div class="cinema-info-lf cinema-info">
            <span class="cinema-name">{{data.name}}</span>
            <span class="cinema-address">{{data.address}}</span>
          </div>
          <div class="cinema-info-rt cinema-info">
            <div>
              <span class="cinema-lowPrice price-fmt">
                <span>￥</span>
                <span class="interge">{{data.lowPrice | lowPriceFilter}}</span>
              </span>
              <span class="upon"> 起</span>
            </div>
            <span class="cinema-gpsAddress">距离未知</span>
          </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import http from '@/util/http'
import Vue from 'vue'
import BetterScroll from 'better-scroll'
import { NavBar, Icon, DropdownMenu, DropdownItem } from 'vant'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

Vue.use(NavBar).use(Icon).use(DropdownItem).use(DropdownMenu)

Vue.filter('lowPriceFilter', (lowPrice) => {
  return lowPrice / 100
})

export default {
  components: {

  },
  data () {
    return {
      // cinemaList: [],
      height: 0
    }
  },
  computed: {
    ...mapState('CinemaModule', ['cinemaList', 'cityList', 'appList', 'whereList']),
    ...mapState('CityModule', ['cityId', 'cityName']),
    ...mapGetters('CinemaModule', ['cinemaListGetByDistrictName']),
    cityQuId: {
      get () {
        // console.log(this.$store.state.CinemaModule)
        return this.$store.state.CinemaModule.cityQuId
      },
      set (value) {
        this.$store.state.CinemaModule.cityQuId = value
      }
    },
    appId: {
      get () {
        return this.$store.state.CinemaModule.appId
      },
      set (value) {
        this.$store.state.CinemaModule.appId = value
      }
    },
    whereId: {
      get () {
        return this.$store.state.CinemaModule.whereId
      },
      set (value) {
        this.$store.state.CinemaModule.whereId = value
      }
    }
  },
  mounted () {
    // 要在这个地方访问到cityName,cityId
    // 在此之后，在city.vue页面进行记录
    this.height = document.documentElement.clientHeight - 200 + 'px'

    // 这个地方也就是想表达如果是第一次请求，呢么我们就获取数据,否则我们就用之前请求回来的数据，也就是缓存数据
    if (this.cinemaList.length === 0) {
      // vuex 异步流程  dispatch 发送
      this.getCinemaList(this.cityId) // 对应store里index.js中的actions
        .then(res => {
          this.$nextTick(() => {
            new BetterScroll('.cinema-list-wrap', {
              scrollbar: {
                fade: true
              }
            })
          })
        })
    } else {
      console.log('缓存')
      // 因为上面$store.dispatch是为了留下缓存数据，
      // 所以当不请求数据的时候，我们需要再执行一下这个插件
      this.$nextTick(() => {
        new BetterScroll('.cinema-list-wrap', {
          scrollbar: {
            fade: true
          }
        })
      })
    }
  },
  methods: {
    ...mapMutations('CinemaModule', ['clearCinemaList', 'clearCityList']),
    ...mapActions('CinemaModule', ['getCinemaList']),
    // 左边的City按钮
    onClickLeft () {
      console.log('返回')
      // 这个地方重新提交数据，清除缓存数据
      // this.$store.commit('clearCinemaList')
      this.clearCityList()
      this.clearCinemaList()
      this.$router.push('/city')
    },
    // 右边的搜索按钮
    onClickRight () {
      console.log('按钮')
      this.$router.push('/cinema/search')
    }
  }
}
</script>

<style lang="scss" scoped>
  .cinema-list-wrap{
    padding-bottom: 49px;
    z-index: 100;
    overflow: hidden;
    position: relative;
    // 加相对定位是为了修正滚动条的位置
    // height: 500px;
    .cinema-list{
      list-style: none;
      padding: 0;
      margin: 0;
      .cinema-list-item{
        position: relative;
        background-color: #fff;
        padding: 15px;
        .cinema-item-wrap{
          width: 100%;
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          /* -webkit-box-pack: start; */
          -ms-flex-pack: start;
          justify-content: flex-start;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          .cinema-info-lf{
            width: calc(100% - 87px);
            text-align: left;
            padding-right: 15px;
            float: left;
            span{
              display: block;
              max-width: 80%;
              overflow: hidden;
              -o-text-overflow: ellipsis;
              text-overflow: ellipsis;
              white-space: nowrap;
              float: left;
              }
              .cinema-name{
                color: #191a1b;
                font-size: 15px;
                float: left;
                padding-right: 155px;
                }
              .cinema-address{
                color: #797d82;
                font-size: 12px;
                margin-top: 5px;
              }
          }
        }
        .cinema-info-rt{
          width: 70px;
          text-align: center;
          float: right;
          margin-right: -5px;
          .price-fmt{
            float: none!important;
            font-size: 15px;
            color: #ff5f16;
            height: 0!important;
            display: inline-table!important;
            .interge{
              font-size: 15px;
              }
            }
          .upon{
            color: #ff5f16;
            font-size: 10px;
          }
          .cinema-gpsAddress{
            display: block;
            font-size: 11px;
            color: #797d82;
            margin-top: 5px;
          }
        }
      }
    }
  }
  .local{
    font-size: 13px;
  }
.operate {
    display: flex;
    position: relative;
    z-index: 255;
    .van-dropdown-menu {
      flex: 1;
    }
  }
</style>
