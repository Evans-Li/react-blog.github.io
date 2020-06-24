
// 'use strict';
const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    let results = await this.app.mysql.get('content')
    console.log('index被访问了!' + new Date())
    this.ctx.body = {
      data: results
    }
  }
  async getArticleList() {  // 获取博客首页数据
   

    let sql = 'SELECT article.id as id ,' +
      'article.title as title ,' +
      'article.introduce as introduce ,' +
      'article.is_top as is_top ,' +
      //  todo 格式化时间start
      // "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
      //  todo 格式化时间end
      'article.view_count as view_count ,' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id'

    // let sql = 'SELECT * FROM article'

    let results = await this.app.mysql.query(sql, {})
    console.log('[ok] getArticleList')
    this.ctx.body = {
      data: results
    }
  }

  async getArticleById() {  // 点击首页文章标题 获取文章数据
    //先配置路由的动态传值，然后再接收值
    let id = this.ctx.params.id
     // 增加阅读数
     let sql2 = "update article set view_count = view_count + 1 where id =" + id;
     const result2 = await this.app.mysql.query(sql2);

    let sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.article_content as article_content,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d ' ) as addTime," +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ,' +
      'type.id as typeId ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE article.id=' + id

    const result = await this.app.mysql.query(sql, {})
    console.log('[ok] getArticleById');
    this.ctx.body = {
      data: result
    }
  }
  async getTypeInfo() { // 获取header 类别
    let result = await this.app.mysql.select('type')
    this.ctx.body = { data: result }
    console.log(' [ok] getTypeInfo被访问了!');

  }

  async getListById() {  //根据类别显示文章列表内容
    let id = this.ctx.params.id
    let sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE type_id=' + id
    const result = await this.app.mysql.query(sql)
    console.log(`[ok] getListById被访问了!`)
    this.ctx.body = { data: result }

  }
  //  添加评论
  async addComment() {
    let tmpComment = this.ctx.request.body;
    const result = await this.app.mysql.insert("artcomment", tmpComment);
    console.log(result)
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;
    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId: insertId,
    };
    console.log(`[ok] addComment`)

  }

  //获取总文章数和总浏览数
  async getAllPartCount() {
    let sql = `SELECT count(1) as total,
        SUM(view_count) as all_view_count
        FROM article`;

    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }

  //根据文章ID获得评论列表
  async getCommentListById() {
    let id = this.ctx.params.id;
    let sql = `
      SELECT artcomment.id as id,
      artcomment.art_id as art_id,
      artcomment.com_name as com_name,
      artcomment.is_reply as is_reply,
      artcomment.reply_id as reply_id,
      FROM_UNIXTIME(artcomment.add_time,'%Y-%m-%d' ) as add_time,
      artcomment.comment as comment 
      FROM artcomment LEFT JOIN article ON artcomment.art_id = article.Id 
      WHERE article.id = ${id}
    `;

    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
    console.log(`[ok] getCommentListById`)
  }

}

module.exports = HomeController