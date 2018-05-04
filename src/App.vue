<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

#app .main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: 180px;
}
#app .sidebar-container {
  transition: width 0.28s;
  width: 180px !important;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
/* #app .sidebar-container .horizontal-collapse-transition {
  transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
}
#app .sidebar-container a {
  display: inline-block;
  width: 100%;
}
#app .sidebar-container .svg-icon {
  margin-right: 16px;
}
#app .sidebar-container .el-menu {
  border: none;
  width: 100% !important;
}
#app .hideSidebar .sidebar-container {
  width: 36px !important;
}
#app .hideSidebar .main-container {
  margin-left: 36px;
}
#app .hideSidebar .submenu-title-noDropdown {
  padding-left: 10px !important;
  position: relative;
}
#app .hideSidebar .submenu-title-noDropdown .el-tooltip {
  padding: 0 10px !important;
}
#app .hideSidebar .el-submenu > .el-submenu__title {
  padding-left: 10px !important;
}
#app .hideSidebar .el-submenu > .el-submenu__title > span {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
#app .hideSidebar .el-submenu > .el-submenu__title .el-submenu__icon-arrow {
  display: none;
}
#app .sidebar-container .nest-menu .el-submenu > .el-submenu__title,
#app .sidebar-container .el-submenu .el-menu-item {
  min-width: 180px !important;
  background-color: #1f2d3d !important;
}
#app .sidebar-container .nest-menu .el-submenu > .el-submenu__title:hover,
#app .sidebar-container .el-submenu .el-menu-item:hover {
  background-color: #001528 !important;
}
#app .el-menu--collapse .el-menu .el-submenu {
  min-width: 180px !important;
}
#app .mobile .main-container {
  margin-left: 0px;
}
#app .mobile .sidebar-container {
  top: 50px;
  transition: transform 0.28s;
  width: 180px !important;
}
#app .mobile.hideSidebar .sidebar-container {
  transition-duration: 0.3s;
  transform: translate3d(-180px, 0, 0);
}
#app .withoutAnimation .main-container,
#app .withoutAnimation .sidebar-container {
  transition: none;
} */
</style>
