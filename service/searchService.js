/**
 * Created by jiabinbin on 2017/3/20.
 */
const request = require("co-request")

module.exports = searchService

function searchService() {

}

searchService.query = function (params, urlObject) {
    var paramUrl = this.analysisParams(params,urlObject)
    var queryUrl = this.queryUrl(paramUrl)
    debugger
}

searchService.analysisParams = function (obj,urlObj) {
    /*var urlArr = []
    var url = ""
    var type = ""
    if(!!obj.type){
        switch (obj.type){
        }
    }
    url = urlObj.search.wangyi.url + "type=1002&s=" + val
    url = urlObj.search.kugou.url + "searchType=song&searchKeyWord=" + val
    url = urlObj.search.qq.url + "page=1&searchid=1&remoteplace=txt.yqq.top&t=song&w=" + val
    url = urlObj.search.kuwo.url + "type=all&catalog=yueku20177&key=" + val*/
    return url
}

searchService.queryUrl = function (paramUrl) {
    var resArr = yield this.queryItem(key, obj, paramUrl)
}
searchService.queryItem = function (key, obj,paramUrl) {
    var url = ""
    switch (key){
        case "wangyi":
            url += key + paramUrl
            break
        case "kugou":


    }
    return new Promise(function (resolve, reject) {
        var result = yield request({
            uri: url,
            json: true
        })
    })
}
