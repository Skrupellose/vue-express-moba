module.exports = app => {
  const assert = require('http-assert')
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../../models/AdminUser')
  const router = express.Router({
    //父级url参数合并到router内
    mergeParams: true
  })

  // 发送信息
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  // 获取信息
  router.get('/',  async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    // populate方法可以找到指定的关联字段,返回前端的该字段也会变成一个关联对象
    const msg = await req.Model.find().setOptions(queryOptions)
    // const msg = await Category.find().limit(10)
    res.send(msg)
  })

  // 更新信息
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  // 获取指定id信息
  router.get('/:id',  async (req, res) => {
    const msg = await req.Model.findById(req.params.id)
    res.send(msg)
  })

  //删除指定id信息
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })


  
  const authmiddleware = require('../../middleware/auth')
  const resourcemiddleware = require('../../middleware/resource')
  // app.use('/admin/api/rest/:resource',resourcemiddleware(), router)

  app.use('/admin/api/rest/:resource', authmiddleware(), resourcemiddleware(), router)
  const multer = require('multer')
  //__dirname：绝对地址
  const upload = multer({ dest: __dirname + '../../../uploads' })



  app.post('/admin/api/upload', upload.single('file'),  async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  app.post('/admin/api/login', async (req, res) => {
 
    const { username, password } = req.body
    //查询用户
    const user = await AdminUser.findOne({ username }).select('+password')
    assert(user, 422, '用户不存在')
    //校验密码
    const isValid = require('bcryptjs').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')
    //返回token

    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({ token })
  })

  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}