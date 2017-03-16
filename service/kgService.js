/**
 * Created by jiabinbin on 2017/3/14.
 */

const superagent = require('superagent')
const cheerio = require('cheerio')

module.exports = kgService

function kgService() {

}

kgService.doRequest = function (url) {
    return new Promise(function (resolve,reject) {
        superagent.get(url,function (err, response) {
            if(!err){
                var res = [];

                var dom = response.text
                var $ = cheerio.load(dom,{decodeEntities:false})

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
                        listSinger:  eval("'"+$(element).find('div').has('.cptB').find('.songListSinger').html()+"'"),
                        cover: cover
                    };
                    res.push(item)
                });
                var result = {
                    code: "200",
                    list: res
                }
                resolve(result)
            } else {
                var result = {
                    code: '400',
                    err: err
                }
                reject(result)
                console.err(err)
            }
        })

    })
}