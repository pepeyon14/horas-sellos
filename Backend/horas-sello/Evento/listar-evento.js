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

  // ---------- GET /api/eventos/listar ----------
  router.get('/listar', async (req, res) => {
    // if (!verifyToken(req, res)) return;

    try {
      const [rows] = await db.execute(`
        SELECT 
          ID_Evento AS id,
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