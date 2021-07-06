var express = require('express');
var router = express.Router();
const chatscontroller = require('../controllers/chatscontroller');
// ------<<<<<<|||>>>>>>------DOCENTE------<<<<<<|||>>>>>>------
/* GET page. */
router.get('/', chatscontroller.index);

module.exports = router;