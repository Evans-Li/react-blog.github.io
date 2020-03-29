
// 'use strict';
// import {consoLog} from './utils.js'
// const consoLog = require('./utils')
const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    let results = await this.app.mysql.get('content')
    console.log('index被访问了!'+ new Date())
    this.ctx.body = {
      data: results
    }
    
    // this.ctx.body = {
      
    //   jjj: 'dfa'
    // }
  }
  async getArticleList() {  // 获取博客首页数据

    let sql = 'SELECT article.id as id ,'+
              'article.title as title ,'+
              'article.introduce as introduce ,'+
              //  todo 格式化时间start
              "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
              //  todo 格式化时间end
              'article.view_count as view_count ,'+
              'type.typeName as typeName '+
              'FROM article LEFT JOIN type ON article.type_id = type.Id'

    // let sql = 'SELECT * FROM article'

    let results = await this.app.mysql.query(sql,{})
    console.log('getArticleList\t被访问了!'+ new Date())
    this.ctx.body = {
      data: results
    }
  }

  async getArticleById(){  // 点击首页文章标题 获取文章数据
    //先配置路由的动态传值，然后再接收值
    let id = this.ctx.params.id

    let sql = 'SELECT article.id as id,'+
    'article.title as title,'+
    'article.introduce as introduce,'+
    'article.article_content as article_content,'+
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
    'article.view_count as view_count ,'+
    'type.typeName as typeName ,'+
    'type.id as typeId '+
    'FROM article LEFT JOIN type ON article.type_id = type.Id '+
    'WHERE article.id='+id
    
    const result = await this.app.mysql.query(sql,{})
    console.log('getArticleById被访问了!'+ new Date());
    this.ctx.body = {
      data: result
    }
}
  async getTypeInfo() { // 获取header 类别
    let result = await this.app.mysql.select('type')
    this.ctx.body = { data: result }
    console.log('getTypeInfo被访问了!'+ new Date());
    
  }

  async getListById(){  //根据类别显示文章列表内容
    let id = this.ctx.params.id
    let sql = 'SELECT article.id as id,'+
    'article.title as title,'+
    'article.introduce as introduce,'+
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
    'article.view_count as view_count ,'+
    'type.typeName as typeName '+
    'FROM article LEFT JOIN type ON article.type_id = type.Id '+
    'WHERE type_id='+id
    const result = await this.app.mysql.query(sql)
    console.log(`getListById被访问了!`+ new Date())
    this.ctx.body={data:result}

}
}

module.exports = HomeController