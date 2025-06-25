const express = require('express');

module.exports = (db) => {
  const router = express.Router();
  // ---------- GET /api/eventos ----------
  router.get('/', async (req, res) => {
    try {
      const [rows] = await db.execute(`
        SELECT 
          ID_Evento,
          Nombre,
          Descripcion,
          RutEncargado,
          Fecha,
          Tipo,
          Publico,
          CantidadHoras,
          Estado
        FROM EVENTO
      `);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener eventos' });
    }
  });

  return router;
};