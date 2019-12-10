<!--  -->
<template>
  <div class="m-crumbs">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">
        {{ $store.state.geo.position.city.replace("市", "") }}美团
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">
        {{ $store.state.geo.position.city.replace("市", "") }}{{ type }}
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">
          {{ decodeURIComponent(keyword) }}
        </a>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    keyword: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  }
}
</script>
