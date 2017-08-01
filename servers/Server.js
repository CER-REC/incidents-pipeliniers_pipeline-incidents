

const Express = require('express')
// Compression = require('compression')

Server = function(middlewares) {
  var app, i, len, middleware, rootApp
  rootApp = Express()
  if (process.env.APP_PATH_PREFIX) {
    app = Express()
    rootApp.use(process.env.APP_PATH_PREFIX, app)
  } else {
    app = rootApp
  }

  for (i = 0, len = middlewares.length; i < len; i++) {
    middleware = middlewares[i]
    app.use(middleware)
  }

  app.use(function(req, res) {
    return res.status(404).send('404: Not Found.')
  })

  rootApp.listen(process.env.PORT || process.env.PORT_NUMBER, function() {
    if (process.env.APP_PATH_PREFIX) {
      console.log("Ready: " + process.env.HOST + ":" + process.env.PORT_NUMBER + process.env.APP_PATH_PREFIX)
    } else {
      console.log("Ready: " + process.env.HOST + ":" + process.env.PORT_NUMBER)
    }
    return rootApp.emit('server-online')
  })
  return rootApp
}

module.exports = Server