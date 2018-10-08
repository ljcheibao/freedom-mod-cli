"use strict";

/**
 * 模版管理路由
 */
const router = require('koa-router')();
const indexController = require("./indexController");
//首页路由
router.get('/', indexController.index);
//预览
router.get('/mod/preview', indexController.preview);


//获取本地模块列表
router.get('/api/modlist', indexController.modList);

module.exports = router;