<template>
  <!-- 因为页面在最开始的时候会加载一次，这个时候我们的filminfo没有值，所以会报错 -->
  <!-- 所以我们需要在一开始的时候做个判断，如果是假就不加载,{},[]都是true，所以用null -->
    <div v-if="filminfo" >
      <!-- 这个组件是顶部导航栏 -->
      <div v-if="!isPhotos">
        <detail-header v-top :title="filminfo.name"  @backEvent='goback'></detail-header>

        <div :style="{backgroundImage:'url('+filminfo.poster+')'}"
        style="height:300px;background-size:cover;background-position:">
        </div>
        <div class="goBack"></div>
        <div class="film-detail">
          <div class="col">
            <div class="film-name">
              <span class="name">{{filminfo.name}}</span>
              <span class="item">{{filminfo.filmType.name}}</span>
            </div>
            <div class="film-grade">
              <span class="grade">{{filminfo.grade | gradeFilter}}分</span>
            </div>
          </div>
          <div class="film-category grey-text">{{filminfo.category}}</div>
          <div class="film-premiere-time grey-text">{{filminfo.premiereAt | dateFilter}} 上映</div>
          <div class="film-nation-runtime grey-text">{{filminfo.nation}} | {{filminfo.runtime}} 分钟</div>
          <div class="film-synopsis grey-text " :class="isTrue ? 'hidde' : '' ">
            {{filminfo.synopsis}}
          </div>
          <div class="toggle" @click="toggle">
            <i class="iconfont" v-if="tubiao">&#xe6a6;</i>
            <i class="iconfont" v-else>&#xe6a5;</i>
          </div>
        </div>
        <div class="actors">
            <div class="actors-title-bar">
              <span class="actors-title-text">演职人员</span>
            </div>
            <!-- 这个地方是父组件在引用子组件，所以detail-swiper是子组件 -->
            <detail-swiper :perslide="4" :spacebetween='20' class="actors-detail-swiper" swiperclass='actors-detail-swiper'>
              <div class="swiper-slide swiper-actors" v-for="(data,index) in filminfo.actors" :key="index">
                  <div class="boxactors-item">
                    <div class="lazy-img-wrap">
                      <img :src="data.avatarAddress" alt=""/>
                    </div>
                    <span class="actors-name">{{data.name}}</span>
                    <span class="actors-role">{{data.role}}</span>
                  </div>
              </div>
            </detail-swiper>
        </div>
        <div class="photos">
            <div class="photos-title-bar">
              <span class="photos-title-text">剧照</span>
              <!-- isPhotos在这个地方变成了true，所以上面的div执行if语句被隐藏，下面的div执行v-else语句显示 -->
              <span class="photos-to-all" @click='isPhotos=true'>全部({{filminfo.photos.length}})</span>
            </div>
            <detail-swiper :perslide="2" :spacebetween='20' class="photos-detail-swiper" swiperclass='photos-detail-swiper'>
              <div class="swiper-slide swiper-photos" v-for="(data,index) in filminfo.photos" :key="index">
                    <div class="lazy-img-wrapphotos" @click = 'handlePreview(index)'>
                      <img :src="data" alt=""/>
                    </div>
              </div>
            </detail-swiper>
        </div>
      </div>
      <div v-else>
        <!-- 这个地方的事件是在Navbar组件点击回退按钮时执行的，上一步isPhotos是true，此时变成了false -->
        <NavBar @navbackEvent='navtoggle' :hide='false'>
          <h4>剧照({{filminfo.photos.length}})</h4>
          <ul class='photos-list'>
            <li class='photos-list-item' v-for="(data,index) in filminfo.photos" :key="index">
              <img :src="data" alt=""/>
            </li>
          </ul>
      </NavBar>
      </div>
    </div>
</template>

<script>
// import axios from 'axios'
// import http from '../util/http'
// 别名 @ ==> src的绝对路径 文件都从src开始找
import http from '@/util/http'
import Vue from 'vue'
import moment from 'moment'
import detailSwiper from './detail/DetailSwiper'
import detailHeader from './detail/DetailHeader'
import NavBar from '../components/Navbar'
import { ImagePreview } from 'vant'

Vue.filter('dateFilter', (date) => {
  return moment(date * 1000).format('YYYY-MM-DD')
})
Vue.filter('gradeFilter', (grade) => {
  if (grade === undefined) {
    return '暂无评'
  }
  return grade
})

Vue.directive('top', {
  inserted (el) {
    console.log(el)
    // el.style.display = 'none'
    el.className = 'film-header'
    window.onscroll = () => {
      var bodyTop = document.body.scrollTop || document.documentElement.scrollTop
      if (bodyTop > 50) {
        // el.style.display = 'block'
        el.className = 'film-header show-film-header'
      } else {
        // el.style.display = 'none'
        el.className = 'film-header'
      }
    }
  },
  unbind () {
    // window.onscroll的这个事件需要销毁
    window.onscroll = null
  }
})
export default {
  data () {
    return {
      filminfo: null,
      isTrue: 'true',
      tubiao: true,
      isPhotos: false
    }
  },
  components: {
    detailSwiper,
    detailHeader,
    NavBar
  },
  methods: {
    toggle: function () {
      this.isTrue = !this.isTrue
      this.tubiao = !this.tubiao
    },
    goback () {
      this.$router.back()
    },
    navtoggle (data) {
      console.log(data) // 我是子组件传过来的
      this.isPhotos = !this.isPhotos
    },
    handlePreview (index) {
      ImagePreview({
        images: this.filminfo.photos,
        startPosition: index,
        loop: false,
        closeable: true
      })
    }
    // scroll () {
    //   var bodyTop = document.body.scrollTop || document.documentElement.scrollTop
    //   this.navBarShow = bodyTop >= 50
    // }
  },
  mounted () {
    // 现在统一加到http.js里了
    // Toast.loading({
    //   message: '变可爱ing...',
    //   forbidClick: true,
    //   loadingType: 'spinner',
    //   overlay: false,
    //   closeOnClickOverlay: true,
    //   duration: 0
    // })
    // console.log('利用获取的id,ajax请求后端接口' + location.hash)
    // 利用获取的id,ajax请求后端接口#/detail/333
    // 这个地方拿到的route是当前的路由对象，是小对象
    // console.log(this.$route.query.id)// 对应3- query方式跳转详情
    console.log(this.$route.params.myid)

    // 1、直接用axios的写法
    // axios({
    //   url: `https://m.maizuo.com/gateway?filmId=${this.$route.params.myid}`,
    //   headers: {
    //     'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606882441751426003271681","bc":"310100"}',
    //     'X-Host': 'mall.film-ticket.film.info'
    //   }
    // }).then(res => {
    //   console.log(res.data.data.film)
    // })

    // 2、 在util文件夹用封装过的http.js文件来写
    http({
      url: `gateway?filmId=${this.$route.params.myid}`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      console.log(res.data.data.film)
      this.filminfo = res.data.data.film

      // 清除弹出提示框   现在统一加到http.js里了
      // Toast.clear()
    })
  }
}
</script>
<style lang="scss" scoped>

  .film-detail{
    padding: 15px;
    padding-top: 12px;
    background-color: #fff;
    .col{
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: start;
      -ms-flex-pack: start;
      justify-content: flex-start;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      .film-name{
        width: 256px;
        span{
          vertical-align: middle;
        }
        .name{
          color: #191a1b;
          font-size: 18px;
          height: 24px;
          line-height: 24px;
          margin-right: 7px;
        }
        .item{
          font-size: 9px;
          color: #fff;
          background-color: #d2d6dc;
          height: 14px;
          line-height: 14px;
          padding: 0 2px;
          border-radius: 2px;
          display: inline-block;
        }
      }
      .film-grade{
          width: calc(100% - 250px);
          text-align: right;
          color: #ffb232;
          .grade{
            font-size: 18px;
            font-style: italic;
          }
      }
    }
    .grey-text{
        font-size: 15px;
        color: #797d82;
        margin-top: 6px;
      }
      .film-synopsis{
        height: 115px;
        margin-top: 12px;
        -webkit-transition: height .5s ease;
        -o-transition: height .5s ease;
        transition: height .5s ease;
      }
      .hidde{
        height: 33px!important;
        overflow: hidden;
        // -webkit-transition: height .5s ease;
        // -o-transition: height .5s ease;
        // transition: height .5s ease;
      }
      .toggle{
          text-align: center;
          display: block;
          height: auto;
          width: 20px;
          margin: auto;
          line-height: normal;
          i{
            font-size: 20px;
          }
      }
  }
  .actors,.photos{
    margin-top: 10px;
    background-color: #fff;
    .actors-title-bar{
      width: 100%;

      .actors-title-text{
        font-size: 16px;
        text-align: left;
        color: #191a1b;
        display: inline-block;
        height: 22.5px;
        line-height: 22px;
        padding:15px;
      }
    }
  }
  .swiper-container{
    height: 165px;
    background: rgb(255, 255, 255);
    .swiper-wrapper{
      // display: -webkit-box;
      // display: -ms-flexbox;
      // display: flex;
      // -webkit-box-pack: start;
      // -ms-flex-pack: start;
      // justify-content: flex-start;
      // -webkit-box-align: center;
      // -ms-flex-align: center;
      align-items: center;
      position: relative;
      width: 100%;
      padding-bottom: 5px;
      .swiper-slide{
        cursor: pointer;
        display: block;
        float: left;
        position: relative;
        margin-right: 10px;
        width: 85px;
        min-width: 85px;
        .boxactors-item{
          width: 85px;
          height: 131px;
          .lazy-img-wrap{
            width: 85px;
            // height: 85px;
            background: rgb(249, 249, 249);
            opacity: 1;
            display: block;
            img{
              width: 100%;
            }
          }
          .lazy-img-wrap:nth-of-type(1){
            padding-left: 15px;
          }
          span{
              display: block;
              text-align: center;
            }
            .actors-name{
              padding-top: 10px;
              font-size: 12px;
              color: #191a1b;
              width: 85px;
              height: 18px;
              display: block;
              overflow: hidden;
              -o-text-overflow: ellipsis;
              text-overflow: ellipsis;
              white-space: nowrap;
              text-align: center;
              padding-left: 16px;
            }
            .actors-role{
              display: block;
              text-align: center;
              padding-bottom: 5px;
              font-size: 10px;
              color: #797d82;
              padding-left: 30px;
            }
        }
      }
    }
  }
  .lazy-img-wrapphotos{
      width: 156px;
      height: 100px;
      background: rgb(249, 249, 249);
      opacity: 1;
      display: block;
      padding-left:15px;
      img{
        height: 100%;
        width: 100%;
      }
    }
    .swiper-actors{
      width: 100px !important;
    }
    .swiper-photos{
      width: 150px !important;
    }
    .photos-title-bar{
      height: 62px;
      width: 100%;
      span{
        display: inline-block;
        height: 22.5px;
        line-height: 22px;
      }
      .photos-title-text{
          font-size: 18px;
          text-align: left;
          color: #191a1b;
          padding: 15px;
      }
      .photos-to-all{
          font-size: 16px;
          color: #797d82;
          float: right;
          padding: 15px;
      }
    }
    .photos-detail-swiper{
      height: 120px!important;
    }
    .photos{
      margin-bottom: 60px;
    }
    .film-header{
      position: fixed;
      background-color: hsla(0,0%,100%,0);
      color: transparent;
      -webkit-transition: all .3s ease;
      -o-transition: all .3s ease;
      transition: all .3s ease;
      width: 100vw;
      height: 44px;
      z-index: 1;
      // display: block!important;
    }
    .show-film-header{
      -webkit-transition: all .3s ease;
      -o-transition: all .3s ease;
      transition: all .3s ease;
      background-color: #fff;
      color: #191a1b;
      z-index: 20;
    }
.photos-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .photos-list-item {
      width: 110px;
      height:  110px;
      padding: 5px;
      padding-bottom: 2px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  div{
    -webkit-transition: all .3s ease;
      -o-transition: all .3s ease;
      transition: all .3s ease;
  }
</style>
