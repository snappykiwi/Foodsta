// Get dependencies
const
    express = require('express'),
    cors = require('cors'),
    path = require('path'),
    bodyParser = require('body-parser'),
    routes = require("./routes"),
    PORT = process.env.PORT || 3000,
    https = require('https'),
    app = express(),
    fs = require('fs');

app
    .use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(express.static(path.join(__dirname, '..', 'client', 'dist', 'project-three')))
    .use(routes);

app.get('/', routes);
// Catch all other routes and return the index file

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, app)
  .listen(3000, function () {
    console.log('Example app listening on port 3000! Go to https://localhost:3000/')
  })

/**
 * Listen on provided port, on all network interfaces.
 */
// app.listen(PORT, () => console.log(`API running on localhost:${PORT}`));