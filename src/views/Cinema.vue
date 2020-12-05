<template>
  <div>
    <div class="cinema-list-wrap" :style="{height:height}">
      <ul class="cinema-list">
        <li class="cinema-list-item" v-for="data in cinemaList" :key="data.cinemaId" >
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
import http from '@/util/http'
import Vue from 'vue'
import BetterScroll from 'better-scroll'
Vue.filter('lowPriceFilter', (lowPrice) => {
  return lowPrice / 100
})
export default {
  data () {
    return {
      cinemaList: [],
      height: 0
    }
  },
  mounted () {
    this.height = document.documentElement.clientHeight - 50 + 'px'
    http({
      url: 'gateway?cityId=310100&ticketFlag=1&k=2991016',
      headers: {
        'X-Host': 'mall.film-ticket.cinema.list'
      }
    }).then(res => {
      console.log(res)
      this.cinemaList = res.data.data.cinemas

      // 状态立即更改，但是dom异步渲染

      this.$nextTick(() => {
        new BetterScroll('.cinema-list-wrap', {
          scrollbar: {
            fade: true
          }
        })
      })
    })
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

</style>
