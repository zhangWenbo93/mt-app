<!--  -->
<template>
  <div class="m-menu">
    <dl class="nav">
      <dt>全部分类</dt>
      <dd v-for="(item, idx) in menu" :key="idx">
        <i :class="item.type" />{{ item.name }}<span class="arrow"></span>
      </dd>
    </dl>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      menu: [{
        type: 'food',
        name: '美食'
      }, {
        type: 'takeout',
        name: '外卖'
      }, {
        type: 'food',
        name: '美食'
      }, {
        type: 'takeout',
        name: '外卖'
      }]
    }
  }
}
</script>

<style lang="css">
</style>
