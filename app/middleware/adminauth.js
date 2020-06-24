const Controller = require('egg').Controller


module.exports = options => {
  return async function adminauth(ctx, next) {
    let cookie = ctx.cookies.get('openId')
    let session = ctx.session.openId
    console.log('cookie',cookie)
    console.log('session',session)
    
    if (cookie == session) {
      await next()
    } else {
      ctx.body = { data: '未登录' }
    }
     
  }
}








// ctx.set('Access-Control-Allow-Origin', ctx.host);
    // ctx.set('Access-Control-Allow-Credentials', 'true');
    // ctx.set('Access-Control-Allow-Headers', 'Content-Type');
    // ctx.set('Access-Control-Allow-Methods: ["GET","POST","DELETE"]')
    
    // console.log('openId', ctx.session.openId)




    // ctx.set('Access-Control-Allow-Origin', ctx.host);
    // ctx.set('Access-Control-Allow-Credentials', 'true');
    // ctx.set('Access-Control-Allow-Headers', 'Content-Type');