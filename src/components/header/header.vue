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
      <div v-if="seller.supports" class="support-count">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
      <!-- 个数结束 -->
    </div>
    <!-- 大内容区结束 -->
    <!-- 公告区开始 -->
    <div class="bulletin-wrapper"></div>
    <!-- 公告区结束 -->
  </div>
</template>

<script>
export default {
  // props接收父元素传过来的数据
  props: {
    seller: {
      type: Object
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  }
};
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../common/stylus/mixin";
  @import "./header.less";
</style>
