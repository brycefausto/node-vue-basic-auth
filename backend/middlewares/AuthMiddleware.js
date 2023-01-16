const AuthMiddleware = (req, res, next) => {
  if (!req.user) {
      res.status(401).send('You are not authenticated')
  } else {
      return next()
  }
}

export default AuthMiddleware