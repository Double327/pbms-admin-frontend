<template>
  <div class="">
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

export default {
  name: "Layout",
  components: {AppMain, TagsView, Navbar, Sidebar}
}
</script>

<style scoped>

</style>