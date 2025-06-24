  function consultarHoras(app, db) {
    // Ruta que devuelve todos los registros
    app.get('/api/consultar-horas', (req, res) => {
      const query = 'SELECT * FROM ConsultaHoras';
      db.query(query, (err, results) => {
        if (err) {
          console.error('Error al obtener los datos de la vista "ConsultaHoras"', err);
          return res.status(500).json({ error: 'Error al obtener los datos de la vista "ConsultaHoras"' });
        }
        res.json(results);
      });
    });

    // Nueva ruta para obtener horas por RUT
    app.get('/api/horassello/alumno/:rut', (req, res) => {
      const rut = req.params.rut;
      const query = 'SELECT * FROM ConsultaHoras WHERE RutAlumno = ?';

      db.query(query, [rut], (err, results) => {
        if (err) {
          console.error('Error al obtener horas por RUT', err);
          return res.status(500).json({ error: 'Error al obtener horas por RUT' });
        }
        if (results.length === 0) {
          return res.status(404).json({ mensaje: 'No se encontraron registros para ese RUT' });
        }
        res.json(results);
      });
    });
  }

  module.exports = consultarHoras;
