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
        <div class="py-2" v-for="(item, index) in slotItem.newsList" :key="index">
          <span>{{item.categoryName}}</span>
          <span>|</span>
          <span>{{item.title}}</span>
          <span>{{item.date}}</span>
        </div>
      </template>
    </m-listcard>

    <!-- 英雄列表 -->
    <m-card title="英雄列表" icon="yingxiong"></m-card>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".m-pagination"
        }
        // Some Swiper option/callback...
      },
      newsCats: [
        {
          name: "热门",
          newsList: new Array(5).fill(1).map(() => ({
            categoryName: "公告",
            title: "六月二日xxx",
            date: "06/01"
          }))
        },
        {
          name: "新闻",
          newsList: new Array(5).fill(1).map(() => ({
            categoryName: "公告",
            title: "六月二日xxx",
            date: "06/01"
          }))
        },
        {
          name: "公告",
          newsList: new Array(5).fill(1).map(() => ({
            categoryName: "公告",
            title: "六月二日xxx",
            date: "06/01"
          }))
        },
        {
          name: "活动",
          newsList: new Array(5).fill(1).map(() => ({
            categoryName: "公告",
            title: "六月二日xxx",
            date: "06/01"
          }))
        },
        {
          name: "赛事",
          newsList: new Array(5).fill(1).map(() => ({
            categoryName: "公告",
            title: "六月二日xxx",
            date: "06/01"
          }))
        }
      ]
    };
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
  border-top: 2px solid #bbbbbb;
  border-bottom: 2px solid #bbbbbb;
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
