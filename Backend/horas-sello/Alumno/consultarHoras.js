function consultarHoras(app, db) {
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
}

module.exports = consultarHoras;