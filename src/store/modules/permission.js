import {getRoutes} from "@/api/menu";
import Layout from '@/layout/index';
import {routesConfig} from '@/router/routes';

const permission = {
    state: {
        routes: [],
        addRoutes: []
    },
    mutations: {
        SET_ROUTES: (state, routes) => {
            state.addRoutes = routes;
            state.routes = routesConfig.concat(routes);
        }
    },
    actions: {
        GenerateRoutes({commit}) {
            return new Promise(resolve => {
                getRoutes().then(res => {
                    const accessedRoutes = filterAsyncRouter(res.data);
                    commit('SET_ROUTES', accessedRoutes);
                    resolve(accessedRoutes)
                });
            })
        }
    }
};


function filterAsyncRouter(asyncRouterMap) {
    return asyncRouterMap.filter(route => {
        if (route.component) {
            if (route.component === 'Layout') {
                route.component = Layout;
            } else {
                route.component = loadView(route.component);
            }
        }
        if (route.children != null && route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children);
        }
        return true;
    })
}

export const loadView = (view) => {
    return resolve=>(require([`@/view/${view}`],resolve))
};

export default permission;
