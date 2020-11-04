<template>
  <div class="navbar">
    <!-- 展开关闭侧边导航图标 -->
    <hamburger id="hamburger-container" :is-active="true" class="hamburger-container"
               @toggleClick="toggleSideBar"/>
    <div class="right-menu">
      <template>
        <el-tooltip content="搜索" effect="dark" placement="bottom">
        </el-tooltip>
      </template>

      <el-dropdown class="avatar-container right-menu-item">
        <div class="avatar-wrapper">
          <img :src="require('@/assets/avatar/lm_10.jpg')" alt=""/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/user/profile">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Hamburger from "@/components/Hamburger/index";
import {mapGetters} from 'vuex';

export default {
  name: "Navbar",
  components: {Hamburger},
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    async logout() {
      this.$confirm('确定注销并退出系统吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('Logout').then(() => {
          location.reload();
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;
  }

  .right-menu {
    float: right;
  }
}
</style>
