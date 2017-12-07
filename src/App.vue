<template>
  <div id="app">
    <headers></headers>
      <headerSub></headerSub>
      <transition>
         <!-- <keep-alive> -->
            <router-view class="index-content"></router-view>
         <!-- </keep-alive> -->
      </transition>
    <footers></footers>
  </div>
</template>

<script>
import Headers from "@/components/Header";
import Footers from "@/components/Footer";
import HeaderSub from "@/components/HeaderSub";
export default {
  name: "app",
  components: {
    Headers,
    Footers,
    HeaderSub
  },
  beforeRouteUpdate(to, from, next) {
    let isBack = this.$router.isBack;
    if (isBack) {
      this.transitionName = "slide-right";
    } else {
      this.transitionName = "slide-left";
    }
    this.$router.isBack = false;
  }
};
</script>

<style lang="less">
@import "./assets/layout";
</style>
