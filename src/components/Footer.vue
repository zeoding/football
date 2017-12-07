<template>
  <footer class="fixed-bottom">
      <ul class="nav-list nav-list--bottom">
        <router-link :to="{name:item.router}" v-for="(item,index) in footList" :key="index" class="nav-item" :class="{'active':index == activeIndex}"  tag="li" >
             <div @click="changeMenu(index)">
                <svg :class="item.class" >
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="'./src/assets/icons.svg#'+item.icon"></use>
                </svg>
                <p class="item-txt">{{item.name}}</p>
             </div>
        </router-link>
    </ul>
  </footer>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import store from "@/store";
export default {
  data() {
    return {
      activeIndex: 0,
      footList: [
        {
          name: "资讯",
          icon: "icon-home",
          router: "home",
          class: "item-icon icon-svg icon-home"
        },
        {
          name: "比赛",
          icon: "icon-music",
          router: "match",
          class: "item-icon icon-svg icon-music"
        },
        {
          name: "视频",
          icon: "icon-user",
          router: "video",
          class: "item-icon icon-svg icon-user"
        },
        {
          name: "数据",
          icon: "icon-image",
          router: "data",
          class: "item-icon icon-svg icon-image"
        }
      ]
    };
  },
  created() {
    const navIndex = window.sessionStorage.getItem("navIndex");
    if (navIndex) {
      this.activeIndex = navIndex;
    }
  },
  computed: {
    ...mapGetters({ navIndex: "navIndex" })
  },
  methods: {
    changeMenu(index) {
      this.activeIndex = index;
      store.dispatch("changeNavIndex", index);
      store.dispatch("changeIndexTitle", this.$route.name);
      const navIndex = window.sessionStorage.getItem("navIndex");
      if (!navIndex) {
        window.sessionStorage.setItem("navIndex", index);
      }
    }
  }
};
</script>
