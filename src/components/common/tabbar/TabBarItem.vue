<template>
    <div class="tab-bar-item" @click="itemClick()">

        <div v-if="!isActive">
            <slot  name="item-icon"></slot>
        </div>

        <div v-else>
            <slot name="item-icon-active"></slot>
        </div>

        <div :style="activeStyle" >
            <slot name="item-text"></slot>
        </div>
        <!--<img src="../../assets/img/tabbar/favorites.png" alt="">-->
        <!--<div>喜欢</div>-->
    </div>

</template>

<script>
    export default {
        name: "TabBarItem",
        data(){
            return{
                // isActive: true,
                // path:'/'
            }
        },
        props:{
            path: String,
            activeColor:{
                type: String,
                default:'red'
            }
        },
        methods:{
            itemClick(){
                this.$router.replace(this.path)
            }
        },
        computed:{
            isActive(){
                return !this.$route.path.indexOf(this.path)
            },
            activeStyle(){
                return this.isActive ? {color: this.activeColor} : {}
            }
        }
    }
</script>

<style scoped>
    .tab-bar-item{
        flex: 1;
        text-align: center;
        height: 49px;
        font-size: 14px;
    }
    .tab-bar-item img{
        height: 24px;
        width: 24px;
        margin-top: 3px;
        vertical-align: middle;
    }

</style>