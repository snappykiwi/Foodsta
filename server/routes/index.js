const router = require('express').Router();
const apiRoutes = require('./apiRoutes.js');
const path = require('path');


router.use('/api', apiRoutes);
router.get('/*', (req, res) => res.sendFile(path.join(__dirname, '..', '..', 'client', 'dist', 'project-three', 'index.html')));


module.exports = router