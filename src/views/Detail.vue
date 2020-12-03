<template>
    <div>
        detail
    </div>
</template>

<script>
export default {
  mounted () {
    console.log('利用获取的id,ajax请求后端接口' + location.hash)
    // 利用获取的id,ajax请求后端接口#/detail/333
    console.log(this.$route.params.myid)
    // 这个地方拿到的route是当前的路由对象，是小对象
    // console.log(this.$route.query.id)// 对应3- query方式跳转详情
  }
}
</script>
