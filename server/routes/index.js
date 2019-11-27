const router = require('express').Router();
const apiRoutes = require('./apiRoutes.js');
const path = require('path');


router.use('/api', apiRoutes);
console.log("the path I think it is", path.join(__dirname, '..', '..', 'client', 'dist', 'index.html'));
router.get('/', (req, res) => res.sendFile(path.join(__dirname, '..', '..', 'client', 'dist', 'project-three', 'index.html')));


module.exports = router