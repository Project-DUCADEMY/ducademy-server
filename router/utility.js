function redirect(res, link) {
    res.statusCode = 302;
    res.setHeader('Location', link);
    res.end();
}
module.exports.redirect = utility;