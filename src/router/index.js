import Vue from 'vue';
import Router from 'vue-router';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';

// 第三方插件引用进来需要使用vue.use注册一下
Vue.use(Router);

export default new Router({
  routes: [
    // path是定义路由的名称，component是接收组建，相应的名称跳到对应的组建
    {
      path: '/goods',
      component: goods
    },
    {
      path: '/ratings',
      component: ratings
    },
    {
      path: '/seller',
      component: seller
    }
  ],
  // linkActiveClass路由点击中自带的当前样式的class,但是名字太长，我们可以在css中定义个class，然后复制给它
  linkActiveClass: 'active'
});
