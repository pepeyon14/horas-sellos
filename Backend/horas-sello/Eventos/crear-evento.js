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

  // ---------- POST /api/eventos/crear ----------
  router.post('/crear', async (req, res) => {
    // if (!verifyToken(req, res)) return;

    const {
      nombre,
      descripcion,
      rutEncargado,
      fecha,
      tipo,
      publico,
      cantidadHoras,
      estado
    } = req.body || {};

    // Validación mínima
    if (!nombre || !rutEncargado || !fecha || tipo == null || publico == null || cantidadHoras == null || estado == null) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    try {
      await db.execute(
        `INSERT INTO EVENTO (
          Nombre, Descripcion, RutEncargado, Fecha, Tipo, Publico, CantidadHoras, Estado
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          nombre,
          descripcion || null,
          rutEncargado,
          fecha,
          tipo,
          publico,
          cantidadHoras,
          estado
        ]
      );

      res.status(201).json({ ok: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al crear evento' });
    }
  });

  return router;
};