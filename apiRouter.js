const express = require('express')
const router = express.Router()


// 这里挂载对应的路由
// Get 请求
router.get('/get', (req, res) => {
  const query = req.query
  res.send({
    status: 0,
    msg: 'GET 请求成功！',
    data: query
  })
})

// Post 请求
router.post('/post', (req, res) => {
  const body = req.body
  res.send({
    status: 0,
    msg: 'POST 请求成功！',
    data: body
  })
})

module.exports = router
