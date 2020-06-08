<template>
  <div>
    <div class="card p-2 bg-white mt-3">
      <div class="card-header d-flex ai-center border-bottom pb-3">
        <i class="iconfont" :class="`icon-${icon}`"></i>
        <div class="card-title flex-1 px-2">{{title}}</div>
        <i class="iconfont icon-menu"></i>
      </div>
      <div class="card-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Mcard",
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
</style>