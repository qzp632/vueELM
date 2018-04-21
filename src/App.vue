<template>
  <div>
    <!-- header是原生的html元素所以是不对的，所以要改成其他的元素 -->
    <!-- <header></header> -->
    <v-header></v-header>
    <div class="tab">
      <div class="tab-item">
        <!-- 跳转到路由的标签router-link  -->
        <router-link :to="{path:'/goods'}">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path:'/ratings'}">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path:'/seller'}">商家</router-link>
      </div>
    </div>
    <!-- router-view是用来刷新路由地址的标签 -->
    <router-view></router-view>
  </div>
</template>

<script>
// import 是将其他地方的组建引用进来，但是那个组建必须要export default出来
import header from 'components/header/header.vue';
// export default是将组建暴露出去，让其他地方可以去引入
export default {
  components: {
    // 因为header是原生组建，所以我们要用v-header去定义，你可以用其他名字定义，只要不是关键字
    'v-header': header
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)
</style>
