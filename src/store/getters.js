const getters = {
    sidebar: state => state.app.sidebar,
    size: state => state.app.size,
    device: state => state.app.device,
    username: state => state.user.username,
    nickname: state => state.user.nickname,
    avatar: state => state.user.avatar,
    roles: state => state.user.roles,
    permissions: state => state.user.permissions,
    permission_routes: state => state.permission.routes,
    sidebarCollapse: state => state.settings.sidebarCollapse,
    sidebarLogo: state => state.settings.sidebarLogo
}

export default getters;
