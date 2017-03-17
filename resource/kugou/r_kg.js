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
const cheerio = require('cheerio')
const util = require('../../common/dUtil')


/**
 * 酷狗精选歌单
 */
app.get('/kg/select', function *(next) {
    var reqUrl = "http://www.kugou.com/"

    var result = yield util.query(reqUrl)

    if (result.code == '200') {
        var res = [];

        var dom = result.data.text
        var $ = cheerio.load(dom, {decodeEntities: false})

        $('.selectSongList').find('.itemContent').children().each(function (index, element) {
            //链接地址
            var link = $(element).find('.Cover').find('a')
            //cover歌单封面
            var cover = $(element).find('img').attr('src')
            //其它信息
            var item = {
                id: $(element).find('.playBtn').attr('data-id'),
                title: $(element).find('.cptB').find('.songListName').html(),
                href: link.attr('href'),
                listSinger: eval("'" + $(element).find('div').has('.cptB').find('.songListSinger').html() + "'"),
                cover: cover
            };
            res.push(item)
        })
        result = res
    }
    this.response.body = result
})

app.get('/kg/select/detail/:id',function *(next){
    var id = this.params.id
    var url = "http://www.kugou.com/yy/special/single/" + id + ".html"

    var result = yield  util.query(url)

    if(result.code == '200'){
        var dom = result.data.text
        var $ = cheerio.load(dom,{decodeEntities:false})

        var listTitle = $('#songs').find('strong').html()
        var list = $('#songs').find('ul').children()
        var res = []
        list.each(function (index, item) {
            var audio = {
                name:$(item).find('a').attr('title'),
                data:$(item).find('a').attr('data')
            }
            res.push(audio)
        })
        var obj = {}
        obj.listTitle = listTitle
        obj.data = res
        result = obj
    }

    this.response.body = result;
})

/**
 * 通过hash值获得audio源文件
 */
app.get('/kg/select/detail/songs/:id', function *(next) {
    var data = this.params.id
    var arr = data.split('|')
    var url = "http://www.kugou.com/yy/index.php?r=play/getdata&hash=" + arr[0]

    var result = yield request({
        uri:url,
        json:true
    })

    if(result.statusCode == '200'){
        result = result.body.data
    }
    this.response.body = result
})

module.exports = app