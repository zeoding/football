<template>
  <div>
    <scroll :freeScroll="freeScroll">
      <div class="article-warp">
        <div class="article-title">
          <h1>{{article.title}}</h1>
          <p>{{article.time}} {{article.writer}}</p>
        </div>
        <div v-html="body" class="article-body article" ></div>
      </div>
    </scroll>
  </div>
</template>
<script>
import Bscroll from "better-scroll";
import Scroll from "@/components/Scroll";
import Loading from "@/components/Loading";

export default {
  data() {
    return {
      freeScroll: true,
      article: {},
      body: ""
    };
  },
  created() {
    const params = this.$route.params;

    this.$axios
      .get(this.$api.article, {
        params
      })
      .then(({ data, state }) => {
        let str = data.data.data.body;
        this.article = data.data.data;
        //过滤一些标签属性
        let video = str.replace(/data-src/g, "src");
        let poster = video.replace(/div/g, "video");
        let newStr = poster.replace(/thumb/g, "poster");
        this.body = newStr;
      });

    this.$nextTick(() => {});
  },
  components: {
    Scroll,
    Loading
  }
};
</script>
<style scoped>
.article-warp {
  min-height: 8000px;
}
</style>
