import passport from 'koa-passport' // passport相对于koa的用法
import LocalStrategy from 'passport-local' // passport本地策略
import UserModel from '../../dbs/models/users'

passport.use(new LocalStrategy(async (username, password, done) => {
  let where = {
    username
  }
  let result = await UserModel.findOne(where)
  if (result != null) {
    if (result.password === password) {
      return done(null, result)
    } else {
      return done(null, false, '密码错误')
    }
  } else {
    return done(null, false, '用户不存在')
  }
}))

passport.serializeUser((user, done) => { // 序列化处理，查到用户信息存到redis
  done(null, user)
})

passport.deserializeUser((user, done) => { // 反序列化处理
  done(null, user)
})

export default passport
