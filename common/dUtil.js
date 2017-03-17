/**
 * Created by jiabinbin on 2017/3/16.
 */

const superagent = require('superagent')

module.exports = dUtils

function dUtils() {

}

dUtils.query = function (url) {
    return new Promise(function (resolve, reject) {
        superagent.get(url).end(function (err, response) {
            if (!err) {
                resolve({
                    code: '200',
                    data: response
                })
            } else {
                reject({
                    code: '400',
                    data: err
                })
            }
        })
    })
}
