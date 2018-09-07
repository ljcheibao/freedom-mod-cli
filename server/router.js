"use strict";

/**
 * 模版管理路由
 */
const router = require('koa-router')();
const indexController = require("./indexController");
router.get('/', indexController.index);

module.exports = router;