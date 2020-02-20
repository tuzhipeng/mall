<template>
  <div class="category">
    <h2>目前该练手项目只完成的功能：</h2>
    <h3>1. 首页的展示</h3>
    <h3>2. 点击商品的详情页展示</h3>
    <h3>3. 详情页的加入购物车及购物车的展示</h3>
    <h3>4. 没了~ /滑稽</h3>
  </div>
</template>

<script>
  export default {
    name: "Category",
    created() {
      this.$toast.showMessage()
    }
  }
</script>

<style scoped>
  .category{
    margin-top: 10px;
    margin-left: 10px;
  }
</style>
