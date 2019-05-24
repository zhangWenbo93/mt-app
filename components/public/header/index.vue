<!-- 位置选择 -->
<template>
  <el-row :gutter="0" class="m-header">
    <el-col :span="4">
      <geo />
    </el-col>
    <el-col :span="6">
      <user />
    </el-col>
    <el-col :span="14">
      <nav />
    </el-col>
  </el-row>
</template>

<script type="text/ecmascript-6">
import Geo from './geo'
import User from './user'
import Nav from './nav'
export default {
  components: { Geo, User, Nav }
}
</script>

<style lang="scss">
  @import "@/assets/css/public/layout.scss";
</style>
