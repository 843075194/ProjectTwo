<template>
  <div class="swiper-container" :class="swiperclass">
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
  props: {
    perslide: {
      type: Number,
      default: 1
    },
    spacebetween: {
      type: Number,
      default: 10
    },
    swiperclass: {
      type: String,
      default: 'swiper-container'
    }
  },
  mounted () {
    console.log(this.swiperclass)
    // new Swiper('.swiper-container', {
    new Swiper('.' + this.swiperclass, {
      // loop: true,
      slidesPerView: this.perslide,
      spaceBetween: this.spacebetween,
      freeMode: true
    })
  }

}
</script>

<style>

</style>
