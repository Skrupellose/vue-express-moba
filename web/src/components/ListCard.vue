<template>
  <div>
    <m-card :title="title" :icon="icon">
      <div class="nav jc-between">
        <div
          class="nav-item pt-3"
          :class="{active: active === index}"
          v-for="(item, index) in categories"
          :key="index"
          @click="$refs.list.$swiper.slideTo(index)"
        >
          <div class="nav-link">{{item.name}}</div>
        </div>
      </div>
      <div class="pt-2"> 
        <swiper
          ref="list"
          :options="{autoHeight: true}"
          @slide-change="()=>active = $refs.list.$swiper.realIndex"
        >
          <swiper-slide v-for="(item, index) in categories" :key="index">
            <slot name="swiperSlot" :slotItem="item"></slot>
          </swiper-slide>
        </swiper>
      </div>
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