 /*jshint unused:false */

/***************

  This file proxy.js allows you to configure a proxy system plugged into BrowserSync
  in order to redirect backend requests while still serving and watching
  files from the web project

  IMPORTANT: The proxy is disabled by default.

  If you want to enable it, watch at the configuration options and finally
  change the `module.exports` at the end of the file

***************/

'use strict';

var proxyMiddleware = require('http-proxy-middleware');

var options = {
  target: 'http://quoteservce.herokuapp.com:80'
};

var proxy = proxyMiddleware('/quote', options);

module.exports = function(){
  return [proxy];
}
