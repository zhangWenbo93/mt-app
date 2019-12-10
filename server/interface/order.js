import Router from 'koa-router'
import axios from './utils/axios'
import Order from '../dbs/models/order'
import Cart from '../dbs/models/cart'
import md5 from 'crypto-js/md5'

const router = new Router({
  prefix: '/order'
})

router.post('/createOrder', async ctx => {
  let { id, price, count } = ctx.request.body
  let time = Date()
  let orderID = md5(Math.random * 1000 + time).toString()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: 'please login'
    }
  } else {
    let findCart = await Cart.findOne({ cartNo: id })
    if (!findCart) {
      ctx.body = {
        code: -1,
        msg: '订单不存在'
      }
    } else {
      let order = new Order({
        id: orderID,
        count,
        total: price * count,
        time,
        user: ctx.session.passport.user,
        name: findCart.detail[0].name,
        imgs: findCart.detail[0].imgs,
        status: 0
      })
      try {
        let result = await order.save()
        if (result) {
          await findCart.remove() // 订单生成成功则删除当前购物车数据
          ctx.body = {
            code: 0,
            id: orderID
          }
        } else {
          ctx.body = {
            code: -1,
            msg: '加购失败'
          }
        }
      } catch (e) {
        ctx.body = {
          code: -1,
          msg: '插入失败'
        }
      }
    }
  }
})

router.post('/getOrders', async ctx => {
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      list: [],
      msg: 'please login'
    }
  } else {
    try {
      let result = await Order.find() // 查询所有订单   ---order.find().limit(15)分页
      if (result) {
        ctx.body = {
          code: 0,
          list: result
        }
      } else {
        ctx.body = {
          code: -1,
          list: [],
          msg: ''
        }
      }
    } catch (e) {
      ctx.body = {
        code: -1,
        list: []
      }
    }
  }
})

export default router
