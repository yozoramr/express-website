const jwt = require('jsonwebtoken');

// const jwt = require('jsonwebtoken');


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
app.use(expressJWT({ secret: secretKey, algorithms: ['HS256'] }).unless({ path:['/api/login/login']}));

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

const userDate = [
  {
    username: "admin",
    password: "123456"
  },
  {
    username: "user01",
    password: "12345678"
  }
]

// 用户登录
// 登录成功后，调用 jwt.sign() 方法生成 JWT 字符串，通过 token 属性发送给客户端
app.post('/api/login/login', (req, res) => {
  const userFind = userDate.find(userResult => userResult.username === req.body.username)
  if (!userFind){
    res.status(401).send({
      msg: '用户名未找到',
      token: ''
    })
  }
  if (userFind && userFind.password === req.body.password){
    const tokenStr = jwt.sign(
      {username: req.body.username},
      secretKey,
      { expiresIn: '2000s'}
    )
    res.status(200).send({
      msg: '登录成功',
      token: tokenStr
    })
  }else{
    res.status(401).send({
      msg: '密码错误',
      token: ''
    })
  }
})

// 把路由模块，注册到 app 上
app.use('/api', router)

app.listen(2010, () => {
  console.log('express server runing at http://127.0.0.1:2010')
})