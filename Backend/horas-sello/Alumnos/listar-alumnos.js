const express = require('express');
const jwt     = require('jsonwebtoken');

module.exports = (db) => {
  const router = express.Router();

  /* ---------- Verificador de token (opcional) ---------- */
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

  /* ---------- GET /api/alumnos/listar ---------- */
  router.get('/listar', async (req, res) => {
    // if (!verifyToken(req, res)) return;

    try {
      const [rows] = await db.execute(`
        SELECT
          RutAlumno AS rut,
          Nombre,
          Apellido,
          Facultad,
          Carrera,
          Generacion
        FROM Alumno
      `);
      res.json(rows);
    } catch (err) {
      console.error('Error al obtener alumnos', err);
      res.status(500).json({ error: 'Error al obtener alumnos' });
    }
  });

  return router;
};