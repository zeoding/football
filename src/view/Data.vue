<template>
  <div>
    <scroll :data="dataList" :pulldown="pulldown" @scrollToEnd="loadData">
          <ul class="line-list line-list--indent">
            <li class="line-item">
              <span class="rank">排名</span>
              <span class="team_logo">logo</span>
              <span class="team_name">球队 </span>
              <span class="point">场次</span>
              <span class="point">胜</span>
              <span class="point">平</span>
              <span class="point">负</span>
              <span class="point double">进/失</span>
              <span class="point">积分</span>
            </li>
            <li class="line-item" v-for="item in dataList" :key="item.rank">
              <span class="rank"> {{item.rank}} </span>
              <span class="team_logo"><img :src="item.team_logo" alt="" height="20" width="20"></span>
              <span class="team_name">{{item.team_name}} </span>
              <span class="point">{{item.matches_total}}</span>
              <span class="point">{{item.matches_won}}</span>
              <span class="point">{{item.matches_draw}}</span>
              <span class="point">{{item.matches_lost}}</span>
              <span class="point double">{{item.goals_pro}}/{{item.goals_against}}</span>
              <span class="point">{{item.points}}</span>
            </li>
          </ul>
          <loading v-if="!dataList.length"></loading>
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
      pulldown: true,
      dataList: []
    };
  },
  created() {
    this.getDate();
  },
  methods: {
    getDate() {
      //获取数据
      this.$axios
        .get(this.$api.data, {
          params: {}
        })
        .then(({ data, state }) => {
          this.dataList = data.data.content.rounds[0].content.data;
        });
    },
    loadData() {}
  },
  components: {
    Scroll,
    Loading
  }
};
</script>
<style scoped>
.line-item span {
  display: block;
  float: left;
  font-size: 12px;
  padding: 0 4px;
}
.line-item .rank {
  min-width: 8%;
  text-align: center;
}
.line-item .team_logo{
  min-width: 8%;
}
.line-item .team_name {
  display: inline-block;
  width: 30%;
}
.line-item .point {
  display: inline-block;
  min-width: 8%;
  text-align: center;
}
.line-item .point.double {
  min-width: 12%;
}
</style>

