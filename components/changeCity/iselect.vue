<!--  -->
<template>
  <div class="m-select">
    <span class="name">按省份选择:</span>
    <el-select v-model="pvalue" placeholder="省份">
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="cvalue" :disabled="!city.length" placeholder="城市">
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select
      v-model="input"
      filterable
      remote
      placeholder="请输入城市中文或拼音"
      :remote-method="remoteMethod"
      :loading="loading"
      loading-text="加载中..."
      @change="changeCity"
    >
      <el-option
        v-for="(item, index) in options"
        :key="index"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script type="text/ecmascript-6">
import { async } from 'q'
import _ from 'lodash'
import pinyin from 'js-pinyin'

export default {
  data() {
    return {
      province: [],
      pvalue: '',
      city: [],
      cvalue: '',
      input: '',
      loading: false,
      options: []
    }
  },
  watch: {
    pvalue: async function (newValue) {
      const self = this
      const {
        status,
        data: {
          city
        }
      } = await self.$axios.get(`/geo/province/${newValue}`)
      if (status === 200) {
        self.city = city.map(item => {
          return {
            value: item.id,
            label: item.name
          }
        })
        self.cvalue = ''
      }
    }
  },
  mounted: async function () {
    const self = this
    const {
      status,
      data: {
        province
      }
    } = await self.$axios.get('/geo/province')
    if (status === 200) {
      self.province = province.map(item => {
        return {
          value: item.id,
          label: item.name
        }
      })
    }
  },
  methods: {
    remoteMethod: _.debounce(async function (query) {
      if (query !== '') {
        this.loading = true
        const self = this
        const {
          status,
          data: {
            city
          }
        } = await self.$axios.get('/geo/city')
        if (status === 200) {
          this.loading = false
          if (query.charCodeAt() > 96 && query.charCodeAt() < 123) { // 拼音
            self.options = city.map(item => {
              return {
                value: pinyin.getFullChars(item.name).toLowerCase(),
                label: item.name
              }
            })
            self.options = self.options.filter(item => item.value.indexOf(query.toLowerCase()) > -1)
          } else { // 汉字
            self.options = city.map(item => {
              return {
                value: item.name,
                label: item.name
              }
            })
            self.options = self.options.filter(item => item.value.indexOf(query) > -1)
          }
        } else {
          self.options = []
        }
      }
    }, 300),
    changeCity() {
      location.href = 'http://ww.baidu.com'
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/changeCity/iselect.scss";
</style>
