const express = require('express');

module.exports = (db) => {
  const router = express.Router();
  router.post('/crear', async (req, res) => {
    // Destructuring usando los nombres tal como llegan
    const {
      ID_Evento,
      RutAlumno,
      RutAdministrativos,
      FechaInicio,
      FechaTermino,
      CantidadHoras
    } = req.body || {};

    // Validación mínima
    if (
      !ID_Evento ||
      !RutAlumno ||
      !RutAdministrativos ||
      !FechaInicio ||
      !FechaTermino ||
      CantidadHoras == null
    ) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    try {
      await db.execute(
        `INSERT INTO RegistroHoras (
          ID_Evento, RutAlumno, RutAdministrativos,
          FechaInicio, FechaTermino, CantidadHoras
        ) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          ID_Evento,
          RutAlumno,
          RutAdministrativos,
          FechaInicio,
          FechaTermino,
          CantidadHoras
        ]
      );

      res.status(201).json({ ok: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al crear registro de horas' });
    }
  });
  return router;
}