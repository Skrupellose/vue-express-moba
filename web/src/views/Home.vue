<template>
  <div>
    <!-- 轮播 -->
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide>
        <img class="w-100" src="../assets/images/slider3.jpg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/slider2.jpg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="..//assets/images/slider3.jpg" alt />
      </swiper-slide>
      <div class="swiper-pagination m-pagination text-right" slot="pagination"></div>
    </swiper>
    <!-- 图标 -->
    <div class="nav-icon mt-3">
      <div class="nav-main d-flex flex-wrap">
        <div class="nav-item my-2 text-center">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>

        <div class="nav-item my-2 text-center">
          <i class="sprite sprite-story"></i>
          <div class="py-2">故事站</div>
        </div>

        <div class="nav-item my-2 text-center">
          <i class="sprite sprite-story"></i>
          <div class="py-2">爆料站</div>
        </div>

        <div class="nav-item my-2 text-center">
          <i class="sprite sprite-story"></i>
          <div class="py-2">爆料站</div>
        </div>

        <div class="nav-item my-2 text-center">
          <i class="sprite sprite-story"></i>
          <div class="py-2">爆料站</div>
        </div>

        <div class="nav-item my-2 text-center">
          <i class="sprite sprite-story"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>

      <div class="footer text-center text-grey py-2 bg-light">
        <i class="sprite sprite-arrow mr-2"></i>收起
      </div>
    </div>
    <!-- 新闻资讯 -->
    <m-listcard title="新闻资讯" icon="zixun" :categories="newsCats">
      <template #swiperSlot="{slotItem}">
        <router-link
          tag="div"
          :to="`/articles/${item._id}`"
          class="py-2 font-lg d-flex"
          v-for="(item, index) in slotItem.Lists"
          :key="index"
        >
          <span class="text-primary">[{{item.categoryName}}]</span>
          <span class="px-2 text-grey">|</span>
          <span class="flex-1 text-ellipsis">{{item.name}}</span>
          <span class="pl-2 text-grey">{{item.createdAt|date}}</span>
        </router-link>
      </template>
    </m-listcard>

    <!-- 英雄列表 -->
    <m-listcard title="英雄列表" icon="yingxiong" :categories="heroesCats">
      <template #swiperSlot="{slotItem}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.4rem">
          <div
            style="width:20%"
            class="py-2 text-center"
            v-for="(item, index) in slotItem.heroList"
            :key="index"
          >
            <img :src="item.avatar" alt style="width:70px" />
            <p>{{item.name}}</p>
          </div>
        </div>
      </template>
    </m-listcard>

    <m-listcard title="英雄列表" icon="yingxiong" :categories="heroesCats">
      <template #swiperSlot="{slotItem}">
        <div class="d-flex flex-wrap">
          <div
            style="width:20%"
            class="py-2 text-center"
            v-for="(item, index) in slotItem.heroList"
            :key="index"
          >
            <img :src="item.avatar" alt />
            <p>{{item.name}}</p>
          </div>
        </div>
      </template>
    </m-listcard>
  </div>
</template>

<script>
// @ is an alias to /src
import dayjs from "dayjs";
export default {
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".m-pagination"
        }
        // Some Swiper option/callback...
      },
      newsCats: [],
      heroesCats: []
    };
  },
  methods: {
    async fetchNews() {
      const res = await this.$http.get("news/list");
      console.log(res);
      this.newsCats = res.data;
    },
    async fetchHeroes() {
      const res = await this.$http.get("heroes/list");
      console.log(res);
      this.heroesCats = res.data;
    }
  },
  created() {
    this.fetchNews();
    this.fetchHeroes();
  }
};
</script>
<style lang="scss">
@import "../assets/scss/variable";
.m-pagination {
  .swiper-pagination-bullet {
    border-radius: 0.1538rem;
    opacity: 1;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($map: $colors, $key: "blue");
    }
  }
}
.nav-icon {
  background: map-get($colors, "white");
  .nav-item {
    width: 25%;
    border-right: #bbbbbb solid 1px;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
// .card {
//   padding: 1rem;
// }
</style>
