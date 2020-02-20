<template>
  <!--<h2>购物车</h2>-->
  <div>
    <nav-bar class="nav-bar">
      <div slot="center">购物车（{{cartLength}}）</div>
    </nav-bar>
    <cart-list :cart-list="cartList"/>
    <cart-bottom-bar/>

  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";
  export default {
    name: "Cart",
    computed:{
      cartLength(){
        return this.$store.state.cartList.length
      },
      cartList(){
        // console.log(this.$store.state.cartList);
        return this.$store.state.cartList
      }
    },
    components: {CartBottomBar, CartList, NavBar}
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>
