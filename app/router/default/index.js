module.exports = app =>{
    const {router,controller} = app
    router.get('/default/index',controller.default.index.index)
    router.get('/default/getArticleList',controller.default.index.getArticleList)
    router.get('/default/getArticleById/:id',controller.default.index.getArticleById)
    router.get('/default/getTypeInfo',controller.default.index.getTypeInfo)
    router.get('/default/getListById/:id',controller.default.index.getListById)
  }