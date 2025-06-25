const express = require('express');
const jwt     = require('jsonwebtoken');

module.exports = (db) => {
  const router = express.Router();
  // ---------- POST /api/eventos/crear ----------
  router.post('/crear', async (req, res) => {
    const {
      Nombre,
      Descripcion,
      RutEncargado,
      Fecha,
      Tipo,
      Publico,
      CantidadHoras,
      Estado
    } = req.body || {};

    // Validación mínima
    if (!Nombre || !RutEncargado || !Fecha || Tipo == null || Publico == null || CantidadHoras == null || Estado == null) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    try {
      await db.execute(
        `INSERT INTO EVENTO (
          Nombre, Descripcion, RutEncargado, Fecha, Tipo, Publico, CantidadHoras, Estado
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          Nombre,
          Descripcion || null,
          RutEncargado,
          Fecha,
          Tipo,
          Publico,
          CantidadHoras,
          Estado
        ]
      );

      res.status(201).json({ ok: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al crear evento' });
    }

    console.log('Body recibido en /api/eventos/crear:', req.body);
  });

  return router;
};