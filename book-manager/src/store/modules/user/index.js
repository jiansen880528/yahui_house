import Vue from 'vue';
import { login, logout } from "@/api/login.js";//引入接口

const user={
    state: {
        token: "",
        userInfo:{},
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_USER: (state, userInfo) => {
            state.userInfo = userInfo;
        },
    },
    actions: {
        // 登录
        Login({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                this.login(userInfo)
                .then((response) => {
                    if (response.code == "200") {
                        commit("SET_TOKEN", response.data);
                        commit("SET_USER", response.userInfo);
                        resolve(response);
                    } else {
                        reject(response);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
            });
        },
        // 退出
        Logout({ commit, state }) {
            
            return new Promise((resolve, reject) => {
                logout(commit)
                .then((response) => {
                    if (response.data.code == "200") {
                        commit("SET_TOKEN", "");
                        commit("SET_TOKEN", "");
                        resolve(response);
                    } else {
                        reject(response);
                    }
                })
                .catch(() => {
                    reject();
                });
            });
        },
    },

}
export default user