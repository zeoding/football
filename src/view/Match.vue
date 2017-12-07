<template>
    <div>
      <scroll :data="matchList" :pulldown="pulldown" @scrollToEnd="loadData">
        <ul class="content media-list">
          <li class="media-match" v-for="(match,index) in matchList" :key="index">
            <div class="data-item">
              {{match.title}}
            </div>
            <div class="item-warp" v-for="item in match.item" :key="item.match_id">
              <div class="media-img">
                <img v-lazy="item.team_A_logo" />
                <span>{{item.team_A_name}}</span>
              </div>
            <div class="media-txt">
              <div class="txt-warp">
                <p class="time">{{item.time_utc}} {{item.competition_name}}</p>
                <template v-if="item.status == 'Played'">
                  <p class="score">{{item.fs_A}} - {{item.fs_B}}</p>
                  <img class="see-btn" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAAoBAMAAAClR805AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAwUExURUxpcQCzMQCzLwCyMQSyMACzMQCzMAWwMQCxLwiyMwiyNACyMQCyLxaxOQCzMRaxOp6G9rMAAAAOdFJOUwCAQL8n5pgPYK9wz07xtx2fbQAAAmpJREFUSMftl89rE0EUx7/ZpN0UZM1UbRAlrKOIpxKdFg+FJRXxIpaGpUUQQoONB4XSQymiKJEi6MVD1UvBHMQiXkQo6EVELx48C+Jt82OjpGHxP9A3s0lJrNgkZUEwb3fezkzgs7PfeW8mg8iTn4HY1xQuPEcgduMz1hCQvcCXoNC38CMo9N4++j9BR0y/+I1T/lOL46pfm5e9j3pDhxy/kGeMXaISA8KvkPPfVSIX/dYJek/GU+a+3442NoQrMmKCGqO2eLchxByidW6ujNsiuTN6wGvY9B/QJopIQHOgzzCWyDKWx5DnOYc4P+7sjDaaaAeD7egUwlPql0oSQ5ucjz7lHLidB/Y1390pWi+0oY/WZUOOGtBzDdmAl4tAQo2kC/RNr4EuCxGqrJdpeFGlNVXeCiUPmc15qltBKplWtDebkuHAq3yBy9q4EBZNI/SC58W6FUR97pYgFVk7wliZWYwNAxNNrWHEuhakHe346EKWHay2oE2FPsNr3NwdGpPfyR2Ik7OaYXQncZIyqNRJyvwNfd9V3Rl/z7un/GXLTsrOYk/TuIUe4Q7OwhjOStUZZY2UhgSpkSDdoJ3zv6FHIPMwLVlq4hpjpWaJruIuUgYPJZpWI4mm6kVxNw/0hm5J9I+ThH5NcZ0MTc+HJTGSywvNlmFhxOc6RG9fngZrj91PdX5CRoee2F9IU8pct8YgsLz5DJiaOU3oa/VeFtUBdy0Vod430JiVhr5eXcTCKgiNc7PAg1WMofQh38tWoMnE1vgxUkEcpsUIK8ASPa7Ir1A3CN7f0fvofwod4F/3AA8cAR6Tgjvc/QIJZyVcRvsrLwAAAABJRU5ErkJggg==" />
                </template>
                <template v-else>
                  <p class="score">vs</p>
                  <p class="tips">直播信息待更新</p>
                </template>
              </div>
            </div>
            <div class="media-img">
              <img v-lazy="item.team_B_logo" />
              <span>{{item.team_B_name}}</span>
            </div>
            </div>
          </li>
			  </ul>
        <loading v-if="!matchList.length"></loading>
      </scroll>
    </div>
</template>
<script>
import Bscroll from "better-scroll";
import Scroll from "@/components/Scroll";
import Loading from "@/components/Loading";
import config from "@/config";
import { formatTimes, getLocalDate, getLocalHour } from "@/utils/utils";
export default {
  components: {
    Scroll,
    Loading
  },
  data() {
    return {
      matchList: [],
      pulldown: true
    };
  },
  created() {
    this.getDate();
  },
  methods: {
    loadData() {},
    getDate() {
      //获取数据
      this.$axios
        .get(this.$api.match, {
          params: {}
        })
        .then(({ data, state }) => {
          if (data.state === config.RESPONSE_STATE) {
            // this.matchList = data.data.list;
            // 声明一个不受data监控的全局变量
            this.obj = {};
            data.data.list.forEach((item, index) => {
              let timeArr = item.time_utc.split(":");
              //计算+8小时的毫秒数
              let timeMs =
                parseInt(timeArr[0]) * 60 * 60 +
                parseInt(timeArr[1]) * 60 +
                parseInt(timeArr[2]) +
                28800;
              if (item.relate_type === "program") {
                return false;
              } else if (timeMs < 86400) {
                let key = item.date_utc;
                this.getFilterData(key);
                item.time_utc = getLocalHour(item.time_utc);
                this.obj[key].item.push(item);
              } else {
                let key = formatTimes(
                  (item.sort_timestamp + 28800) * 1000,
                  "yyyy-MM-dd"
                );
                this.getFilterData(key);
                item.time_utc = getLocalHour(item.time_utc);
                this.obj[key].item.push(item);
              }
            });
            // 将对象变为数组
            for (let i in this.obj) {
              this.matchList.push(this.obj[i]);
            }
            console.log(this.matchList);
          }
        });
    },
    getFilterData(key) {
      if (!this.obj[key]) {
        this.obj[key] = {
          title: getLocalDate(key),
          item: []
        };
      }
    }
  }
};
</script>
