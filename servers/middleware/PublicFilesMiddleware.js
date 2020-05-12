import Express from 'express'
import Path from 'path'

import ApplicationRoot from '../../ApplicationRoot.js'


const PublicFilesMiddleware = function() { 
  const app = Express()
  app.use(Express.static(Path.join(ApplicationRoot, 'public')))
  app.use(Express.static(Path.join(ApplicationRoot, 'devPublic')))
  app.use('/data', Express.static(Path.join(ApplicationRoot, 'data')))
  return app
}


export default PublicFilesMiddleware
