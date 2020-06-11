<template>
  <div>
    <div class="card p-2 bg-white mt-3">
      <div class="card-header d-flex ai-center" :class="{'border-bottom pb-3':!plain}">
        <i class="iconfont" :class="`icon-${icon}`"></i>
        <div class="card-title flex-1 px-2 font-xl">
          <strong>{{title}}</strong>
        </div>
        <i class="iconfont icon-menu" v-if="! plain"></i>
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
    },
    plain: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
</style>