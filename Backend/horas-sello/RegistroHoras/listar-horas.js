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

  // ---------- GET /api/registro-horas/listar ----------
  router.get('/listar', async (req, res) => {
    // if (!verifyToken(req, res)) return;

    try {
      const [rows] = await db.execute(`
        SELECT 
          ID_HoraSello AS id,
          ID_Evento AS eventoId,
          RutAlumno AS rutAlumno,
          RutAdministrativos AS rutAdmin,
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