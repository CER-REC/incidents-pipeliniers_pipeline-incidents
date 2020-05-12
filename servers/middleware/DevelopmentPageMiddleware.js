import Express from 'express'
import Path from 'path'
import MustacheExpress from 'mustache-express'

import ApplicationRoot from '../../ApplicationRoot.js'


const DevelopmentPageMiddleware = function () {

  const app = Express()

  // view engine setup
  app.engine('mustache', MustacheExpress())

  app.set('views', Path.join(ApplicationRoot, 'servers', 'views'))
  app.set('view engine', 'mustache')

  const router = Express.Router()

  // Direct the root to the newer template
  router.get('/', function (req, res) {
    res.render('app', {title: 'WET 4.0.20'})
  })

  app.use(router)

  // Turn off caching!
  app.disable('view cache')

  return app


}




export default DevelopmentPageMiddleware
