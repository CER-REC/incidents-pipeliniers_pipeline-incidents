const express = require('express')
const path = require('path')
const mustacheExpress = require('mustache-express')

const ApplicationRoot = require('../../ApplicationRoot.js')


DevelopmentPageMiddleware = function () {
 
  const app = express()

  // view engine setup
  app.engine('mustache', mustacheExpress())

  app.set('views', path.join(ApplicationRoot, 'servers', 'views'))
  app.set('view engine', 'mustache')

  const router = express.Router()

  // Direct the root to the newer template
  router.get('/', function (req, res) {
    res.render('app', {title: 'WET 4.0.20'})
  })

  
  app.use(router)

  // Turn off caching!
  app.disable('view cache')

  return app


}




module.exports = DevelopmentPageMiddleware