const express = require('express')
const path = require('path')

const ApplicationRoot = require('../../ApplicationRoot.js')


PublicFilesMiddleware = function() { 
  app = express()
  // app.use express.static(path.join(ApplicationRoot, 'public'))
  app.use(express.static(path.join(ApplicationRoot, 'devPublic')))
  app.use('/data', express.static(path.join(ApplicationRoot, 'data')))
  return app
}


module.exports = PublicFilesMiddleware
