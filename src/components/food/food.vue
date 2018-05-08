<template>
  <transition name="move">
    <div v-show="showFlag" class="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
              <cartcontrol @add="addFood" :food="food"></cartcontrol>
          </div>
          <!-- <transition name="fade"> -->
          <div @click="addFist" class="buy" v-show="!food.count || food.count === 0">
            加入购物车
          </div>
          <!-- </transition> -->
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Vue from 'vue';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false
      };
    },
    methods: {
      show () {
        this.showFlag = true;
      },
      hide () {
        this.showFlag = false;
      },
      addFist (event) {
        this.$emit('add', event.target);
        Vue.set(this.food, 'count', 1);
      },
      addFood (target) {
        this.$emit('add', target);
      }
    },
    components: {
      cartcontrol
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
@import "../../common/stylus/mixin";
@import './food.less';
</style>
