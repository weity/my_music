var log = require("cclog");

var exports = module.exports = function (app) {

    var allroutes = require("requireindex")(__dirname);

    for (var key in allroutes) {
        allroutes[key](app);
    }
}
