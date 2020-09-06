<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template v-if="hasChild(item)">
      <app-link :to="resolvePath(item.path)">
        <el-menu-item :index="resolvePath(item.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :title="item.meta.title" :icon="item.meta.icon"/>
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title"/>
      </template>
      <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :is-nest="true"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from "path";
import {isExternal} from "@/utils/validate";
import Item from "@/layout/components/Sidebar/Item";
import AppLink from "@/layout/components/Sidebar/Link";

export default {
  name: "SidebarItem",
  components: {
    Item,
    AppLink
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest:{
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  methods: {
    hasChild(item) {
      console.log(item);
      console.log(item.meta.title);
      console.log(!item.children);
      if (!item.children) {
        return false;
      }
      return item.children.length === 0;
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

<style scoped>

</style>