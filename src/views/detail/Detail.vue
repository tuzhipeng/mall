<template>
    <div id="detail">
      <detail-nav-bar @titleClick="selectIndex" :current-index="currentIndex"/>
      <scroll class="content"
              ref="scroll"
              @scroll="contentScroll"
              :probe-type="3">
        <detail-swiper :images="this.topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
        <detail-param-info ref="param" :param-info="paramInfo"/>
        <detail-comment-info ref="comment" :comment-info="commentInfo"/>
        <goods-list ref="recommend" :goods="goodsList"/>
      </scroll>
      <back-top v-show="showBackTop" @click.native="backTop"/>
      <DetailBottomBar @addToCart="addToCart"/>
    </div>
</template>

<script>
  import {getDetail, getRecommend,Goods,Shop,GoodsParam} from "network/detail";
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import Scroll from "components/common/scroll/Scroll";
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import GoodsList from "components/content/goods/GoodsList";
  import BackTop from "../../components/content/backTop/BackTop";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  export default {
    name: "Detail",
    components: {
      DetailBottomBar,
      BackTop,
      GoodsList,
      DetailCommentInfo,
      DetailParamInfo,
      DetailGoodsInfo,
      DetailShopInfo,
      Scroll,
      DetailSwiper,
      DetailNavBar,
      DetailBaseInfo
    },
    // mixin:[backTopMixin],
    data(){
      return {
        iid:'',
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        goodsList: [],
        themeTops: [],
        currentIndex:0,
        showBackTop:false
      }
    },
    created() {
      this.iid = this.$route.query.iid
      this.getDetail(this.iid)
      this.getRecommend()
    },
    mounted(){

      this.$bus.$on('detailImageLoad', () =>{
        // refresh()
        this.$refs.scroll.refresh()
      })
    },
    methods:{
      addToCart(){
        console.log("加入购物车");
        const obj = {}
        obj.iid = this.iid
        obj.imgURL = this.topImages[0]
        obj.title = this.goods.title
        obj.desc = this.goods.desc
        obj.price = this.goods.realPrice
        obj.checked = true

        this.$store.dispatch('addToCart', obj)
      },
      backTop() {
        this.$refs.scroll.scrollTo(0, 0, 1000)
      },
      selectIndex(index){
        this.currentIndex = index
        this.$refs.scroll.scrollTo(0, -this.themeTops[index], 500)
        // console.log(index);
      },
      imageLoad(){
        this.$refs.scroll.refresh()
        // 获取对应的offsetTop
        this.themeTops = []
        this.themeTops.push(0)
        this.themeTops.push(this.$refs.param.$el.offsetTop)
        this.themeTops.push(this.$refs.comment.$el.offsetTop)
        this.themeTops.push(this.$refs.recommend.$el.offsetTop)
        this.themeTops.push(Number.MAX_VALUE)
      },
      contentScroll(position){
        // console.log(position.y);
        this.showBackTop = position.y <= -1000
        this.listenScrollTheme(-position.y)
      },
      listenScrollTheme(position){
        let length = this.themeTops.length
        for (let i = 0; i < length; i++) {
          let iPos = this.themeTops[i]
          if (position >= iPos && position < this.themeTops[i+1]){
            if(this.currentIndex !== i){
              this.currentIndex = i
            }
            break;
          }
        }
      },
      getDetail(iid){
        getDetail(iid).then(res =>{
          const data = res.result
          console.log(data);

          this.topImages = data.itemInfo.topImages

          // 3.获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

          // 4.获取店铺信息
          this.shop = new Shop(data.shopInfo)

          // 5.获取商品详细信息
          this.detailInfo = data.detailInfo

          // 6.保存参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

          // 7.保存评论数据
          if (data.rate.list) {
            this.commentInfo = data.rate.list[0];
          }
        })
      },
      getRecommend() {
        getRecommend().then(res => {
          console.log(res.data.list);
          this.goodsList = res.data.list
        })
      }
    }
  }
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 1;
    background-color: #fff;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 58px;
    left: 0;
    right: 0;
  }
</style>
