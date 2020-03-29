const Controller = require('egg').Controller

class MainController extends Controller {

  async index() {
    //首页的文章列表数据
    this.ctx.body = 'hi api'
    console.log("index")
  }
  async checkLogin() { //登录验证
    let userName = this.ctx.request.body.userName
    let password = this.ctx.request.body.password
    const sql = " SELECT userName FROM admin_user WHERE userName = '" + userName +
      "' AND password = '" + password + "'"
    const res = await this.app.mysql.query(sql)
    if (res.length > 0) {
      let openId = new Date().getTime()
      this.ctx.session = { "openId": openId }
      // this.ctx.cookies.set('openId','openId');

      // console.log('openId', this.ctx.session.openId)
      this.ctx.body = {
        'data': '登录成功',
        'openId': openId
      }
    } else {
      this.ctx.body = {
        'data': '登录失败'
      }
    }
    console.log('checkLogin被访问了' + new Date())
  }
  //获取分类
  async getTypeInfo() {
    let result = await this.app.mysql.select('type')
    this.ctx.body = { data: result }
    console.log('getTypeInfo被访问了!')
  }

  async addArticle() {  // 添加文章
    let tmpArticle = this.ctx.request.body
    let result = await this.app.mysql.insert('article', tmpArticle)
    let isSuccess = result.affectedRows === 1
    let insertId = result.insertId
    this.ctx.body = {
      isSuccess: isSuccess,
      insertId: insertId
    }
    console.log('addArticle!被访问了!')

  }

  async updateArticle() { // 更新文章
    let tmpArticle = this.ctx.request.body
    let result = await this.app.mysql.update('article', tmpArticle)
    let isUpdataSuccess = result.affectedRows === 1
    this.ctx.body = {
      isSuccess: isUpdataSuccess
    }
    console.log('updateArticle!被访问了!')
  }

  async getArticleList() { // 文章列表
    let sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'ORDER BY article.id DESC '

    const resList = await this.app.mysql.query(sql)
    this.ctx.body = { list: resList }
  }

  async delArticle() {  //删除文章
    let id = this.ctx.params.id
    let result = await this.app.mysql.delete('article', {"id": id})
    this.ctx.body = {
      data: result
    }
  }

  async getArticleById(){ //根据文章id 获取文章详情 
    let id = this.ctx.params.id

    let sql = 'SELECT article.id as id,'+
    'article.title as title,'+
    'article.introduce as introduce,'+
    'article.article_content as article_content,'+
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
    'article.view_count as view_count ,'+
    'type.typeName as typeName ,'+
    'type.id as typeId '+
    'FROM article LEFT JOIN type ON article.type_id = type.Id '+
    'WHERE article.id='+id
    const result = await this.app.mysql.query(sql)
    this.ctx.body={data:result}
}
}
module.exports = MainController