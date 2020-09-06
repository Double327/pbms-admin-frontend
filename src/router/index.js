import router from "@/router/routes";
import store from "@/store";
import {getToken} from "@/utils/tokenUtils";

const whiteList = [
    '/login',
    '/'
]

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title + '-' + store.state.settings.title;
    }
    if (getToken()) {
        if (to.path === '/login') {
            next({path: '/index'});
        } else {
            if (store.getters.roles.length === 0) {
                store.dispatch('GetUserInfo').then(res => {
                    const roles = res.roles;
                    store.dispatch('GenerateRoutes', {roles}).then(accessRoutes => {
                        accessRoutes.push({path: '*', redirect: '/404', hidden: true});
                        router.addRoutes(accessRoutes);
                        next({...to, replace: true});
                    });
                }).catch((err) => {
                    console.log(err);
                    store.dispatch('FedLogout').then(() => {
                        location.reload();
                    })
                });
            } else {
                next();
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next(`/login?redirect=${to.path}`);
        }
    }
});