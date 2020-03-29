module.exports = app =>{
  const {router,controller} = app
  var adminauth = app.middleware.adminauth()
  var crossDomain = app.middleware.crossDomain()
  router.get('/admin/index',controller.admin.index.index)
  router.post('/admin/checkLogin',controller.admin.index.checkLogin)
  router.get('/admin/getTypeInfo',adminauth,controller.admin.index.getTypeInfo)
  router.post('/admin/addArticle',controller.admin.index.addArticle)
  router.post('/admin/updateArticle',controller.admin.index.updateArticle)
  router.get('/admin/getArticleList',controller.admin.index.getArticleList)
  router.get('/admin/delArticle/:id',controller.admin.index.delArticle)
  router.get('/admin/getArticleById/:id',controller.admin.index.getArticleById)
}