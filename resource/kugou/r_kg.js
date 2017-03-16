/**
 * Created by jiabinbin on 2017/3/13.
 *
 * 酷狗播放方式：http://www.kugou.com/song/# + ID号
 * eg
 *  http://www.kugou.com/song/#0C9AC3ACBFB0E3893388565D482E5049
 *  ul 中 li结构:
 *
 *  <li>
 *      <a title="那英 - 默" hidefocus="true" href="javascript:;" data="A35D4B31FA86896F3FD55941D1EC1C4E|325000">
 *          <input type="checkbox" onclick="checkClkAll(event)" class="cb" checked="checked" id="chk_A35D4B31FA86896F3FD55941D1EC1C4E"><span class="share" title="分享"></span><span class="listen" title="播放"></span><span class="num1">01</span><span class="text"><i>那英 - 默</i></span>
 *      </a>
 *  </li>
 *
 */

const Router = require('koa-router')
const app = new Router()
const request = require("co-request")
const cache = require("../../common/cache")
const httpClient = require('../../service/kgService')

/**
 * 首页
 */
app.get('/kg/index', function *(next) {
    var reqUrl = "http://www.kugou.com/"
    var result = yield httpClient.doRequest(reqUrl)
    this.response.body = result
})

module.exports = app