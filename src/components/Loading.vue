<template>
	<div class="loading">
		<img :src="loading" alt="数据正在加载">
    <p>{{title}}</p>
	</div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "数据正在加载"
    }
  },
  data() {
    return {
      loading: "./src/assets/loading.gif"
    };
  }
};
</script>
<style scoped>
.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  text-align: center;
  color: #999;
  font-size: 12px;
  transform: translate(-50%, -70%);
}
.loading > p {
  padding-top: 10px;
}
</style>
