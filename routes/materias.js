var express = require('express');
var router = express.Router();

const permit = require("../middleware/permit");
const materiascontroller = require('../controllers/materiascontroller');
// ------<<<<<<|||>>>>>>------DOCENTE------<<<<<<|||>>>>>>------
/* GET page. */
router.get('/', materiascontroller.index);
router.get('/crear', permit("docente"), materiascontroller.crear, );
router.get('/eliminar/:codigo', permit("docente"), materiascontroller.eliminar);
router.get('/editar/:codigo', permit("docente"), materiascontroller.editar, );
router.get('/lista-estudiante/:codigo', permit("docente"), materiascontroller.listaestudiante);
// POST page.
router.post('/crear', permit("docente"), materiascontroller.guardar);
router.post('/editar/:codigo', permit("docente"), materiascontroller.modificar);
// ------<<<<<<|||>>>>>>------ESTUDIANTE------<<<<<<|||>>>>>>------
/*GET Page */
router.get('/lista', materiascontroller.lista);
router.get('/add', materiascontroller.add);
//POST Page
router.post('/add',materiascontroller.agg);

module.exports = router;