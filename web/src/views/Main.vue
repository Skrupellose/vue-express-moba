<template>
  <div>
    <div class="topbar bg-black px-4 py-2 d-flex ai-center">
      <img src="../assets/images/logo.png" alt height="30px" />
      <div class="px-2 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-grey-1 fs-xxs">团队成就</div>
      </div>
      <button class="btn bg-primary">立即下载</button>
    </div>
    <div class="bg-primary pt-3 pb-2">
      <div class="nav nav-inverse text-white jc-around">
        <div class="nav-item active">
          <router-link tag="div" to="/">Home</router-link>
        </div>
        <div class="nav-item">
          <router-link tag="div" to="/about">About</router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>