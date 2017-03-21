/**
 * Created by jiabinbin on 2017/3/20.
 *
 * 搜索服务层
 * 解析搜索类型，参数，生成请求的url集合，通过dUtil查询
 * 并解析结果 生成对象集合返回
 *
 */
const request = require("co-request")
const constant = require("../common/constant")
const util = require("../common/dUtil")

module.exports = searchService

function searchService() {

}

searchService.query = function (params, urlObject) {
    var queryArr = this.analysisParams(params, urlObject)
    var promisesArr = this.queryUrl(queryArr)
    var result = this.analysisPromise(promisesArr)

}

searchService.analysisParams = function (obj, urlObj) {
    //return url arrays
    var urlArr = []

    //default params & query params
    var baseSearch = constant.BaseParams.search

    //query params
    var queryType = obj.type || "song"
    var name = obj.key || ""
    var pageNum = obj.page || "1"

    //do this get query urls
    for (var key in baseSearch) {
        if (queryType == key) {
            var obj = baseSearch[key]
            var wyuri = urlObj.wangyi.search.url + "type=" + obj.wangyi + "&s=" + name
            var kguri = urlObj.kugou.search.url + "searchType=" + obj.kugou + "&searchKeyWord=" + name
            var qquri = urlObj.qq.search.url + "page=" + pageNum + "&searchid=1&remoteplace=txt.yqq.top&t=" + obj.qq + "&w=" + name
            var kwuri = urlObj.kuwo.search.url + "catalog=yueku20177&type=" + obj.kuwo + "&key=" + name
            urlArr.push({type: "wyy", uri: wyuri})
            urlArr.push({type: "kg", uri: kguri})
            urlArr.push({type: "qq", uri: qquri})
            urlArr.push({type: "kw", uri: kwuri})
        }
    }
    return urlArr
}

searchService.queryUrl = function (arr) {
    var res = []
    if (!!arr && arr.length > 0) {
        for (var i in arr) {
            var result = util.query(arr[i].uri)
            var item = {
                type: arr[i].type,
                promise: result
            }
            res.push(item)
        }
    }
    return res
}

searchService.analysisPromise = function (promiseArr) {

    var result = []

    if (!!promiseArr && promiseArr.length > 0) {
        for (var i in promiseArr) {
            var item = promiseArr[i]
            var res = item.promise
            switch (item.type) {
                case "wyy" :
                    /*if (result.code == '200') {
                        var dom = result.data.text
                        var $ = cheerio.load(dom, {decodeEntities: false})

                        var listTitle = $('#songs').find('strong').html()
                        var list = $('#songs').find('ul').children()
                        var stash = []
                        list.each(function (index, item) {
                            var audio = {
                                name: $(item).find('a').attr('title'),
                                data: $(item).find('a').attr('data')
                            }
                            stash.push(audio)
                        })
                        var obj = {}
                        obj.listTitle = listTitle
                        obj.data = res
                        result = obj
                    } else {

                    }*/
                    break
                case "kg":

                    break
                case "qq":

                    break
                case "kw":

                    break
            }
        }
    }
}
