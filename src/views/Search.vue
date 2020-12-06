<template>
  <div>
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
      <ul class="cinema-list">
        <!-- <li class="cinema-list-item" v-for="data in cinemaList" :key="data.cinemaId" > -->
        <!-- 这个地方最开始是用cinemaList来遍历的，但是现在我们利用vuex里的$store.state.cinemaList来做 -->
        <li class="cinema-list-item" v-for="data in computedCinemaList" :key="data.cinemaId" >
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
</template>

<script>
import Vue from 'vue'
import { Search, Toast } from 'vant'

Vue.use(Search)
export default {
  data () {
    return {
      value: ''
    }
  },
  computed: {
    // 因为实际状态下点到查询界面的时候，下面应该是没有数据的
    // 所以我们要做一个判断，一开始查询的时候不让他有数据
    computedCinemaList () {
      if (this.value === '') return [] // 这个地方可以简写掉大括号
      return this.$store.state.cinemaList
        .filter(item => item.name.toUpperCase()
          .includes(this.value.toUpperCase()) ||
          item.address.toUpperCase().includes(this.value.toUpperCase()))
    }
  },
  mounted () {
    // 这里做完这个判断，也就是说要么点击搜索这里进行请求数据
    // 要么在上一层city页面进行请求数据，两者一个请求了就可以，另一个界面用缓存数据
    if (this.$store.state.cinemaList.length === 0) {
      // vuex 异步流程
      this.$store.dispatch('getCinemaList', this.$store.state.cityId)
    } else {
      console.log('缓存')
    }
  },
  methods: {
    onSearch (val) {
      Toast(val)
    },
    onCancel () {
      // Toast('取消')
      // 这个地方用push , back , replace都可以
      // push一般适合列表跳详情,
      // back就是从刚才的界面退回来,
      // replace就是替换掉刚才的界面
      this.$router.replace('/cinema')
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
