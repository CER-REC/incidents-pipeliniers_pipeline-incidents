import Express from 'express'
import Tr from '../app/TranslationTable.js'
// import Compression from 'compression'

const Server = function(middlewares) {
  let i, len, middleware

  // Prepare the Express app for the incident visualization
  const app = Express()
  for (i = 0, len = middlewares.length; i < len; i++) {
    middleware = middlewares[i]
    app.use(middleware)
  }

  const rootApp = Express()

  // Host the incident visualization app with both French and English endpoints
  rootApp.use(Tr.getIn(['applicationPath', 'en']), app)
  rootApp.use(Tr.getIn(['applicationPath', 'fr']), app)

  rootApp.use(function(req, res) {
    return res.status(404).send('404: Not Found.')
  })

  rootApp.listen(process.env.PORT || process.env.PORT_NUMBER, function() {
    console.log(`Ready: ${process.env.HOST}:${process.env.PORT_NUMBER}${Tr.getIn(['applicationPath', 'en'])}`)
    console.log(`Ready: ${process.env.HOST}:${process.env.PORT_NUMBER}${Tr.getIn(['applicationPath', 'fr'])}`)
    return rootApp.emit('server-online')
  })
  return rootApp
}


export default Server
