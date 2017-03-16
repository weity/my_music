var koa = require('koa');
var log = require("cclog")
var middlewares = require("koa-middlewares");
var mount = require('koa-mount');
var config = require("./common/config")
var path = require('path');
var session = require('koa-session');
var views = require('koa-views')
var moment = require("moment")
var jsonp = require('koa-safe-jsonp');

var app = new koa();

var rootdir = __dirname;
var viewDir = path.join(rootdir, 'view');

// var dbUtil = require("dutil").db_util
// dbUtil.init(config.db)

/**
 * jsonp处理
 */
jsonp(app);

/**
 *
 */
app.use(middlewares.rewrite('/favicon.ico', '/favicon.png'));

/**
 * etag处理
 */
app.use(middlewares.etag());

/**
 * 静态文件处理
 */
app.use(middlewares.staticCache(path.join(__dirname, 'public'), {
    maxAge: 365 * 24 * 60 * 60
}))

/**
 * 开启session
 */
app.keys = ['this is an iganlan project'];
app.use(session({maxAge: 30 * 24 * 3600000, key: 'gl:session'}, app));

/**
 * 记录每个请求花费的时间
 */
app.use(function *(next) {
    this.set("Access-Control-Allow-Origin", "*");
    this.timestamp = moment().unix()
    this.request_time = this.timestamp
    var start = new Date;
    yield next;
    var ms = new Date - start;
    this.set('X-Response-Time', ms + 'ms');
    console.log(`${this.method} ${this.url} - ${ms}ms`);
});

/**
 * post参数解码
 */
app.use(middlewares.bodyParser());

/**
 * ejs渲染目录
 */
middlewares.ejs(app, {
    root: viewDir,
    viewExt: 'html',
    layout: false,
    cache: false,
    debug: false
});

var rWyy = require('./resource/wangyiyun/r_wyy');
var rKg = require('./resource/kugou/r_kg');

/**
 * 启动app,进行路由包装
 */
// app.use(middlewares.router(app));
app.use(mount("/", rWyy.middleware()))
app.use(mount("/", rKg.middleware()))

/**
 * 启动路由分发
 */
// require("./routes")(app);

/**
 * 异常处理
 */
app.on('error', function (err, ctx) {
    log.error("Server error: ", err, ctx);
    this.status = 500;
    this.body = {code: 500, msg: '服务器出了点小故障，请稍等'};
});

app.listen(config.server.port, '0.0.0.0');

