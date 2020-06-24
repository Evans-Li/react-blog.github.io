module.exports = ()=> {
  return async function crossDomain(ctx, next) {
    if (ctx.method == 'OPTIONS') {
      ctx.status = 200;
    }
    else {
      await next();
    }
    ctx.set('Access-Control-Allow-Origin', ctx.host);
    ctx.set('Access-Control-Allow-Credentials', 'true');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type');
  };
};