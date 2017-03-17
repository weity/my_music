/**
 * Created by jiabinbin on 2017/3/13.
 * 网易云音乐首页
 */

const Router = require('koa-router')
const app = new Router()
const request = require("co-request")
const cache = require("../../common/cache")
const util = require("../../common/dUtil")
const cheerio = require('cheerio')

/**
 * 首页推荐歌单对应的url
 */
app.get('/wyy/index', function *(next) {
    var reqUrl = "http://music.163.com/discover"

    var result = yield util.query(reqUrl)

    if (result.code == '200') {
        var dom = result.data.text
        var $ = cheerio.load(dom, {decodeEntities: false})
        var res = []
        $('.m-cvrlst').eq(0).find('li').each(function (index, element) {
            var cvrLink = $(element).find('.u-cover').find('a')
            console.log(cvrLink.html())
            var cover = $(element).find('.u-cover').find('img').attr('src')
            var recommendItem = {
                id: cvrLink.attr('data-res-id'),
                title: cvrLink.attr('title'),
                href: 'http://music.163.com' + cvrLink.attr('href'),
                type: cvrLink.attr('data-res-type'),
                cover: cover
            };
            res.push(recommendItem)
        });
        result = res
    }
    this.response.body = result
})

module.exports = app