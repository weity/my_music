/**
 * Created by jiabinbin on 2017/3/13.
 */
var path = require('path');

var publicBaseDir = "../public";

if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number, a, b) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
        })
    }
}

module.exports = {
    server: {
        port: 3000
    },
}