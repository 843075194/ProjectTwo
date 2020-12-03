<template>
    <div>
        detail
    </div>
</template>

<script>
// import axios from 'axios'
// import http from '../util/http'
// 别名 @ ==> src的绝对路径 文件都从src开始找
import http from '@/util/http'
export default {
  mounted () {
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
    })
  }
}
</script>
