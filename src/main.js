import Vue from 'vue'
import App from './App.vue'
import Cookies from 'js-cookie';
import router from '@/router/routes'
import '@/router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/icons';
import 'normalize.css/normalize.css';
import '@/assets/style/index.scss';
import store from "@/store";
import VueCookies from 'vue-cookies';
import {parseTime} from "@/utils/timeUtils";


Vue.use(ElementUI, {
    size: Cookies.get('size') || 'medium'
});
Vue.use(VueCookies);
Vue.config.productionTip = false


Vue.prototype.parseTime = parseTime;

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
