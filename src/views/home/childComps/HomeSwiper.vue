<template>
  <swiper v-if="banners.length">
    <SwiperItem v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoaded">
      </a>
    </SwiperItem>
  </swiper>

</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    props:{
      banners : {
        type:Array,
        default(){
          return []
        }
      }
    },
    data() {
      return {
        isLoaded: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods:{
      imageLoaded(){
        if (!this.isLoaded){
          this.$emit('swiperLoaded')
        }
        this.isLoaded = true
      }
    }
  }
</script>

<style scoped>

</style>
