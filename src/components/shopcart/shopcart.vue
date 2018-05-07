<template>
    <div>
        <div class="shopcart">
            <div class="content" @click="toggleList">
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
                <div class="content-right">
                    <div class="pay" :class="payClass">
                        {{payDesc}}
                    </div>
                </div>
            </div>
            <div class="ball-container">
                <div v-for="(ball,index) in balls" :key="index">
                    <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
                        <div v-show="ball.show" class="ball">
                            <div class="inner inner-hook"></div>
                        </div>
                    </transition>
                </div>
            </div>
            <div class="chopcart-list" v-show="listShow">
                <div class="list-header">
                    <h1 class="title">购物车</h1>
                    <span class="empty">清空</span>
                </div>
                <div class="list-content">
                    <ul>
                        <li class="food" v-for="(food,index) in selectFoods" :key="index">
                            <span class="name">{{food.name}}</span>
                            <div class="price">
                                <span>￥{{food.price}}</span>
                            </div>
                            <div class="cartcontrol-wrapper">
                                <cartcontrol :food="food"></cartcontrol>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import cartcontrol from 'components/cartcontrol/cartcontrol';
export default {
    props: {
        selectFoods: {
            type: Array,
            default () {
                return [];
            }
        },
        deliveryPrice: {
            type: Number,
            default: 0
        },
        minPrice: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            balls: [
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                }
            ],
            dropBalls: [],
            fold: true
        };
    },
    computed: {
        totalPrice () {
            let total = 0;
            this.selectFoods.forEach((food) => {
                total += (food.price * food.count);
            });
            return total;
        },
        totalCount () {
            let count = 0;
            this.selectFoods.forEach((food) => {
                count += food.count;
            });
            return count;
        },
        payDesc () {
            if (this.totalPrice === 0) {
                return `¥${this.minPrice}元起送`;
            } else if (this.totalPrice < this.minPrice) {
                let diff = this.minPrice - this.totalPrice;
                return `还差¥${diff}元起送`;
            } else {
                return '去结算';
            }
        },
        payClass () {
            if (this.totalPrice < this.minPrice) {
                return 'not-enough';
            } else {
                return 'enough';
            }
        },
        listShow () {
            return !this.fold;
        }
    },
    methods: {
        drop (el) {
            for (let i = 0; i < this.balls.length; i++) {
                let ball = this.balls[i];
                if (!ball.show) {
                    ball.show = true;
                    ball.el = el;
                    this.dropBalls.push(ball);
                    return;
                }
            }
        },
        beforeDrop (el) {
            let count = this.balls.length;
            while (count--) {
                let ball = this.balls[count];
                if (ball.show) {
                    let rect = ball.el.getBoundingClientRect();
                    let x = rect.left - 32;
                    let y = -(window.innerHeight - rect.top - 22);
                    // el.style.display = '';
                    el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
                    el.style.transform = `translate3d(0, ${y}px, 0)`;
                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
                    inner.style.transform = `translate3d(${x}px, 0,  0)`;
                }
            }
        },
        dropping (el, done) {
            /* eslint-disable no-unused-vars */
            let rf = el.offsetHeight;
            this.$nextTick(() => {
                el.style.webkitTransform = 'translate3d(0, 0, 0)';
                el.style.transform = 'translate3d(0, 0, 0)';
                let inner = el.getElementsByClassName('inner-hook')[0];
                inner.style.webkitTransform = 'translate3d(0, 0, 0)';
                inner.style.transform = 'translate3d(0, 0, 0)';
                el.addEventListener('transitionend', done);
            });
        },
        afterDrop (el) {
            let ball = this.dropBalls.shift();
            if (ball) {
                ball.show = false;
                el.style.display = 'none';
            }
        },
        toggleList () {
            if (!this.totalCount) {
                return;
            }
            this.fold = !this.fold;
        }
    },
    components: {
        cartcontrol
    },
    watch: {
        totalCount: function () {
            if (!this.totalCount) {
                this.fold = true;
                return false;
            }
        },
        fold: function (totalCount) {
            let show = !this.fold;
            return show;
        }
    }
};
</script>

<style lang="less" rel="stylesheet/less">
@import "../../common/stylus/mixin";
@import './shopcart.less';
</style>
