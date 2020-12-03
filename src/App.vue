<template>
  <div class="app">
    <tabbar></tabbar>
    <router-view class="main"></router-view>
    <!-- 这里是插film组件的 http://localhost:8080/#/film-->
  </div>
</template>

<script>
import tabbar from './components/Tabbar'
import axios from 'axios'

export default {
  data () {
    return {}
  },
  components: {
    tabbar
  },
  mounted () {
    // ...

    // 1- 魅力慧网站，后端配置好了跨域，可以直接拿
    // axios.get('http://www.mei.com/appapi/home/mktBannerApp/v3?silo_id=2013000100000000008&platform_code=PLATEFORM_H5').then((res) => {
    //   console.log(res.data)
    // }).catch((err) => {
    //   console.log(err)
    // })

    // 2- 猫眼网站m.maoyan.com跨域的 设置vue.config.fs
    // axios.get('/ajax/movieOnInfoList?token=&optimus_uuid=0D6BB550345111EBA7F4B7F5E54E4A3DEEA8307932F54804A68BDB51BB467210&optimus_risk_level=71&optimus_code=10').then((res) => {
    //   console.log(res.data)
    // }).catch((err) => {
    //   console.log(err)
    // })

    // 3- 卖座网站  需要设置请求头headers
    axios({
      url: 'https://m.maizuo.com/gateway?cityId=310100&pageNum=1&pageSize=20&type=1&k=7274781',
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606882441751426003271681","bc":"310100"}',
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      // console.log(res.data)
    })
  }
}
</script>

<style lang="scss">
body,ol,ul,h1,h2,h3,h4,h5,h6,p,th,td,dl,dd,form,fieldset,legend,input,textarea,select{margin:0;padding:0;box-sizing:border-box;}
a{color:#172c45;text-decoration:none}
a:hover{color:#cd0200;text-decoration:none}
em{font-style:normal}
li{list-style:none}
img{border:0;vertical-align:middle}
table{border-collapse:collapse;border-spacing:0}
p{word-wrap:break-word}
// .main{height: 480px;box-sizing:border-box;overflow: auto;}
// .app{display: flex;flex-direction: column;height: 100%;box-sizing:border-box;}
// body{display: flex;flex-direction: column;height: 100%;box-sizing:border-box;}

</style>
