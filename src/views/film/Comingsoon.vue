<template>
    <main class="comingsoon">
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
              <div class="comingSoonFilm-buy">预购</div>
              </a>
            </van-cell>
        </van-list>
    </main>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
import { List, Cell, Toast } from 'vant'
import { mapState } from 'vuex'
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
  computed: {
    ...mapState('CityModule', ['cityId'])
  },
  methods: {
    handleClick (id) {
      console.log(id)
      // 1- 根据路径进行路由的跳转
      this.$router.push(`/detail/${id}`)

      // 2- 根据路由名字进行跳转
      //   this.$router.push({
      //     name: 'kerwinDetail',
      //     params: {
      //       myid: id
      //     }
      //   })
    },
    onLoad () {
      console.log('到底啦')
      this.current++ // 表示每次滑到底部后就加载下一页的数据
      axios({
        url: `https://m.maizuo.com/gateway?cityId=${this.cityId}&pageNum=${this.current}&pageSize=10&type=2&k=177673`,
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606882441751426003271681","bc":"310100"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        console.log(res.data.data.films)

        this.datalist = [...this.datalist, ...res.data.data.films]
        // 加载状态结束
        this.loading = false

        if (this.datalist.length >= this.total) {
          this.finished = true
        }
      })
    }
  },
  mounted () {
    // Toast表示加载时候给的提示，loading表示在加载中
    Toast.loading({
      message: '变可爱ing...',
      forbidClick: true,
      loadingType: 'spinner',
      overlay: false,
      closeOnClickOverlay: true,
      duration: 0
    })
    // 这里我们用axios进行数据请求，另一个页面我们用封装过的http进行请求
    axios({
      url: `https://m.maizuo.com/gateway?cityId=${this.cityId}&pageNum=1&pageSize=10&type=2&k=177673`,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606882441751426003271681","bc":"310100"}',
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      console.log(res.data.data.films)
      this.datalist = res.data.data.films
      this.total = res.data.data.total

      // 清除Toast弹出提示框
      Toast.clear()
    })
  }
}
</script>

<style lang="scss" scoped>
.comingsoon{
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
      .comingSoonFilm-buy{
          float: right;
          line-height: 25px;
          height: 25px;
          width: 50px;
          color: #ffb232;
          font-size: 13px;
          text-align: center;
          border-radius: 2px;
          position: relative;
        }
      }
  }
}
      .comingSoonFilm-buy::after {
              content: " ";
              -webkit-transform: scale(.5);
              -ms-transform: scale(.5);
              transform: scale(.5);
              position: absolute;
              border: 1px solid #ffb232;
              top: -50%;
              right: -50%;
              bottom: -50%;
              left: -50%;
              border-radius: 4px;
            }

</style>
