<template>
    <div >
        comingsoon
        <ul>
            <li v-for="data in datalist" :key="data.id" @click="handleClick(data.id)">
                {{data.title}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  data () {
    return {
      datalist: [
        { id: 111, title: '小橙子' },
        { id: 222, title: '酱紫也' },
        { id: 333, title: '小橘子' }
      ]
    }
  },
  methods: {
    handleClick (id) {
      console.log(id)

      // 1- 根据路径进行路由的跳转
      this.$router.push(`/detail/${id}`)

      // 2- 根据路由名字进行跳转
      //   this.$router.push({
      //     name: 'kerwinDetail',
      //     params: {
      //       myid: id
      //     }
      //   })
    }
  }
}
</script>
