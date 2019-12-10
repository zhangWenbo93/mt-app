import Router from 'koa-router'
import axios from './utils/axios'
import Categroy from '../dbs/models/Categroy'

const router = new Router({
  prefix: '/categroy'
})

//要在server下的index里引入categroy

router.get('/crumbs', async (ctx) => {
  // let result = await Categroy.findOne({city: ctx.query.city.replace('市', '') || '北京'})
  // if (result) {
  //   ctx.body = {
  //     areas: result.areas,
  //     types: result.types
  //   }
  // } else {
  //   ctx.body = {
  //     areas: [],
  //     types: []
  //   }
  // }
  const {
    status,
    data: {
      areas,
      types
    }
  } = await axios.get('http://cp-tools.cn/categroy/crumbs', {
    params: {
      city: ctx.query.city.replace('市', '') || '北京'
    }
  })
  ctx.body = {
    areas: status === 200 ? areas : [],
    types: status === 200 ? types : [],
  }
})

export default router
