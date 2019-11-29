import Router from 'koa-router'
import axios from './utils/axios'
import poi from '../dbs/models/poi'

const router = new Router({
  prefix: '/search'
})

router.get('/top', async (ctx) => {
  const {
    status,
    data: {
      top
    }
  } = await axios.get(`http://cp-tools.cn/search/top`, {
    params: {
      input: ctx.query.input,
      city: ctx.query.city
    }
  })
  ctx.body = {
    top: status === 200 ? top : []
  }
})
router.get('/hotPlace', async (ctx) => {
  const city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
  const {
    status,
    data: {
      result
    }
  } = await axios.get(`http://cp-tools.cn/search/hotPlace`, {
    params: {
      city
    }
  })
  ctx.body = {
    result: status === 200 ? result : []
  }
})

router.get('/resultsByKeywords', async (ctx) => {
  const { city, keyword } = ctx.query;
  let {
    status,
    data: {
      count,
      pois
    }
  } = await axios.get('http://cp-tools.cn/search/resultsByKeywords', {
    params: {
      city,
      keyword
    }
  })

  ctx.body = {
    count: status === 200 ? count : 0,
    pois: status === 200 ? pois : []
  }
})

export default router
