<!--  -->
<template>
  <div class="m-products-list">
    <dl>
      <dd
        v-for="item in nav"
        :key="item.name"
        :class="[item.name, item.acitve ? 's-nav-active' : '']"
        @click="navSelect"
      >
        {{ item.txt }}
      </dd>
    </dl>
    <ul>
      <Item v-for="(item, idx) in list" :key="idx" :meta="item" />
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
import Item from './product'
export default {
  components: {
    Item
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      nav: [
        {
          name: 's-default',
          txt: '智能排序',
          acitve: true
        }, {
          name: 's-price',
          txt: '价格最低',
          active: false
        }, {
          name: 's-visit',
          txt: '人气最高',
          active: false
        }, {
          name: 's-comment',
          txt: '评价最高',
          active: false
        }
      ]
    }
  },
  methods: {
    navSelect() {

    }
  }
}
</script>

<style lang="css">
</style>
