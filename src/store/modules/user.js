
import { getToken, setToken, removeToken } from '@/utils/token'
import http from '@/utils/http.js';
import { routers, appRouter } from '../../router/router';
import { router } from '../../router/index';
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    showMenu:null,
    addRouters: [],
    routes:[]
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_SHOWMENU: (state, showMenu) => {
      state.showMenu = showMenu
    },
    SET_ROUTERS: (state, routes) => {
      state.addRouters = routes;
      state.routes = routers.concat(routes);
    }
  },

  actions: {
    // 登录
    // Login({ commit }, userInfo) {
    //   const username = userInfo.username.trim()
    //   return new Promise((resolve, reject) => {
    //     login(username, userInfo.password).then(response => {
    //       const data = response.data
    //       setToken(data.token)
    //       commit('SET_TOKEN', data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        http({
          url: '/api/login',
          method: 'post',
          data: userInfo
        }).then(response => {
          console.log(response);
          if (response.data) {
            const data = response.data;
            setToken(data.token_type + ' ' + data.access_token);
            commit('SET_TOKEN',getToken());
            console.log(data);
            resolve();
          }
        }).catch(error => {
          reject(error);
        })
      })
    },
    GetUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        http({
          url: '/api/user_info',
          method: 'get'
        }).then(response => {
          if (response.data) {
            let data = response.data
             let  menus = data.menus;
             commit('SET_SHOWMENU',menus);
             let  user = data.user;
            commit('SET_AVATAR',"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg");
            commit('SET_NAME', user.name);

            const accessedRouters = appRouter.filter(v => {
              if(v.children && v.children.length>0){
                v.children = v.children.filter(child => {
                  return menus.hasOwnProperty(child.name);
                });
                if(v.children.length){
                  return true;
                }
              }
                return false
            });
            console.log(accessedRouters)
            commit('SET_ROUTERS', accessedRouters);
            router.addRoutes(accessedRouters);

            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    // GetInfo({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     getInfo(state.token).then(response => {
    //       const data = response.data
    //       if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
    //         commit('SET_ROLES', data.roles)
    //       } else {
    //         reject('getInfo: roles must be a non-null array !')
    //       }
    //       commit('SET_NAME', data.name)
    //       commit('SET_AVATAR', data.avatar)
    //       resolve(response)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    // LogOut({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     logout(state.token).then(() => {
    //       commit('SET_TOKEN', '')
    //       commit('SET_ROLES', [])
    //       removeToken()
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // // 前端 登出
    // FedLogOut({ commit }) {
    //   return new Promise(resolve => {
    //     commit('SET_TOKEN', '')
    //     removeToken()
    //     resolve()
    //   })
    // }
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { menus } = data;
        const accessedRouters = appRouter.filter(v => {
          if(v.children && v.children.length>0){
            v.children = v.children.filter(child => {
              return menus.hasOwnProperty(child.name);
            });
            if(v.children.length){
              return true;
            }
          }
            return false
        });
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      })
    }
  }
}

export default user
