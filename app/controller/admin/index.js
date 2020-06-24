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
      this.ctx.cookies.set('openId', openId)
      this.ctx.body = {
        'data': '登录成功',
        // 'openId': openId
      }
    } else {
      this.ctx.body = {
        'data': '登录失败'
      }
    }
    console.log('checkLogin被访问了' + new Date())
  }

  //  退出
  async signOut() {
    // this.ctx.session.openId = null
    this.ctx.cookies.set('openId', null)
    let cookie = this.ctx.cookies.get('openId')
    let isSuccess = (!cookie)
    if (isSuccess) {
      this.ctx.body = {
        isSuccess: isSuccess,
        msg: '退出成功'
      }
    } else {
      this.ctx.body = {
        isSuccess: isSuccess,
        msg: '退出失败'
      }
    }

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
    console.log(tmpArticle)
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
      'article.view_count as view_count,' +
      'article.is_top as is_top,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'ORDER BY article.id DESC '

    const resList = await this.app.mysql.query(sql)
    this.ctx.body = { list: resList }
  }

  async delArticle() {  //删除文章
    let id = this.ctx.params.id
    let result = await this.app.mysql.delete('article', { "id": id })
    this.ctx.body = {
      data: result
    }
  }

  async getArticleById() { //根据文章id 获取文章详情 
    let id = this.ctx.params.id

    let sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.article_content as article_content,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ,' +
      'type.id as typeId ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE article.id=' + id
    const result = await this.app.mysql.query(sql)
    this.ctx.body = { data: result }
  }

  // 查询所有留言
  async getArticleComment() {
    let sql1 = 'SELECT artcomment.com_name as com_name, ' +
      'artcomment.email as email, ' +
      'artcomment.id as id, ' +
      'artcomment.comment as comment, ' +
      "FROM_UNIXTIME(artcomment.add_time,'%Y-%m-%d') as add_time," +
      'artcomment.art_id as art_id, ' +
      'artcomment.is_pass as is_pass, ' +
      'artcomment.is_reply as is_reply,' +
      'artcomment.reply_id as reply ' +
      'FROM artcomment'

    let sql2 = 'SELECT * FROM artcomment WHERE is_pass=0 AND is_reply=0'

    const result = await this.app.mysql.query(sql1)
    const failResult = await this.app.mysql.query(sql2)

    this.ctx.body = { list: result, failList: failResult }

  }

  // 通过 / 删除留言
  async upPassComment() {
    let id = this.ctx.request.body.id
    let type = this.ctx.request.body.type
    //如果是1 代表通过
    if (type === 'pass') {
      let sql = 'UPDATE artcomment SET is_pass=1  WHERE id=' + id;
      const result = await this.app.mysql.query(sql)
      let isSuccess = result.affectedRows == 1
      this.ctx.body = {
        isSuccess: isSuccess,
        msg: '已通过'
      }
    }
    if (type === 'delete') {
      let result = await this.app.mysql.delete('artcomment', { "id": id })
      let isSuccess = result.affectedRows == 1
      this.ctx.body = {
        isSuccess: isSuccess,
        msg: '已删除'
      }
    }
  }
}
module.exports = MainController