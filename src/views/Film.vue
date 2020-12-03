<template>
  <div>
    <div style="height:100px;background:yellow">大型轮播图展示大型轮播图展示大型轮播图展示大型轮播图展示</div>
    <film-header style="position:sticky;top:0px;background:white;z-index:100"></film-header>
    <router-view></router-view>
    <!-- 这里是插film子组件的地方 -->
  </div>
</template>

<script>
import filmHeader from './film/filmHeader'
export default {
  components: {
    filmHeader
  }
}
</script>
