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
        </div>
    </div>
</template>

<script>
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
            dropBalls: []
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
        }
    },
    methods: {
        drop (el) {
            for (let i = 0; i < this.balls.length; i++) {
                let ball = this.balls[i];
                if (!ball.show) {
                    ball.show = true;
                    ball.el = el;
                    // console.log(ball);
                    this.dropBalls.push(ball);
                    return;
                }
            }
        },
        beforeDrop (el) {
            console.log(el);
            let count = this.balls.length;
            while (count--) {
                let ball = this.balls[count];
                // console.log(ball);
                if (ball.show) {
                    let rect = ball.el.getBoundingClientRect();
                    let x = rect.left - 32;
                    let y = -(window.innerHeight - rect.top - 22);
                    el.style.display = '';
                    el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
                    el.style.transform = `translate3d(0, ${y}px, 0)`;
                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
                    inner.style.transform = `translate3d(${x}px, 0,  0)`;
                }
            }
        },
        dropping (el, done) {
            console.log(el);
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
        }
    }
};
</script>

<style lang="less" rel="stylesheet/less">
@import "../../common/stylus/mixin";
@import './shopcart.less';
</style>
