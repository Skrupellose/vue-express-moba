module.exports = app => {
  const router = require('express').Router()
  const mongoose = require('mongoose')
  //通过mongoose的方法引用模型
  const Category = mongoose.model('Category')
  const Article = mongoose.model('Article')
  router.get('/news/init', async (req, res) => {
    const parent = await Category.findOne({ name: '新闻分类' }).lean()
    //lean方法去除MongoDB内部字段
    const cates = await Category.find().where({ parent: parent }).lean()
    const newsTitles = ["6月5日体验服积分排名奖励说明公告", "6月3日全服不停机更新公告", "6月3日净化游戏环境声明及处罚公告", "6月3日“演员”惩罚名单", "6月3日外挂专项打击公告", "你玩了假魂斗罗？ 真魂斗罗6.6三周年庆开启", "策划有话说丨出装可以预设12件？bp时的套装推荐是什么？", "狄某有话说丨违规详情说明", "英雄调整情报丨镜、程咬金喜提增强，快速了解本次英雄调整", "【一图流】Fly倾囊相授，蒙恬快速上手！"]
    const newsList = newsTitles.map(item => {
      const randomcates = cates.slice(0).sort((a, b) => Math.random() - 0.5)
      return {
        categories: randomcates.slice(0, 2),
        name: item
      }
    })
    await Article.deleteMany({})
    await Article.insertMany(newsList)
    res.send(newsList)
  })

  router.get('/news/list', async (req, res) => {
    // populate 不能控制各个分类的数目
    // const parent = await Category.findOne({ name: '新闻分类' })
    //   .populate({
    //     path: 'children',
    //     populate: {
    //       path: 'newsList'
    //     }
    //   }).lean()

    //聚合查询 aggregate()
    const parent = await Category.findOne({ name: '新闻分类' })
    const cates = await Category.aggregate([
      // $match 条件查询
      { $match: { parent: parent._id } },
      // $lookup join
      {
        $lookup: {
          // 关联集合 集合默认是和模型同名，但是在$lookup中需要写成小写复数形式
          from: 'articles',
          localField: '_id',
          foreignField: 'categories',
          //返回数据的name
          as: 'Lists'
        }
      },
      {
        // $addFields添加新的属性 相同的key值会进行覆盖，截取两条进行显示
        $addFields: {
          Lists: {
            $slice: ['$Lists', 2]
          }
        }
      }
    ])
    //热门分类

    // map得到四个分类的id

    const subCates = cates.map(v => v._id)
    cates.unshift({
      name: '热门',
      Lists: await Article.find().where({
        categories: {
          $in: subCates
        }
      }).populate('categories').lean()
    })

    cates.map(list => {
      list.Lists.map(v => {
        v.categoryName = (list.name === '热门') ? '公告' :  list.name
        // return v
      })
      // return list
    })
    res.send(cates)

  })
  app.use('/web/api', router)
}