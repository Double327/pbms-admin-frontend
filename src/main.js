import Vue from 'vue'
import App from './App.vue'
import router from '@/router/routes'
import '@/router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/icons';
import 'normalize.css/normalize.css';
import '@/assets/style/index.scss';
import store from "@/store";
import VueCookies from 'vue-cookies';


Vue.use(ElementUI);
Vue.use(VueCookies);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
