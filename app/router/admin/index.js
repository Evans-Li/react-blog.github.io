module.exports = app =>{
  const {router,controller} = app
  var adminauth = app.middleware.adminauth()
  var crossDomain = app.middleware.crossDomain()
  router.post('/admin/checkLogin',controller.admin.index.checkLogin)
  router.get('/admin/getTypeInfo',adminauth,controller.admin.index.getTypeInfo)
  router.post('/admin/addArticle',adminauth,controller.admin.index.addArticle)
  router.post('/admin/updateArticle',adminauth,controller.admin.index.updateArticle)
  router.get('/admin/getArticleList',adminauth,controller.admin.index.getArticleList)
  router.get('/admin/delArticle/:id',adminauth,controller.admin.index.delArticle)
  router.get('/admin/getArticleComment',adminauth,controller.admin.index.getArticleComment)
  router.get('/admin/getArticleById/:id',adminauth,controller.admin.index.getArticleById)
  router.post('/admin/upPassComment',adminauth,controller.admin.index.upPassComment)
  router.post('/admin/signOut',controller.admin.index.signOut)
}