// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;
// 下面的注视代表不用使用变量去接受vue的实例
/* eslint-disable no-new */
new Vue({
  // el: '#app'是需要页面挂载到的地方
  el: '#app',
  router,
  // components: { App }是接受一个名为App的组建
  components: { App },
  // template: '<App/>'形成一个App标签对的元素
  template: '<App/>'
});
// router.push设置一个默认的路由
router.push('/goods');
