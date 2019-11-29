<!--  -->
<template>
  <div class="">
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd v-for="item in list" :key="item">
        <a
          href="javascript:void(0)"
          @click="goAnchor(`#city-${item.toLowerCase()}`)"
        >
          {{ item }}
        </a>
      </dd>
    </dl>
    <dl v-for="item in block" :key="item.title" class="m-categroy-section">
      <dt :id="`city-${item.title}`" ref="ddd">{{ item.title }}</dt>
      <dd>
        <span v-for="c in item.city" :key="c">
          {{ c }}
        </span>
      </dd>
    </dl>
  </div>
</template>

<script type="text/ecmascript-6">
import pinyin from 'js-pinyin'

export default {
  data() {
    return {
      list: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      block: []
    }
  },
  async mounted() {
    const self = this
    const blocks = []
    const {
      status,
      data: {
        city
      }
    } = await self.$axios.get('/geo/city')
    if (status === 200) {
      let p
      let c
      const d = {}
      city.map(item => { // 通过首字母先将城市划分为a-z的对象数组
        p = pinyin.getFullChars(item.name).toLowerCase().slice(0, 1)
        c = p.charCodeAt(0)
        if (c > 96 && c < 123) {
          if (!d[p]) {
            d[p] = []
          }
          d[p].push(item.name)
        }
      })
      // Object.entries() 可以把一个对象的键值以数组的形式遍历出来
      // const obj = { foo: 'bar', baz: 'abc' };
      // console.log(Object.entries(obj));   [['foo', 'bar'], ['baz', 'abc']]
      for (const [k, v] of Object.entries(d)) { // 通过entries方法将d转化成数组对象
        blocks.push({
          title: k,
          city: v
        })
      }
      // 排序
      blocks.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
      self.block = blocks
    }
  },
  methods: {
    goAnchor: function (type) {
      var anchor = this.$el.querySelector(`${type}`)
      // chrome
      document.body.scrollTop = anchor.offsetTop
      // firefox
      document.documentElement.scrollTop = anchor.offsetTop
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/changecity/categroy.scss";
</style>
