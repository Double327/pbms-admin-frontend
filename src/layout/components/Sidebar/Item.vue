<template>
  <div class="">
    <SvgIcon :icon-class="icon"/>
    <span slot="title">{{title}}</span>
  </div>
</template>
<script>
import SvgIcon from "@/components/SvgIcon/index";
export default {
  name: 'MenuItem',
  components: {SvgIcon},
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
