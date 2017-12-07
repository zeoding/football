<template>
      <header class="header">
        <div class="header-left" v-if="isArticle" @click="backPage">
            <i class="header-icon icon-v-left"></i>
        </div>
        <h1 class="header-title">
          {{title}}
        </h1>
        <div class="header-right" @click="share">
          <i class="header-icon icon-dots" title="分享"></i>        
        </div>        
      </header>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "header",
  data() {
    return {
      title: "资讯",
      back: "",
      titleList: ["资讯", "比赛", "视频", "数据"]
    };
  },
  watch: {
    indexTitle(key) {
      switch (key) {
        case "home":
          this.title = this.titleList[0];
          break;
        case "match":
          this.title = this.titleList[1];
          break;
        case "video":
          this.title = this.titleList[2];
          break;
        case "data":
          this.title = this.titleList[3];
          break;
        default:
          break;
      }
    },
  },
  created() {
    const indexTitle = window.sessionStorage.getItem("indexTitle");
    if (indexTitle) {
      this.setTitle(indexTitle);
    }
  },
  computed: {
    ...mapGetters({ indexTitle: "indexTitle" }),
    ...mapGetters({ isArticle: "isArticle" })
  },
  methods: {
    backPage() {
      this.$router.back();
    },
    setTitle(key) {
      switch (key) {
        case "home":
          this.title = this.titleList[0];
          break;
        case "match":
          this.title = this.titleList[1];
          break;
        case "video":
          this.title = this.titleList[2];
          break;
        case "data":
          this.title = this.titleList[3];
          break;
        default:
          break;
      }
    },
    share() {
      console.log(location.href, "分享的地址");
    }
  }
};
</script>
