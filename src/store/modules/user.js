import {getToken, removeToken, setToken} from "@/utils/tokenUtils";
import {getUserInfo, login, logout} from "@/api/login";

const user = {
    state: {
        token: getToken(),
        username: '',
        nickname: '',
        avatar: '',
        roles: [],
        permissions: []
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_USERNAME: (state, username) => {
            state.username = username;
        },
        SET_NICKNAME: (state, nickname) => {
            state.nickname = nickname;
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        SET_PERMISSIONS: (state, permissions) => {
            state.permissions = permissions;
        }
    },
    actions: {
        Login({commit}, userInfo) {
            const user = {
                username: userInfo.username.trim(),
                password: userInfo.password,
                code: userInfo.code,
                uuid: userInfo.uuid
            }
            return new Promise(((resolve, reject) => {
                login(user).then(res => {
                    commit('SET_TOKEN', res.token);
                    setToken(res.token);
                    resolve();
                }).catch(err => {
                    console.log('Login Error');
                    reject(err);
                })
            }));
        },
        Logout({commit, state}) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '');
                    commit('SET_ROLES', []);
                    commit('SET_PERMISSIONS', []);
                    removeToken();
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        GetUserInfo({commit}) {
            return new Promise((resolve, reject) => {
                getUserInfo().then(res => {
                    const user = res.user;
                    commit('SET_USERNAME', user.username);
                    commit('SET_AVATAR', user.avatar);
                    commit('SET_NICKNAME', user.nickname);
                    if (res.roles && res.roles.length > 0) {
                        commit('SET_ROLES', res.roles);
                        commit('SET_PERMISSIONS', res.permissions);
                    } else {
                        commit('SET_ROLES', ['ROLE_DEFAULT']);
                    }
                    resolve(res);
                }).catch(err => {
                    reject(err);
                })
            });
        },
        FedLogout({commit}) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '');
                removeToken();
                resolve()
            })
        }
    }
}

export default user;
