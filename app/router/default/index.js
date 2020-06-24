module.exports = app =>{
    const {router,controller} = app
    router.get('/default/index',controller.default.index.index)
    router.get('/default/getArticleList',controller.default.index.getArticleList)
    router.get('/default/getArticleById/:id',controller.default.index.getArticleById)
    router.get('/default/getTypeInfo',controller.default.index.getTypeInfo)
    router.get('/default/getListById/:id',controller.default.index.getListById)
    router.post('/default/addComment',controller.default.index.addComment)
    router.get('/default/getCommentListById/:id',controller.default.index.getCommentListById)
    router.get('/default/getAllPartCount',controller.default.index.getAllPartCount)
  }