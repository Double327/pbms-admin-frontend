import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/layout';

Vue.use(Router);

export const routesConfig = [
    {
        path: '/index',
        hidden: false,
        meta: {title: '首页', icon: 'dashboard', noCache: true, affix: true},
        redirect: 'home'
    },
    {
        path: '/login',
        component: () => import('@/view/login'),
        meta: {title: '登录'},
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/view/error/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/view/error/401'),
        hidden: true
    },
    {
        path: '',
        component: Layout,
        redirect: 'home',
        children: [
            {
                path: 'home',
                component: () => import('@/view/index'),
                name: '首页',
                meta: {title: '首页', icon: 'dashboard', noCache: true, affix: true},
                hidden: true
            },
        ],
        hidden: true
    },
    {
        path: '/test',
        component: () => import('@/view/test'),
        meta: {title: '测试'},
        hidden: false
    },
];
export default new Router({
    mode: 'history',
    scrollBehavior: () => ({y: 0}),
    routes: routesConfig
});