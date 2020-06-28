// const Controller = require('egg').Controller


module.exports = options => {

  return async function likeauth(ctx, next) {
    let likeCookie = ctx.cookies.get('isLike',{
      signed: true,
    })
    // ctx.session.like = null
    let likeSession = ctx.session.like
    console.log(ctx.session)
    if (!!likeSession) {
      ctx.body = { msg: '您已赞过这篇文章', isSuccess: false }
    } else {
      await next()
    }
  }
}