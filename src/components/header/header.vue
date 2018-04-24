<template>
  <div class="header">
    <!-- 大内容区开始-->
    <div class="content-wrapper">
      <!-- 头像开始 -->
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <!-- 头像结束 -->
      <!-- 内容区开始 -->
      <div class="content">
        <!-- 标题开始 -->
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <!-- 标题结束 -->
        <!-- 描述开始 -->
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <!-- 描述结束 -->
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <!-- 内容区结束 -->
      <!-- 个数开始 -->
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
      <!-- 个数结束 -->
    </div>
    <!-- 大内容区结束 -->
    <!-- 公告区开始 -->
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <!-- 公告区结束 -->
    <!-- 头部背景开始 -->
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <!-- 头部背景结束 -->
    <!-- 弹窗开始 -->
    <transition name="fade">
      <div v-show="detaShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
    <!-- 弹窗结束 -->
  </div>
</template>

<script>
import star from 'components/star/star';
export default {
  // props接收父元素传过来的数据
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      detaShow: false
    };
  },
  methods: {
    showDetail () {
      this.detaShow = true;
    },
    hideDetail () {
      this.detaShow = false;
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  components: {
    star
  }
};
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../common/stylus/mixin";
  @import "./header.less";
</style>
