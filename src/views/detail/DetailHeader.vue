<template>
    <div>
        <div class="goBack" @click='goback'>
            <i class="iconfont tubiao">&#xe697;</i>
        </div>
        <div class="title">{{title}}</div>
        <slot></slot>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '桃子'
    }
  },
  data () {
    return {

    }
  },
  methods: {
    goback () {
      this.$emit('backEvent')
    }
  }
}
</script>

<style lang="scss" scoped>
    .title{
        font-size: 17px;
        line-height: 44px;
        width: 100%;
        text-align: center;
    }
    .goBack{
        height: 30px;
        width: 30px;
        border-radius: 50%;
        line-height: 30px;
        position: absolute;
        top: 5px;
        left: 5px;
        display: block!important;
        color:#ccc;
        z-index: 100;
        .tubiao{
            padding-left: 5px;
            font-size: 30px;
        }
    }

</style>
