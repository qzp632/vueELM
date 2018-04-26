<template>
  <div>
    <!-- header是原生的html元素所以是不对的，所以要改成其他的元素 -->
    <!-- <header></header> -->
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
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
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
// import 是将其他地方的组建引用进来，但是那个组建必须要export default出来
import header from 'components/header/header.vue';
// import datalist from '../data.json';
// export default是将组建暴露出去，让其他地方可以去引入
const ERR_OK = 0;

export default {
  data () {
    return {
      seller: {}
    };
  },
  created () {
    // this.seller = datalist.seller;
    this.$http.get('/api/seller').then((response) => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.seller = response.data;
        // console.log(this.seller);
      }
    });
  },
  components: {
    // 因为header是原生组建，所以我们要用v-header去定义，你可以用其他名字定义，只要不是关键字
    'v-header': header
  }
};
</script>

<style lang="less" rel="stylesheet/less">
@import "./common/stylus/mixin";
@import "./app.less";
</style>
