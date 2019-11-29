export default {
  dbs: 'mongodb://127.0.0.1:27017/student',
  redis: {
    get host() {
      return '127.0.0.1'
    },
    get port() { // 端口号
      return 6379
    }
  },
  smtp: { // 邮箱服务
    get host() {
      return 'smtp.qq.com'
    },
    get user() { // 端口号
      return '1075982729@qq.com'
    },
    get pass() { // 授权码
      return ''
    },
    get code() { // 邮箱验证码
      return () => {
        return Math.random.toString(16).slice(2, 6).toUpperCase()
      }
    },
    get expire() { // 验证码过期时间
      return () => {
        return new Date().getTime() + 60 * 60 * 1000
      }
    }
  }
}
