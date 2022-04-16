const config = require("../config");
const checkAuthentication = async (ctx, next) => {
    if(ctx.session.isAuthenticated){
        return ctx.redirect('/apps')
    }
    await next()
}

const isAuthenticated = async (ctx, next) => {
    if(!ctx.session.isAuthenticated){
        return ctx.redirect('/login')
    }
    await next()
}

const isAdminAuthenticated = async (ctx, next) => {
    if (ctx.session.username !== config.APP_USERNAME) {
        return ctx.redirect('/login')
    }
    if(!ctx.session.isAuthenticated){
        return ctx.redirect('/login')
    }
    await next()
}

module.exports = {
    isAuthenticated,
    checkAuthentication,
    isAdminAuthenticated,
};
