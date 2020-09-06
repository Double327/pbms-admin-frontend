import Vue from 'vue';
import Vuex from 'vuex';
import permission from "@/store/modules/permission";
import user from "@/store/modules/user";
import settings from "@/store/modules/settings";
import getters from "@/store/getters";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        permission,
        settings,
        user,
    },
    getters
});

export default store;