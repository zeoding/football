<template>
  <ul class="media-list content">
    <router-link :to="{name:'articleDetail',params:{id:item.id}, query:{id:item.id,type:type,hasvideo:item.is_video}}" class="media-item" v-for="(item,index) in list" :key="index" tag="li">
          <div class="item-img">
            <img v-lazy="item.thumb">
            <img v-if="type == 'video'" class="video-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAABCCAMAAADUivDaAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABLUExURUxpcf///////////////////////////////////////////////////////////////////////////////////////////////1SsvH4AAAAYdFJOUwBMs4bjHJz6BO0kNQx4zY4tWqnbEznBbDOVJXoAAAJiSURBVFjDrVhZgqsgEETZQUVFTd//pK81M3kZw2rkU6Gkuqs3CYktPtF58FpK7YeZTpzULdUIBqfFRKOKATjdz+uWTitfCFn4OtFW749o2V2MkACe2vNzSz2AFCYL0FEEmNfwy3VGENqlERqkkPqQEWiUJmVFBzDY9EfsAOCiduUDyD5rddVLGCJmHRmwtcTgK24cgzfUsC1lXl820AG+o4a2WDqqBf1xD84qEA4MdrJHN8DQ1YTA5wEBbKkLo4WB+KMokLYyEomV8KaxjkFPqlcP7D8VBxu5sDZwL+FLOV6BGKU0L1sKcmm9DnIJ5hqEAfkUB4U5FPZtk8eYgR5C0xAKrhZjOiuVFbQ6NOFDb4+Um3W1P7QhwhufaTvHpj8MyoI8yG/uT7NZge1W1SoFkWaDhjRkgpakIZJsWpjQpTQHkWKzH99hshBxNjuJAWwJRIyNhQEdwosgImwMukRDVwgRZLOAJhJIMQR8klEgv4XAfd8S6ZBIhTlDGzma8wan3iAtVyRwHhe4uyPMbgh2dIlNppxkn2j3lPNd4qNH4rsh/SaKAC8sAujWL0qR+ymI8mpBlD8F8YayfEdzcEOLsjdKj3qEx3ujhIFST2WUf2NcgO/qEDp/cgJ2opuqQVDbR69rNMw1DfQM2gQGgXKMHSEQ32vdMLFGRhpf5JfRR0aa52BVoI9HfLBCv+D8t2UuMm44Q3bpIVOKRJrgOAezKaMYJxEkNuoigHR5DZp5H7h7e/Kwsv0+cM9lqcW4Y8Zv+2bkCKT42PTPsd+V5ybVCH8uqr7m58PbLxCGpDRL/wL5BziQPzLwEcJpAAAAAElFTkSuQmCC" />
          </div>
          <div class="item-bd">
              <h4 class="bd-tt">{{item.title}}</h4>
              <div class="bd-txt">{{item.description}}</div>
              <div class="bb-txt text-right">
                  <span>{{item.comments_total}}评论</span>
                  <span class="remind-num major" v-if="item.label">{{item.label}}</span>
                  <span class="remind-num top"v-if="item.top">置顶</span>
              </div>
        </div>
    </router-link>
</ul>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: []
    },
    type: {
      type: String,
      default: "news"
    },
    hasvideo: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  }
};
</script>
