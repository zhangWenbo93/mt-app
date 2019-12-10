<!--  -->
<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img
          src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png"
          alt="美团"
        />
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input
            placeholder="搜索商家或地点"
            v-model="search"
            @focus="focus"
            @blur="blur"
            @input="input"
          />
          <button class="el-button el-button--primary">
            <i class="el-icon-search" />
          </button>
          <dl class="hotPlace" v-if="isHotPlace">
            <dt>热门搜索</dt>
            <dd
              v-for="(item, idx) in $store.state.home.hotPlace.slice(0, 5)"
              :key="idx"
            >
              <a :href="`/products?keyword=${encodeURIComponent(item.name)}`">
                {{ item.name }}
              </a>
            </dd>
          </dl>
          <dl class="searchList" v-if="isSearchList">
            <dd v-for="(item, idx) in searchList" :key="idx">
              <a :href="`/products?keyword=${encodeURIComponent(item.name)}`">
                {{ item.name }}
              </a>
            </dd>
          </dl>
        </div>
        <p class="suggset">
          <a
            :href="`/products?keyword=${encodeURIComponent(item.name)}`"
            v-for="(item, idx) in $store.state.home.hotPlace.slice(0, 5)"
            :key="idx"
          >
            {{ item.name }}
          </a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link to="/" class="takeout">美团外卖</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="movie">猫眼电影</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="hotel">美团酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="apartment">民宿/公寓</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="business">商家入驻</nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="6" class="right">
        <ul class="security">
          <li>
            <i class="refund" />
            <p class="txt">随时退</p>
          </li>
          <li>
            <i class="single" />
            <p class="txt">不满意免单</p>
          </li>
          <li>
            <i class="overdue" />
            <p class="txt">过期退</p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import _ from 'lodash'
import { async } from 'q'
export default {
  data() {
    return {
      search: '',
      isFoucs: false,
      hotPlace: [],
      searchList: []
    }
  },
  computed: {
    isHotPlace() {
      return this.isFoucs && !this.search
    },
    isSearchList() {
      return this.isFoucs && this.search
    }
  },
  methods: {
    focus() {
      this.isFoucs = true
    },
    blur() {
      const self = this
      setTimeout(() => {
        self.isFoucs = false
      }, 200)
    },
    input: _.debounce(async function () { // lodash防抖函数 此处不能用箭头函数  否则this指向错误
      const self = this
      const city = self.$store.state.geo.position.city.replace('市', '')
      self.searchList = []
      const {
        status,
        data: {
          top
        }
      } = await self.$axios.get('/search/top', {
        params: {
          input: self.search,
          city
        }
      })
      self.searchList = top.slice(0, 10)
    }, 300)
  }
}
</script>

<style lang="css">
</style>
