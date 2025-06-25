const express = require('express');

module.exports = (db) => {
  const router = express.Router();
  // ---------- GET /api/registro-horas/listar ----------
  router.get('/listar', async (req, res) => {
    try {
      const [rows] = await db.execute(`
        SELECT 
          ID_HoraSello,
          ID_Evento,
          RutAlumno,
          RutAdministrativos,
          FechaInicio,
          FechaTermino,
          CantidadHoras
        FROM RegistroHoras
      `);

      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener registros de horas' });
    }
  });

  return router;
};