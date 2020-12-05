<template>
  <div class="navBar" :class="!hide ? '' : 'hide'">
    <!-- 点击返回按钮的时候，执行back函数，触发父组件navbackEvent事件 -->
      <div class="back" @click='back(aa)'>
          <i class="iconfont tubiao">&#xe697;</i>
      </div>
      <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['hide'],
  data () {
    return {
      aa: '我是子组件传过来的'
    }
  },
  methods: {
    back (aa) {
      this.$emit('navbackEvent', aa)
    }
  }
}
</script>

<style lang="scss" scoped>
.navBar {
    position: fixed;
    top: 0;
    left: 0;
    right:0;
    height: 44px;
    background-color: white;
    z-index: 10;
    text-align: center;
    line-height: 44px;
    transition: all .3s;
    h4 {
      transition: all .3s;
    }
    &.hide {
      background-color: transparent;
      h4 {
        color: transparent;
      }
    }
    .back {
      width: 30px;
      height: 30px;
      background-color: #ccc;
      font-size: 18px;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      position: absolute;
      top: 7px;
      left: 7px;
      opacity: .5;
    }
  }
</style>
