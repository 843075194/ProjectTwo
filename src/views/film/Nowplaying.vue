<template>
    <main class="nowplaying">
      <!-- 用组件van-list来改装的列表数据 -->
      <!-- ul节点变成了van-list -->
       <van-list v-model="loading" :finished="finished"
          finished-text="总之就是非常可爱" @load="onLoad"
          :immediate-check="false" :offset="200" >
          <!-- li节点变成了van-cell -->
             <van-cell v-for="data in datalist" :key="data.id" @click="handleClick(data.filmId)">
              <!-- <a :href=" '#/film/'+ data.filmId "> -->
              <a href="javascript:;">
                <div class="lazy-img">
                  <img :src="data.poster" alt="">
                </div>
                <div class="nowPlayingFilm-info">
                  <div class="nowPlayingFilm-name info-col">
                    <span class="name">{{data.name}}</span>
                    <span class="item">{{data.item.name}}</span>
                  </div>
                  <div class="nowPlayingFilm-grade info-col">
                    <span class="label">观众评分 </span>
                    <span class="grade">{{data.grade}}</span>
                  </div>
                  <div class="nowPlayingFilm-actors info-col">
                    <span class="label">主演:{{data.actors | actorFilter}}</span>
                  </div>
                  <div class="nowPlayingFilm-detail info-col">
                    <span class="label">{{data.nation}} | {{data.runtime}} 分钟</span>
                  </div>
                </div>
                <div class="nowPlayingFilm-buy">购票</div>
              </a>
             </van-cell>
        </van-list>
    </main>
</template>
<script>
// import axios from 'axios'  原始写法，下面用封装过的http写法重写了
import Vue from 'vue'
import http from '@/util/http' // 这个函数是我们封装了axios之后的
import { List, Cell } from 'vant'
Vue.use(List).use(Cell) // 链式引入

Vue.filter('actorFilter', (actors) => {
  if (actors === undefined) {
    return '暂无主演'
  }
  return actors.map(item => item.name).join(' ')
})
export default {
  data () {
    return {
      datalist: [],
      loading: false,
      finished: false,
      current: 1,
      total: 0 // 总数据长度
    }
  },
  methods: {
    handleClick (filmId) {
      // console.log(filmId)
      this.$router.push(`/detail/${filmId}`)
    },
    onLoad () {
      console.log('到底啦')

      this.current++ // 表示每次滑到底部后就加载下一页的数据

      http({
        url: `gateway?cityId=${this.$store.state.cityId}&pageNum=${this.current}&pageSize=10&type=1&k=7274781`,
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
      // console.log(res.data.data.films)

        this.datalist = [...this.datalist, ...res.data.data.films]
        // 加载状态结束
        this.loading = false
        // 这个地方来判断是否还需要继续加载
        // 只要在别的页面滚动了，呢么切换回来之后就会触发一次onload事件，呢么此时就执行这个if语句，finished=true
        // 显然如果一开始就完成是不合理的，所以我们需要加一个判断条件
        if (this.datalist.length >= this.total && this.datalist.length !== 0) {
          this.finished = true
        }
      })
    }
  },
  mounted () {
    // 一开始就要请求一次数据
    http({
      url: `gateway?cityId=${this.$store.state.cityId}&pageNum=1&pageSize=10&type=1&k=7274781`,
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      // console.log(res.data.data.films)

      // datalist表示我们axios请求回来的全部数据
      this.datalist = res.data.data.films
      // total表示整个列表一共有多少条数据
      this.total = res.data.data.total
    })
  }
}
</script>

<style lang="scss" scoped>
.nowplaying{
  // flex:1;
  // overflow: auto;
  // 加上这句是让内容只出现在页面并且有滚动效果
  .van-list{
    list-style: none;
      padding: 0;
      margin-bottom: 0;
      margin-top: 0;
      .van-cell{
        // width: 100%;
        height: 142px;
        padding: 15px ;
        border-bottom: 1px solid #ededed;
        a{
            display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              -webkit-box-pack: start;
              -ms-flex-pack: start;
              justify-content: flex-start;
              -webkit-box-align: center;
              -ms-flex-align: center;
              align-items: center;
        .lazy-img{
                  width: 93px;
                  height: 105px;
                  position: relative;
                  float: left;
                  display: block;
                  img{
                      width: 100%;
                      position: absolute;
                  }
              }
        }

      .nowPlayingFilm-info{
        float: left;
        width: calc(100% - 170px);
        padding: 0 10px;
        .info-col{
          overflow: hidden;
          -o-text-overflow: ellipsis;
          text-overflow: ellipsis;
          white-space: nowrap;
          // width: 100%;
        }
        span{
          font-size: 13px;
          margin-top: 4px;
          color: #797d82;
        }
        .nowPlayingFilm-name{
          // margin-bottom: 10px;
            .item{
              font-size: 9px;
              color: #fff;
              background-color: #d2d6dc;
              height: 14px;
              line-height: 14px;
              padding: 0 2px;
              border-radius: 2px;
            }
            .name{
              max-width: calc(100% - 25px);
              color: #191a1b;
              font-size: 16px;
              height: 22px;
              line-height: 22px;
              margin-right: 5px;
              overflow: hidden;
              -o-text-overflow: ellipsis;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
        }
      }
    }
  }
}
        .nowPlayingFilm-buy{
              float: right;
              line-height: 25px;
              height: 25px;
              width: 50px;
              color: #ff5f16;
              font-size: 13px;
              text-align: center;
              border-radius: 2px;
              position: relative;
            }
            .nowPlayingFilm-buy::after {
                  content: " ";
                  -webkit-transform: scale(.5);
                  -ms-transform: scale(.5);
                  transform: scale(.5);
                  position: absolute;
                  border: 1px solid #ff5f16;
                  top: -50%;
                  right: -50%;
                  bottom: -50%;
                  left: -50%;
                  border-radius: 4px;
                }
</style>
