/**
 * Created by jiabinbin on 2017/3/13.
 * 网易云音乐首页
 */

const Router = require('koa-router')
const app = new Router()
const request = require("co-request")
const cache = require("../../common/cache")

const httpClient = require('../../service/wyyService')

/**
 * 首页推荐歌单对应的url
 */
app.get('/wyy/index', function *(next) {
    var reqUrl = "http://music.163.com/discover"
    var result = yield httpClient.doRequest(reqUrl)
    this.response.body  = result
})

module.exports = app