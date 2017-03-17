/**
 * Created by jiabinbin on 2017/3/17.
 *
 * search 模块，所有的请求进入此处，分发至不同的数据源路由进行查询
 * 整合数据进行数据优化（）
 * //TODO 算法处理 不同来源数据集合分类
 *
 */

const Router = require('koa-router')
const app = new Router()
const request = require("co-request")
const cache = require("../../common/cache")
const util = require("../../common/dUtil")
const cheerio = require('cheerio')

app.get('search',function *(next) {

})



module.exports = app