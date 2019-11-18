// Get dependencies
const
    express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    routes = require("./routes"),
    PORT = process.env.PORT || 3000,
    app = express();

app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(express.static(path.join(__dirname, 'dist')))
    .use(routes);

app.get('/api', routes)
// Catch all other routes and return the index file
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'src/index.html')));

/**
 * Listen on provided port, on all network interfaces.
 */
app.listen(PORT, () => console.log(`API running on localhost:${PORT}`));
