<!--  -->
<template>
  <div class="m-geo">
    <i class="el-icon-location" />
    {{ $store.state.geo.position.city }}
    <nuxt-link to="/changeCity" class="changeCity">切换城市</nuxt-link>
    [香河 廊坊 天津]
  </div>
</template>

<script type="text/ecmascript-6">
export default {
}
</script>

<style lang="scss">
</style>
