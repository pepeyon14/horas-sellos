const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  // GET /api/consultar-horas/alumno/:rut
  router.get('/alumno/:rut', async (req, res) => {
    const { rut } = req.params;
    try {
      const [rows] = await db.execute(
        'SELECT * FROM ConsultaHoras WHERE RutAlumno = ?',
        [rut]
      );

      if (!rows.length)
        return res.status(404).json({ mensaje: 'No se encontraron registros para ese RUT' });

      res.json(rows);
    } catch (err) {
      console.error('Error al obtener horas por RUT', err);
      res.status(500).json({ error: 'Error al obtener horas por RUT' });
    }
  });

  return router;
};