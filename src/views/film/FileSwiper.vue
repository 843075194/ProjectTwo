<template>
  <div class="swiper-container kerwin">
        <div class="swiper-wrapper">
          <slot></slot>
        </div>
        <slot name="pagination"></slot>
        <slot name="button"></slot>
      </div>
</template>

<script>
// import Vue from 'vue'
import Swiper from 'swiper/bundle'
import 'swiper/swiper-bundle.min.css'
export default {
  props: ['myoptions'],
  mounted () {
    // 这一个对象是定义的主体配置，下面的this.myoptions是我们自主设置的
    var baseoptions = {
      loop: true,
      // direction:"vertical",
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      spaceBetween: 30,
      centeredSlides: true
    }
    // Object.assign(obj1,obj2)是合并对象的方法
    // 如果两个对象有相同的属性，但是值不同，呢么后面一个对象的值会覆盖前面一个对象的值
    new Swiper('.kerwin', Object.assign(baseoptions, this.myoptions))
  }

}
</script>

<style>

</style>
