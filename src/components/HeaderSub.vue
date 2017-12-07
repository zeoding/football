<template>
  <div class="header-sub">
    <scroll :data="items" :scrollX="scrollX" :scrollY="scrollY" class="nav-list-warp">
      <ul class="nav-list-none-flex content">
          <li class="nav-item" :class="{'active':acticeIndex == index}" v-for="(item,index) in items" :key="item.id" @click="selectItem(index,item)">
              {{item.label}}
          </li>
      </ul>
    </scroll>
  </div>
</template>
<script>
import Bscroll from "better-scroll";
import Scroll from "@/components/Scroll";
export default {
  components: {
    Scroll
  },
  data() {
    return {
      scrollX: true,
      scrollY: false,
      acticeIndex: 0,
      items: []
    };
  },
  created() {
    this.$axios.get(this.$api.tab).then((data, state) => {
      this.items = data.data.data.menus.news;
    });
  },
  mounted() {},
  methods: {
    selectItem(index,item) {
     this.acticeIndex = index;
     console.log(item.id)
    }
  }
};
</script>
<style scoped>
.nav-list-warp {
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
}
.nav-list-none-flex {
  width: 648px;
  height: 34px;
  line-height: 34px;
  overflow: hidden;
  font-size: 0;
  background-color: #fff;
}
.nav-list-none-flex > li {
  position: relative;
  display: inline-block;
  float: left;
  margin: 0 10px;
  padding: 0 4px;
  font-size: 13px;
}
.nav-list-none-flex > li.active::before {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  display: block;
  height: 2px;
  background-color: red;
}
</style>

