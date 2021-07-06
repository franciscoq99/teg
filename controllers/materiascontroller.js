
var bd = require('../config/conexion');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    // -----<<<>>>---- docente ----<<<>>>----
    crear: (req, res) => {
        res.render('materias/crear.ejs');
    },

    guardar: async (req, res) => {
        function codigofinal() {
            const pre = uuidv4();
            return pre;
        };
        const codigo = codigofinal();
        const { titulo, descripcion, academico } = req.body;
        const newmateria = {
            titulo,
            academico,
            descripcion,
            codigo,
            id_docente: req.user.id_docente,
        };

        await bd.query('INSERT INTO materia set ?', [newmateria]);
        req.flash('success', 'agregado correctamente')
        res.redirect('/materias');
    },

    index: async (req, res) => {
        const conexion = await bd.query('SELECT * FROM materia WHERE id_docente = ?', [req.user.id_docente]);
        res.render('materias/index.ejs', { materia: conexion });
    },

    eliminar: async (req, res) => {
        const { codigo } = req.params;
        await bd.query('DELETE FROM materia WHERE codigo = ?', [codigo]);
        req.flash('success', 'eliminado correctamente')

        res.redirect('/materias');
    },

    editar: async (req, res) => {
        const { codigo } = req.params;
        const materia = await bd.query('SELECT * FROM materia WHERE codigo= ?', [codigo]);
        res.render('materias/editar', { materia: materia[0] })
    },

    modificar: async (req, res) => {
        const { codigo } = req.params;
        const { titulo, academico, descripcion } = req.body;
        const newmateria = {
            titulo,
            academico,
            descripcion

        }
        await bd.query('UPDATE materia SET ? WHERE codigo =? ', [newmateria, codigo]);
        req.flash('success', 'actualizado correctamente')
        res.redirect('/materias');
    },

    listaestudiante: async (req, res) => {
        const { codigo } = req.params;
        const existeMateria = await bd.query('SELECT * FROM materia where codigo = ?', [codigo]);

        if (existeMateria.length == 0) {
            res.render('error', {message: "Materia no encontrada", error:{}});
        }

        const materia = await bd.query('SELECT materia.codigo, materia.titulo, alumno.nombre, alumno.apellido FROM matricula INNER JOIN materia ON matricula.codigo = materia.codigo INNER JOIN alumno ON matricula.id_alumno = alumno.id_alumno WHERE materia.codigo = ?', [codigo]);
        if (!materia) {
            res.send('error');
        }

        res.render('materias/lista-estudiante', { materia: materia })
    },
    // ----<<<>>>----- estudiante----<<<>>>>----
    add: async (req, res) => {
        const materias = await bd.query('SELECT * FROM materia ORDER BY titulo ASC');
        res.render('materias/add.ejs', {  
            error: req.flash('error')[0],
            materias: materias 
        });
    },

    agg: async (req, res) => {
        const { codigo } = req.body;
        const idAlumno = req.user.id_alumno;
        const existe = await bd.query("SELECT * FROM matricula WHERE codigo = ? AND id_alumno = ?", [codigo, idAlumno])

        if (existe.length == 0) {
            const newmateria = {
                codigo,
                id_alumno: idAlumno
            };

            await bd.query('INSERT INTO matricula set ?', [newmateria]);
            res.redirect('/materias/lista');
        }
        //res.render('error', {message: "Esta materia ya fue inscrita anteriormente", error:{}});
        req.flash('error', 'Esta materia ya fue inscrita anteriormente');
        res.redirect('/materias/add')
    },

    lista: async (req, res) => {
        const conexion = await bd.query('SELECT matricula.id_matricula, materia.codigo, materia.titulo FROM matricula INNER JOIN materia ON matricula.codigo = materia.codigo where matricula.id_alumno = ?', [req.user.id_alumno]);
        res.render('materias/lista.ejs', { materia: conexion });
    }

}