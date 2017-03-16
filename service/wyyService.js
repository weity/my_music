/**
 * Created by jiabinbin on 2017/3/14.
 */
const superagent = require('superagent')
const cheerio = require('cheerio')

module.exports = wyyService

function wyyService() {

}

wyyService.doRequest = function (url) {
    return new Promise(function (resolve, reject) {
        superagent.get(url).end(function (err, _response) {
            if (!err) {
                var dom = _response.text;
                var $ = cheerio.load(dom);
                var res = [];
                $('.m-cvrlst').eq(0).find('li').each(function (index, element) {
                    var cvrLink = $(element).find('.u-cover').find('a');
                    console.log(cvrLink.html());
                    var cover = $(element).find('.u-cover').find('img').attr('src');
                    var recommendItem = {
                        id: cvrLink.attr('data-res-id'),
                        title: cvrLink.attr('title'),
                        href: 'http://music.163.com' + cvrLink.attr('href'),
                        type: cvrLink.attr('data-res-type'),
                        cover: cover
                    };
                    res.push(recommendItem);
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
                reject(result);
            }
        });
    })
}
