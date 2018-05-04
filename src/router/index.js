import Vue from 'vue'
import Router from 'vue-router'
import { routers, appRouter } from './router';
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading
import store from '../store'
Vue.use(Router)

/* Layout */
// import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/



const RouterConfig = {
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: routers
};
export const router = new Router(RouterConfig);

const whiteList = ['/login'];
router.beforeEach((to, from, next) => {
  console.log(to,'123');
  console.log(store.getters.token)
  if (store.getters.token) { // 判断是否有token
    console.log('hastoken')
    if (to.path === '/login') {
      next({ name: 'index' });
    } else {
      console.log('hastoken 1')
      if (!store.getters.showMenu) { // 判断当前用户是否已拉取完user_info信息

        store.dispatch('GetUserInfo').then(res => { // 拉取info
          console.log('GetUserInfo', store.getters.addRouters)

          // store.dispatch('GenerateRoutes', { menus }).then(() => { // 生成可访问的路由表
            // router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          // })
        }).catch(err => {
          console.log(err);
        });
      } else {
        next() //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next();
    } else {
      next('/login'); // 否则全部重定向到登录页
    }
  }
});
