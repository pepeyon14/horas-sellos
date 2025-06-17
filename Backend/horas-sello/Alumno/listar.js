function listarAlumnos(app, db) {
    app.get('/api/listar-alumnos', (req, res) => {
        const query = 'SELECT * FROM Alumno';
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error al obtener los datos del alumno', err);
                return res.status(500).json({ error: 'Error al obtener los datos del alumno' });
            }
            res.json(results);
        });
    });
}
module.exports = listarAlumnos;