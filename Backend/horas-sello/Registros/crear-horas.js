const express = require('express');
const jwt     = require('jsonwebtoken');

module.exports = (db) => {
  const router = express.Router();

  // ---------- Verificador de token ----------
  function verifyToken(req, res) {
    const header = req.headers.authorization;
    if (!header) { res.status(401).json({ error: 'Sin token' }); return false; }
    const token = header.split(' ')[1];
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      return true;
    } catch {
      res.status(401).json({ error: 'Token inválido' });
      return false;
    }
  }

  // ---------- POST /api/registro-horas/crear ----------
  router.post('/crear', async (req, res) => {
    // if (!verifyToken(req, res)) return;

    const {
      idEvento,
      rutAlumno,
      rutAdmin,
      fechaInicio,
      fechaTermino,
      cantidadHoras
    } = req.body || {};

    // Validación mínima
    if (!idEvento || !rutAlumno || !rutAdmin || !fechaInicio || !fechaTermino || cantidadHoras == null) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    try {
      await db.execute(
        `INSERT INTO RegistroHoras (
          ID_Evento, RutAlumno, RutAdministrativos,
          FechaInicio, FechaTermino, CantidadHoras
        ) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          idEvento,
          rutAlumno,
          rutAdmin,
          fechaInicio,
          fechaTermino,
          cantidadHoras
        ]
      );

      res.status(201).json({ ok: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al crear registro de horas' });
    }
  });

  return router;
};