var express = require('express');
var path = require('path');
var router = express.Router();
const mongoose = require('mongoose');




/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../../dist/cms/browser/index.html'));
});



module.exports = router;