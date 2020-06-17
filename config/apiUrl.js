const ipUrl = 'http://127.0.0.1:7001/default/'

export const serviceUrl = {
  getArticleList: ipUrl + 'getArticleList', //首页数据
  getArticleById: ipUrl + 'getArticleById/', // 根据id获取文章详情
  getTypeInfo: ipUrl + 'getTypeInfo',       // 文航类别
  getListById: ipUrl + 'getListById/',        // 根据类别获取文章列表
  addComment:ipUrl + 'addComment', // 添加评论

} 