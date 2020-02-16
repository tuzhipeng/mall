<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>
    <tab-control ref="topTab" :titles="['流行','新款','精选']" v-show="showTabControl" class="tab-control" @tabClick="tabClick"></tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-upload="true"
            @scroll="contentScroll"
            @pullingUp="loadMore" >
    <HomeSwiper :banners="banner" @swiperLoaded="swiperLoaded"></HomeSwiper>
    <recommend-view :recommends="recommend"></recommend-view>
    <feature-view/>
    <tab-control ref="contentTab" :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick"/>
    <goods-list :goods="showGoods"/>

    </scroll>
    <back-top v-show="isShowBackTop" @click.native="backClick"/>

  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import {getHomeMutidata, getHomeGoods} from "network/home";
  import {debounce} from "common/Utils";
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  export default {
    name: "Home",
    components: {
      BackTop,
      Scroll,
      GoodsList,
      TabControl,

      HomeSwiper,
      RecommendView,
      FeatureView,

      NavBar
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    data(){
      return {
        banner : [],
        recommend:[],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType:'pop',
        tabOffsetTop:0,
        isShowBackTop:false,
        showTabControl:false
      }
    },
    created() {
      this.getHomeMutidata()

      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')



    },
    mounted() {
      // 直接refresh是用了防抖函数包装的，但效果好像并不理想啊，用原生的
      const refresh = debounce(this.$refs.scroll.refresh, 0)
      this.$bus.$on('itemImageLoad', () =>{
        // refresh()
        this.$refs.scroll.refresh()
      })
    },
    methods:{


      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = "pop"
            break;
          case 1:
            this.currentType = "new"
            break;
          case 2:
            this.currentType = 'sell'
            break
        }

        this.$refs.contentTab.currentIndex = index
        this.$refs.topTab.currentIndex = index
      },
      contentScroll(position){
        // console.log(position)
        this.isShowBackTop = (-position.y) > 1000
        this.showTabControl =(-position.y) > this.tabOffsetTop
      },
      loadMore() {
        console.log("执行loadMore");
        this.getHomeGoods(this.currentType)
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0)
      },
      swiperLoaded() {
        this.tabOffsetTop = this.$refs.contentTab.$el.offsetTop;
      },
      /*
      * 网络请求相关的方法
      * */
      getHomeMutidata(){
        getHomeMutidata().then( res => {
          // console.log(res);
          this.banner = res.data.banner.list;
          this.recommend = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        let page = this.goods[type].page + 1
        getHomeGoods(type, page).then( res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          // 通知scroll的上拉操作继续监听
          this.$refs.scroll.finishPullUp()
        })
      }
    }


  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

</style>
