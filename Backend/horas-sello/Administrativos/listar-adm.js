// horas-sello/Administrativos/listar-adm.js
const express = require('express');
const jwt     = require('jsonwebtoken');

module.exports = (db) => {
  const router = express.Router();

  /* ---------- 1. Función interna: verificar JWT ---------- */
  function verifyToken(req, res) {
    const header = req.headers.authorization;          // "Bearer <token>"
    if (!header) {
      res.status(401).json({ error: 'Sin token' });
      return false;
    }

    const token = header.split(' ')[1];
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET); // opcional: guardar payload
      return true;                                          // OK
    } catch {
      res.status(401).json({ error: 'Token inválido' });
      return false;
    }
  }

  /* ---------- 2. Función principal: listado protegido ---------- */
  async function listarAdministradores(req, res) {
    // 2.1 Llama al verificador
    // if (!verifyToken(req, res)) return;   // ← corta si el token es inválido

    // 2.2 Consulta la BD
    try {
      const [rows] = await db.execute(
        'SELECT RutAdministrativos AS rut, Nombre, Apellido, Cargo, Correo FROM Administrativos'
      );
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener administradores' });
    }
  }

  // 3. Ruta GET /api/administrativos/listar
  router.get('/listar', listarAdministradores);

  return router;
};
