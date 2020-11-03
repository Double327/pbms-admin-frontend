<template>
  <div :class="classObj" class="app-wrapper">
    <!--左侧导航-->
    <sidebar class="sidebar-container"/>
    <!--右侧主体内容-->
    <div class="main-container">
      <!--上方导航、已打开标签页-->
      <div class="">
        <!--导航栏-->
        <navbar/>
        <!--标签链接-->
        <tags-view></tags-view>
      </div>
      <!--主体内容-->
      <app-main/>
    </div>
  </div>
</template>

<script>
import {AppMain, Navbar, Sidebar, TagsView} from './components'
import {mapState} from 'vuex';

export default {
  name: "Layout",
  components: {AppMain, TagsView, Navbar, Sidebar},
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/mixin.scss";
@import "~@/assets/style/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
