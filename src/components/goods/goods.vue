<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="menu-item">
          <span class="text border-1px">
            <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="food-list">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="(food,index) in item.foods" class="food-item border-1px" :key="index">
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span><span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import datalist from '../../../data.json';
import BScroll from 'better-scroll';
const ERR_OK = 0;
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: {}
    };
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    // this.goods = datalist.goods;
    this.$http.get('/api/goods').then((response) => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.goods = response.data;
        this.$nextTick(() => {
          this._initScroll();
        });
      }
    });
  },
  methods: {
    _initScroll () {
      this.meunScroll = new BScroll(this.$refs.menuWrapper, {});
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {});
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less">
@import "../../common/stylus/mixin";
@import './goods.less';
</style>
