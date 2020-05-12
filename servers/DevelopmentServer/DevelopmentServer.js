import Path from 'path'
import dotenv from 'dotenv'

import ApplicationRoot from '../../ApplicationRoot.js'

dotenv.config({
  path: Path.join(ApplicationRoot, 'servers/DevelopmentServer/.env')
})

import PublicFilesMiddleware from '../middleware/PublicFilesMiddleware.js'
import WebpackDevMiddleware from '../middleware/WebpackDevMiddleware.js'
import DevelopmentPageMiddleware from '../middleware/DevelopmentPageMiddleware.js'
import BitlyMiddleware from '../middleware/BitlyMiddleware.js'

import Server from '../Server.js'

Server([
  PublicFilesMiddleware(),
  WebpackDevMiddleware(),
  DevelopmentPageMiddleware(),
  BitlyMiddleware()
])
