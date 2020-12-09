<template>
  <div>
    <!-- 这一块是film主页的顶部轮播图 -->
    <film-swiper v-if="imglist.length" :myoptions="zidingyi">
      <div class="swiper-slide" v-for="(data,index) in imglist" :key="index">
        <div :style=" {backgroundImage:'url('+data.poster+')'} "
          style="height:200px;background-size:cover;background-position:center" ></div>
      </div>
      <template #pagination>
        <div class="swiper-pagination"></div>
      </template>
      <!-- <template #button>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </template> -->
    </film-swiper>
    <!-- 这一块是film主页的顶部导航栏 -->
    <film-header style="position:sticky;top:0px;background:white;z-index:100"></film-header>
    <!-- 空出来给子组件显示的地方，也就是两列长list列表数据 -->
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import filmHeader from './film/filmHeader'
import filmSwiper from './film/FileSwiper'
export default {
  components: {
    filmHeader,
    filmSwiper
  },
  data () {
    return {
      imglist: [],
      zidingyi: {
        loop: true,
        // direction: 'vertical',
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        }
      }
    }
  },
  mounted () {
    axios({
      url: 'https://m.maizuo.com/gateway?cityId=310100&pageNum=1&pageSize=10&type=1&k=7274781',
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606882441751426003271681","bc":"310100"}',
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      console.log(res.data.data.films)
      this.imglist = res.data.data.films
    })
  }
}
</script>
<style lang="scss" scoped>
  .swiper-container {
      width: 100%;
      height: 200px;
    }
</style>
