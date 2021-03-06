import Vue from 'vue';
import Vuex from 'vuex';
import app from "@/store/modules/app";
import permission from "@/store/modules/permission";
import user from "@/store/modules/user";
import settings from "@/store/modules/settings";
import getters from "@/store/getters";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        app,
        user,
        permission,
        settings,
    },
    getters
});

export default store;
