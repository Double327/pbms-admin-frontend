<template>
  <div :class="{'has-logo':showLogo}">
    <!--Logo-->
    <logo :collapse="isCollapse"/>
    <!--菜单-->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
          :default-active="activeMenu"
          :collapse="isCollapse"
          :unique-opened="true"
          :collapse-transition="false"
          text-color="#bfcbd9"
          background-color="#304156"
          active-text-color="#409EFF"
          mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import Logo from "./Logo";
import SidebarItem from "@/layout/components/Sidebar/SidebarItem";
import {mapGetters} from "vuex";

export default {
  name: "Sidebar",
  components: {SidebarItem, Logo},
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route;
      const {meta, path} = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
    showLogo() {
      return this.$store.getters.sidebarLogo;
    }
  }
}
</script>

<style scoped>

</style>
