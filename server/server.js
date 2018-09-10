#!/usr/bin/env node
let Application = require('koa'),
  logger = require('koa-logger'),
  json = require('koa-json'),
  views = require('koa-views'),
  onerror = require('koa-onerror');
var debug = require('debug')('freedom-mod-cli:server');
var http = require('http');
const app = new Application();

let path = require('path');
//路由注册
let routes = require('./router.js');
// error handler
onerror(app);
//视图注册
let viewPath = path.join(__dirname, "./views");
// global middlewares
app.use(views('./views', {
  root: viewPath,
  default: 'html'
}));
app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());
app.use(async function (next) {
  let start = new Date;
  await next;
  let ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});
//指定静态资源的访问目录
app.use(require('koa-static')(path.resolve(__dirname, "./static")));

// routes definition
app.use(routes.routes(), routes.allowedMethods());

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort('9000');
// app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app.callback());

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}