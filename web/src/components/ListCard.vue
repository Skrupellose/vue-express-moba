<template>
  <div>
    <m-card :title="title" :icon="icon">
      <div class="nav jc-between">
        <div
          class="nav-item"
          :class="{active: active === index}"
          v-for="(item, index) in categories"
          :key="index"
          @click="$refs.list.$swiper.slideTo(index)"
        >
          <div class="nav-link">{{item.name}}</div>
        </div>
      </div>
      <swiper ref="list" @slide-change="()=>active = $refs.list.$swiper.realIndex">
        <swiper-slide v-for="(item, index) in categories" :key="index">
          <slot name="swiperSlot" :slotItem="item"></slot>
        </swiper-slide>
      </swiper>
    </m-card>
  </div>
</template>

<script>
export default {
  name: "Mlistcard",
  props: {
    categories: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      active: 0
    };
  }
};
</script>

<style lang="scss" scoped>
</style>