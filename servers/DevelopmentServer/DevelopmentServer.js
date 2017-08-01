
const ApplicationRoot = require('../../ApplicationRoot.js');
const path = require('path');


require('dotenv').config({
  path: path.join(ApplicationRoot, 'servers/DevelopmentServer/.env')
});

Server = require('../Server.js');

const PublicFilesMiddleware = require('../middleware/PublicFilesMiddleware.js');
const WebpackDevMiddleware = require('../middleware/WebpackDevMiddleware.js')
// const ImageGenerationMiddleware = require('../../middleware/ImageGenerationMiddleware.js');
const DevelopmentPageMiddleware = require('../middleware/DevelopmentPageMiddleware.js');
// const JsonDataMiddleware = require('../../middleware/JsonDataMiddleware.js');
// const CSVDataMiddleware = require('../../middleware/CSVDataMiddleware.js');
// const BitlyMiddleware = require('../../middleware/BitlyMiddleware.js');

Server([
  PublicFilesMiddleware(),
  WebpackDevMiddleware(),
  // ImageGenerationMiddleware(),
  // JsonDataMiddleware(),
  DevelopmentPageMiddleware(),
  // CSVDataMiddleware(),
  // BitlyMiddleware()
]);
// Server([PublicFilesMiddleware(), ImageGenerationMiddleware(), JsonDataMiddleware(), DevelopmentPageMiddleware(), CSVDataMiddleware(), BitlyMiddleware()]);