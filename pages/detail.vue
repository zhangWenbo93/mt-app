<!--  -->
<template>
  <div class="page-detail">
    <el-row>
      <el-col :span="24">
        <crumbs :keyword="keyword" :type="type" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <Summa :meta="product" />
      </el-col>
    </el-row>
    <el-row class="m-title">
      <el-col :span="24">
        <h3>商家团购及优惠</h3>
      </el-col>
    </el-row>
    <el-row v-if="canOrder || !login">
      <el-col :span="24">
        <list v-if="login" :list="list" />
        <div v-else class="deal-need-login">
          <img
            src="//p0.meituan.net/codeman/56a7d5abcb5ce3d90fc91195e5b5856911194.png"
            alt="登录查看"
          />
          <span>请登录后查看详细团购优惠</span>
          <el-button type="primary" round>
            <a href="/login">立即登录</a>
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import Crumbs from '@/components/detail/crumbs'
import Summa from '@/components/detail/summary'
import List from '@/components/detail/list'
export default {
  components: {
    Crumbs,
    Summa,
    List
  },
  computed: {
    canOrder() {
      return this.list.filter(item => item.photos.length).length
    }
  },
  async asyncData(ctx) { // 此处返回的数据和data()方法里的数据会做merge
    const { keyword, type } = ctx.query
    const {
      status,
      data: { product, more: list, login }
    } = await ctx.$axios.get('/search/products', {
      params: {
        keyword,
        type,
        ctx: ctx.store.state.geo.position.city
      }
    })
    if (status === 200) {
      return {
        keyword,
        product,
        type,
        list,
        login
      }
    } else {
      return {
        keyword,
        product: {},
        type,
        list: [],
        login: false
      }
    }
  }
}
</script>

<style lang="scss">
@import "@/assets//css//detail/index.scss";
</style>
