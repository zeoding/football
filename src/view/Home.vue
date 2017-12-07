<template>
  <div>
      <scroll :data="parma.list" :pulldown="pulldown" @scrollToEnd="loadData">
          <mediaList :list="parma.list" :type="parma.type" :hasvideo="parma.hasvideo"></mediaList>
          <loading v-if="!parma.list.length"></loading>
      </scroll>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Bscroll from "better-scroll";
import Scroll from "@/components/Scroll";
import Loading from "@/components/Loading";
import MediaList from "@/components/MediaList";
import filters from "@/utils/filters";
export default {
  data() {
    return {
      parma: {
        type: "news",
        hasvideo: false,
        list: []
      },
      formData: {
        time: "",
        page: 1
      },
      pulldown: true
    };
  },
  created() {
    this.getDate();
  },
  methods: {
    getDate() {
      //获取数据
      this.$axios
        .get(this.$api.news, {
          params: {}
        })
        .then(({ data, state }) => {
          this.parma.list = data.data.articles;
          this.formData.time = data.data.min;
        });
    },
    loadData() {
      this.$axios
        .get(this.$api.news, {
          params: {
            page: this.formData.page++,
            after: this.formData.time
          }
        })
        .then(({ data, state }) => {
          this.parma.list = this.parma.list.concat(data.data.articles);
          this.formData.time = data.data.min;
        });
    }
  },
  computed: {
    ...mapGetters["indexTitle"]
  },
  components: {
    MediaList,
    Scroll,
    Loading
  }
};
</script>
