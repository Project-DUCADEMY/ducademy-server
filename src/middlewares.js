export const localsMiddlewares = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn)
  res.locals.loggedInUser = req.session.user || {}
  next()
}

export const protectedMiddleware = (req, res, next) => {
  console.log(req.session.loggedIn)
  if (req.session.loggedIn) {
    return next()
  } else {
    return res.status(401).json({
      code: 401,
      errorMessage: "Session does not exist",
    })
  }
}
