<template>
    <div class="goods-item" @click="itemClick">
      <img v-lazy="showImage" alt="" @load="itemImageLoad">
      <div class="goods-info">
        <p>{{goodsItem.title}}</p>
        <span class="price">{{goodsItem.price}}</span>
        <span class="collect">{{goodsItem.cfav}}</span>
      </div>
    </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props:{
      goodsItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    computed:{
      showImage(){
        return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods:{
      itemImageLoad(){
        // console.log(this.$route.path);
        // console.log(this.$route.path.indexOf('home'));
        // console.log(this.$route.path.indexOf('detail'));
        if (this.$route.path.indexOf('home') >= 0){
          // console.log("首页imageload信号");
          this.$bus.$emit('itemImageLoad')
        }else if (this.$route.path.indexOf('detail') >= 0){
          // console.log("detail imageload信号");
          this.$bus.$emit('detailImageLoad')
        }else {
          // console.log("没有匹配");
        }

      },
      // 为了跳转到详情页
      itemClick(){
        const iid = this.goodsItem.iid;
        console.log(iid);
        this.$router.push({
          path:'/detail',
          query:{
            iid
          }
        })
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
