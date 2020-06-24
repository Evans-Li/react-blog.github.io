const apiUrl = 'http://localhost:7001/admin/'

export const servicePath = {
  checkLogin: apiUrl+'checkLogin', //  登录接口
  getTypeInfo: apiUrl+'getTypeInfo', //  获取文章分类
  addArticle: apiUrl+'addArticle' , //  添加文章
  updateArticle: apiUrl+'updateArticle',  //  更新文章
  getArticleList: apiUrl+'getArticleList' , //  获取文章列表
  delArticle: apiUrl+'delArticle/'  ,// 删除文章
  getArticleById: apiUrl+'getArticleById/',//修改文章
  getArticleComment: apiUrl+'getArticleComment', //获取全部
  upPassComment: apiUrl+'upPassComment' //审核留言
} 