<template>
  <div class="app">
    <tabbar v-show="isTabbarShow"></tabbar>
      <section>
        <transition enter-active-class="enter" leave-active-class="leave" mode="out-in">
          <router-view class="main"></router-view>
        </transition>
      </section>

    <!-- 这里是插film组件的 http://localhost:8080/#/film-->
  </div>
</template>

<script>
import tabbar from './components/Tabbar'
// import axios from 'axios'
import { mapState } from 'vuex' // export {mapState}

export default {
  data () {
    return {}
  },
  computed: {
    ...mapState('TabbarModule', ['isTabbarShow'])
    // =>...{isTabbarshow:()=>{}} 好比是拿到了这个函数isTabbarshow:()=>{}
  },
  mounted () {
    console.log(mapState('TabbarModule', ['isTabbarShow']))
  },
  components: {
    tabbar
  }
  // mounted () {
  // ...

  // 1- 魅力慧网站，后端配置好了跨域，可以直接拿
  // axios.get('http://www.mei.com/appapi/home/mktBannerApp/v3?silo_id=2013000100000000008&platform_code=PLATEFORM_H5')
  // .then((res) => {
  //   console.log(res.data)
  // }).catch((err) => {
  //   console.log(err)
  // })

  // 2- 猫眼网站m.maoyan.com跨域的 设置vue.config.fs
  // axios.get('/ajax/movieOnInfoList?token=&optimus_uuid=0D6BB550345111EBA7F4B7F5E54E4A3DEEA8307932F54804A68BDB51BB467210&optimus_risk_level=71&optimus_code=10')
  //   .then((res) => {
  //     console.log(res.data)
  //   }).catch((err) => {
  //     console.log(err)
  //   })

  // 3- 卖座网站  需要设置请求头headers
  // axios({
  //   url: 'https://m.maizuo.com/gateway?cityId=310100&pageNum=1&pageSize=20&type=1&k=7274781',
  //   headers: {
  //     'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606882441751426003271681","bc":"310100"}',
  //     'X-Host': 'mall.film-ticket.film.list'
  //   }
  // }).then(res => {
  //   console.log(res.data)
  // })
  // }
}
</script>

<style lang="scss">
body,ol,ul,h1,h2,h3,h4,h5,h6,p,th,td,dl,dd,form,fieldset,legend,input,textarea,select{margin:0;padding:0;box-sizing:border-box;}
a{color:#172c45;text-decoration:none}
a:hover{color:orange;text-decoration:none}
em{font-style:normal}
li{list-style:none}
img{border:0;vertical-align:middle}
table{border-collapse:collapse;border-spacing:0}
p{word-wrap:break-word}
html,body{
  height: 100%;
  background-color: #f4f4f4;
}
section{
  margin-bottom: 50px;
}
*{
  touch-action:manipulation;
}
 .enter{
    animation:donghua .3s ease 0s reverse;
  }
  .leave {
    animation :donghua .3s ease 0s
  }

  @keyframes donghua {
    from {
      opacity:1;
      transform :translateY(0)
    }
    to{
      opacity:0;
      transfrom:translateY(30px)
    }
  }
</style>
