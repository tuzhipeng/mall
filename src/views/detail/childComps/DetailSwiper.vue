<template>
  <swiper v-if="images.length">
    <swiper-item v-for="(item, index) in images"
                 :key="index" class="swiper-item">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

	export default {
		name: "DetailSwiper",
    components: {
			Swiper,
      SwiperItem
    },
    props: {
			images: Array
    }
	}
</script>

<style scoped>
  .swiper-item {
    height: 400px;
  }
</style>
