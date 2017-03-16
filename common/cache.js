
/**
 * 全局lru缓存
 * @type {*|module.exports}
 */
module.exports = require("lru-cache")({
    max: 100000,
    length: function (n) {
        return 1;
    },
    dispose: function (key, n) {
        //对cache的元素进行清理时的回掉
        //n.close();
    },
    maxAge: 1000 * 60 * 60 * 24   //一天
})