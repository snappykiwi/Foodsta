const router = require('express').Router();
const apiRoutes = require('./apiRoutes.js');


router.use('/api', apiRoutes);
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'client', 'src', 'idex.html')));


module.exports = router