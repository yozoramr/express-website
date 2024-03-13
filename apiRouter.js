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

// indexStatus

router.get('/indexStatusApi/usechartStatus', (req, res) => {
  res.status(200).send({
    chartStatus1: {
      tittle: "仓储容积",
      subheading: "Storage capacity",
      numberMin: 671,
      numberMax: 1200
    },
    chartStatus2: {
      tittle: "商品件数",
      subheading: "Number of items",
      numberMin: 6750,
      numberMax: 9999
    },
    chartStatus3: {
      tittle: "加盟签约",
      subheading: "Franchise signing",
      numberMin: 16,
      numberMax: 20
    },
    chartStatus4: {
      tittle: "供应商签约",
      subheading: "Supplier signing",
      numberMin: 56,
      numberMax: 62
    }
  })
})


module.exports = router
