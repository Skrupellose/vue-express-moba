<template>
  <div class="page-article" v-if="model">
    <div class="d-flex">
      <div class="iconfont icon-fanhui-copy pr-2"></div>
      <strong class="flex-1 text-blue">{{model.name}}</strong>
      <div class="text-grey">{{model.createdAt | date}}</div>
    </div>

    <div class="px-3 body" v-html="model.body"></div>
    <div class="py-3 px-3 border-top">
      <i class="iconfont icon-zixun pr-2"></i>
      <strong class="text-blue">相关资讯</strong>
      <div class="mt-2">
        <router-link
          class="pt-2"
          tag="div"
          :to="`/articles/${item._id}`"
          v-for="(item, i) in model.related"
          :key="i"
        >{{item.name}}</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
export default {
  filters: {
  date(val) {
      return dayjs(val).format("YYYY-MM-DD");
    }
  },
  data() {
    return {
      model: null
    };
  },
  created() {
    this.fetchArticle();
  },
  methods: {
    async fetchArticle() {
      const res = await this.$http.get(`/articles/${this.id}`);
      console.log(res);
      this.model = res.data;
    }
  },
  props: {
    id: {
      type: String,
      required: true
    }
  }
};
</script>
<style lang="scss">
.page-article {
  border: 1px solid #9fa0a0;
  .body {
    img {
      max-width: 100%;
      // height: auto;
    }
    iframe {
      max-width: 100%;
    }
    p {
      text-align: center;
    }
  }
}
</style>
