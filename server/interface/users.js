import Router from 'koa-router'
import Redis from 'koa2-session-ioredis'
import nodeMailer from 'nodemailer'
import User from '../dbs/models/users'
import Passport from './utils/passport'
import Email from '../dbs/config'
import axios from './utils/axios'


const router = new Router({
  prefix: '/users'
})

const Store = new Redis().client

// 注册接口
router.post('/signup', async (ctx) => {
  const {
    username,
    password,
    email,
    code
  } = ctx.request.body

  if (code) {
    const saveCode = await Store.hget(`nodemail:${username}`, 'code') // 获取redis里的code
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire') // 获取redis里的code过期时间
    if (code === saveCode) {
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期，请重新尝试'
        }
        return false
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '请填写正确的验证码'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
  }

  let user = await User.find({ username })// 查询用户名

  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '已被注册'
    }
    return
  }
  let nuser = await User.create({ // 创建写库
    username,
    password,
    email
  })
  if (nuser) {
    let res = await axios.post('/users/signin', { username, password })
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'error'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
  }
})

// 登录接口
router.post('/signin', async (ctx, next) => {
  return Passport.authenticate('local', (err, user, info, status) => { // local此处调用passport-local策略
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else {
      if (user) {
        ctx.body = {
          code: 0,
          msg: '登陆成功',
          user
        }
        return ctx.login(user)
      } else {
        ctx.body = {
          code: 1,
          msg: info
        }
      }
    }
  })(ctx, next)
})

//验证码

router.post('/verify', async (ctx, next) => {
  let username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire') // 获取redis里的code过期时间
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证码请求过于频繁，1分钟1次'
    }
    return false
  }

  let transpoter = nodeMailer.createTransport({
    host: Email.smtp.host,
    port: 587,
    secure: false, // true话监听465端口，fasle监听其他
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  })

  let ko = { // 给谁发
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }

  let mailOptions = {
    from: `"认证邮件" <${Email.smtp.user}>`,
    to: ko.email,
    subject: '《慕课网高仿美团网全栈实战》注册码',
    html: `您在《慕课网高仿美团网全栈实战》课程中注册，您的邀请码是${ko.code}`
  }

  await transpoter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('error')
    } else {
      Store.hmset(`nodemail: ${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
    }
  })
  ctx.body = {
    code: 0,
    msg: '验证码已发送，可能会有延迟，有效期1分钟'
  }
})

router.get('/exit', async (ctx, next) => { // 退出
  await ctx.logout();
  if (!ctx.isAuthenticated()) { // 判断是否为登录状态
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

router.get('/getUser', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const { username, email } = ctx.session.passport.user;
    ctx.body = {
      user: username,
      email
    }
  } else {
    ctx.body = {
      user: '',
      email: ''
    }
  }
})

export default router
