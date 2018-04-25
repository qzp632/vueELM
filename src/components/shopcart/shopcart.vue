<template>
  <div>
      <div class="shopcart">
          <div class="content">
              <div class="content-left">
                  <div class="logo-wrapper">
                      <div class="logo" :class="{'highlight':totalCount > 0}">
                          <i class="icon-shopping_cart" :class="{'highlight':totalCount > 0}"></i>
                      </div>
                      <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
                  </div>
                  <div class="price" :class="{'highlight':totalPrice > 0}">￥{{totalPrice}}</div>
                  <div class="desc">另需配送费￥{{deliveryPrice}}</div>
              </div>
              <div class="content-right"></div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        selectFoods: {
            type: Array,
            default () {
                return [
                    {
                        price: 10,
                        count: 1
                    },
                    {
                        price: 10,
                        count: 3
                    },
                    {
                        price: 10,
                        count: 1
                    }
                ];
            }
        },
        deliveryPrice: {
            type: Number,
            default: 0
        }
    },
    computed: {
        totalPrice () {
            let total = 0;
            this.selectFoods.forEach((food) => {
                total += food.price;
            });
            return total;
        },
        totalCount () {
            let count = 0;
            this.selectFoods.forEach((food) => {
                count += food.count;
            });
            return count;
        }
    }
};
</script>

<style lang="less" rel="stylesheet/less">
@import "../../common/stylus/mixin";
@import './shopcart.less';
</style>
