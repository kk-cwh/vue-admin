const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  showMenu: state => state.user.showMenu,
  addRouters: state => state.user.addRouters,
}
export default getters
