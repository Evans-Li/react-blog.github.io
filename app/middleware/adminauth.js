module.exports = options => {
  return async function adminauth(ctx, next) {
    console.log(ctx);
    
    // ctx.set('Access-Control-Allow-Origin', ctx.host);
    // ctx.set('Access-Control-Allow-Credentials', 'true');
    // ctx.set('Access-Control-Allow-Headers', 'Content-Type');
    // ctx.set('Access-Control-Allow-Methods: ["GET","POST","DELETE"]')
    console.log('openId', ctx.session.openId)
    if (ctx.session.openId) {
      await next()
    } else {
      ctx.body = { data: '未登录' }
    }
     // ctx.set('Access-Control-Allow-Origin', ctx.host);
    // ctx.set('Access-Control-Allow-Credentials', 'true');
    // ctx.set('Access-Control-Allow-Headers', 'Content-Type');
  }
}