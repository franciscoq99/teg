
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
        const materia = await bd.query('SELECT * FROM materia where codigo = ?', [codigo]);

        if (materia.length == 0) {
            res.render('error', {message: "Materia no encontrada", error:{}});
        }
        const listado = await bd.query('SELECT matricula.id_matricula, alumno.id_alumno, alumno.nombre, alumno.apellido, AVG(nota.nota) as nota FROM matricula INNER JOIN materia ON matricula.codigo = materia.codigo INNER JOIN alumno ON matricula.id_alumno = alumno.id_alumno LEFT JOIN nota ON matricula.id_matricula = nota.id_matricula WHERE materia.codigo = ? GROUP BY matricula.id_alumno;', [codigo]);
        if (!listado) {
            res.send('error');
        }
        res.render('materias/lista-estudiante', { materia: materia[0], listado: listado })
    },

    notasestudiante: async (req, res) => {
        const { id_matricula, } = req.params;

        const matricula = await bd.query('SELECT * FROM matricula where id_matricula = ?', [id_matricula]);

        if (matricula.length == 0) {
            res.render('error', {message: "Registro no encontrado", error:{}});
        }

        const {id_alumno, codigo} = matricula[0];

        const alumno = await bd.query('SELECT * FROM alumno where id_alumno = ?', [id_alumno]);
        const materia = await bd.query('SELECT * FROM materia where codigo = ?', [codigo]);

        if (alumno.length == 0) {
            res.render('error', {message: "Alumno no encontrado", error:{}});
        }

        if (materia.length == 0) {
            res.render('error', {message: "Materia no encontrada", error:{}});
        }

        const listado = await bd.query('SELECT nota.*, matricula.codigo, matricula.id_alumno FROM nota INNER JOIN matricula ON matricula.id_matricula = nota.id_matricula WHERE nota.id_matricula = ?', [id_matricula]);
        if (!listado) {
            res.send('error');
        }
        res.render('materias/notas-estudiante', { materia: materia[0], alumno: alumno[0], matricula: matricula[0], listado: listado })
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
   
        req.flash('error', 'Esta materia ya fue inscrita anteriormente');
        res.redirect('/materias/add')
    },

    addNotas: async (req, res) => {
        const { nota, asunto, id_matricula } = req.body;
       
        const newnota = {
            id_matricula,
            nota,
            asunto,
        };

        await bd.query('INSERT INTO nota set ?', [newnota]);
        res.redirect('/materias/notas-estudiante/' + id_matricula);
        

        req.flash('error', 'No se pudo agregar la nota');
        res.redirect('/materias/notas-estudiante/' + id_matricula)
    },

    lista: async (req, res) => {
        const conexion = await bd.query('SELECT matricula.id_matricula, materia.codigo, materia.titulo FROM matricula INNER JOIN materia ON matricula.codigo = materia.codigo where matricula.id_alumno = ?', [req.user.id_alumno]);
        res.render('materias/lista.ejs', { materia: conexion });
    }

}