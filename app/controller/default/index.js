
// 'use strict';
const Controller = require('egg').Controller
const ms = require('ms');

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
    console.log(' [ok] getTypeInfo!');

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
    console.log(`[ok] getListById`)
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
      WHERE article.id = ${id} AND is_pass=1 ORDER BY add_time desc
    `;

    let sql2 = `
    SELECT artcomment.id as id,
    artcomment.art_id as art_id,
    artcomment.com_name as com_name,
    artcomment.is_reply as is_reply,
    artcomment.reply_id as reply_id,
    FROM_UNIXTIME(artcomment.add_time,'%Y-%m-%d' ) as add_time,
    artcomment.comment as comment 
    FROM artcomment LEFT JOIN article ON artcomment.art_id = article.Id 
    WHERE article.id = ${id} AND is_reply=1 ORDER BY add_time desc
  `;
    const result = await this.app.mysql.query(sql);
    const result2 = await this.app.mysql.query(sql2);
    this.ctx.body = {
      commList: result,
      replyList:result2
    };
    console.log(`[ok] getCommentListById`)
  }
  // 根据id获取文章点赞数
  async getLikeCount(){
    let id = this.ctx.params.id
    let sql = `
      SELECT article.id as id,
      article.like_count as like_count
      FROM article WHERE article.id = ${id}
    `
    let result = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: result
    }
    console.log('[ok] getLikeCount')
  }
  // 点赞
  async doLike(){
    let sessionId = new Date().getTime()
    let id = this.ctx.request.body.id
    this.ctx.cookies.set('isLike', sessionId, {
      maxAge: 1000 * 3600 * 2, // cookie存储一天 设置过期时间后关闭浏览器重新打开cookie还存在
      httpOnly: true, // 仅允许服务获取,不允许js获取
      signed: true, // 对cookie进行签名 防止用户修改cookie
      overwrite: false, //设置 key 相同的键值对如何处理，如果设置为 true，则后设置的值会覆盖前面设置的，否则将会发送两个 set-cookie 响应头。
      renew: true   // 快过期时重置时间
    })
    this.ctx.session.like = sessionId
    this.ctx.session.maxAge = ms('1d')
    this.ctx.session.renew = true
    console.log(this.ctx.session)
    let sql = `update article set like_count = like_count + 1 where id =${id}`
    let result = await this.app.mysql.query(sql)
    let isSuccess = result.affectedRows == 1
    this.ctx.body = {
      isSuccess:isSuccess
    }
    console.log('[ok] doLike')
  }
  // 根据id获取文章评论数
  async getArticleCommentCountById(){
    let id = this.ctx.params.id
    let sql = `
      SELECT COUNT(art_id) AS count FROM artcomment
      WHERE art_id=${id} AND is_reply=0 AND is_pass=1
    `
    let result = await this.app.mysql.query(sql)
    this.ctx.body = {
      data: result
    }
    console.log('[ok] getArticleCommentCountById')
    
  }

}

module.exports = HomeController