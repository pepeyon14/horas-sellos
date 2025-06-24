const express = require('express');
const jwt     = require('jsonwebtoken');

module.exports = (db) => {
  const router = express.Router();

  /* ---------- 1. Función interna: verificar JWT ---------- */
  function verifyToken(req, res) {
    const header = req.headers.authorization;
    if (!header) {
      res.status(401).json({ error: 'Sin token' });
      return false;
    }

    const token = header.split(' ')[1];
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      return true;
    } catch {
      res.status(401).json({ error: 'Token inválido' });
      return false;
    }
  }

  /* ---------- 2. Función principal: listado protegido ---------- */
  async function listarEncargados(req, res) {
    // if (!verifyToken(req, res)) return; // Descomenta para seguridad

    try {
      const [rows] = await db.execute(
        'SELECT RutEncargado AS rut, Nombre, Apellido, Correo, Telefono FROM Encargado'
      );
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener encargados' });
    }
  }

  // 3. Ruta GET /api/encargados/listar
  router.get('/listar', listarEncargados);

  return router;
};