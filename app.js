const express = require('express')
const app = express()

// 导入路由模块
const router = require('./apiRouter')


// 跨域
const cors = require('cors')
app.use(cors())
// 解析 JSON 格式的请求体
app.use(express.json());
// 解析 URL 编码的请求体
app.use(express.urlencoded({ extended: true }));

// 定义 secret 密钥，建议将密钥命名为 secretKey
const secretKey = 'mykey'
// 导入用于生成 JWT 字符串的包
const { expressjwt: expressJWT } = require('express-jwt')
// 注册将 JWT 字符串解析还原成 JSON 对象的中间件
app.use(expressJWT({ secret: secretKey, algorithms: ['HS256'] }).unless({ path:['/login']}));

// 全局错误中间件（未获取到token的错误处理）
app.use((err, req, res, next) => {
  // 这次错误是由 token 解析失败导致的
  if(err.name === 'UnauthorizedError'){
    return res.send({
      status: 401,
      message: '无效的token'
    })
  }
  res.send({
    status: 500,
    messgae: '未知的错误'
  })
})

// 登录成功后，调用 jwt.sign() 方法生成 JWT 字符串，通过 token 属性发送给客户端
app.post('/login', (req, res) => {
  console.log(req.body)
  const username = req.body.username  // 用户的信息对象
  // 参数1： 用户的信息对象
  // 参数2： 加密的密钥
  // 参数3： 配置对象，可以配置当前 token 的有效期
  const tokenStr = jwt.sign(
    {username: username},
    secretKey,
    { expiresIn: '2000s'}
  )
  res.status(200).send({
    message: '登录成功',
    token: tokenStr
  })
})

// 把路由模块，注册到 app 上
app.use('/api', router)

app.listen(2010, () => {
  console.log('express server runing at http://127.0.0.1:2010')
})