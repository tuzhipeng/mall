<template>
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <slot></slot>
      </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props:{
      probeType:{
        type:Number,
        default: 0
      },
      pullUpload:{
        type:Boolean,
        default: false
      }
    },
    data(){
      return {
        scroll: null,
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType:this.probeType,
        pullUpLoad: this.pullUpload
        // probeType：是否监听滚动位置
        // pullUpLoad: 是否监听到底上拉事件,L要大写
      })

      this.scroll.on('scroll', (position) =>{
        this.$emit('scroll', position)
      })

      this.scroll.on('pullingUp', ()=>{
        // console.log("发射pullingUP信号");
        this.$emit('pullingUp')

      })

    },
    methods:{
      scrollTo(x, y, time=500){
        this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        this.scroll.finishPullUp()
      },
      refresh(){
        console.log("刷新");
        this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>

</style>
