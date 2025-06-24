// horas-sello/Encargados/admin-encargado.js
const express = require('express');

function soloAdministradores(req, res, next) {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: 'Token requerido' });

    const token = header.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if (payload.rol !== 'administrador') {
        return res.status(403).json({ error: 'Solo administradores' });
        }
        req.user = payload;
        next();
    } catch {
        return res.status(401).json({ error: 'Token inválido' });
    }
}

module.exports = (db) => {
  const router = express.Router();

  // POST /api/encargados/crear ← crear encargado
  router.post('/crear', async (req, res) => {
  // router.post('/crear',soloAdministradores async (req, res) => {
    const {
      rut,
      nombre,
      apellido,
      correo,
      telefono
    } = req.body || {};

    // 1) Validaciones mínimas
    if (!rut || !nombre || !apellido || !correo || !telefono) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    try {
      // 2) ¿Existe el rut?
      const [dup] = await db.execute(
        'SELECT 1 FROM Encargado WHERE RutEncargado = ? LIMIT 1',
        [rut]
      );
      if (dup.length) {
        return res.status(409).json({ error: 'El RUT ya está registrado' });
      }

      // 3) Inserción
      await db.execute(
        'INSERT INTO Encargado (RutEncargado, Nombre, Apellido, Correo, Telefono) VALUES (?, ?, ?, ?, ?)',
        [rut, nombre, apellido, correo, telefono]
      );

      res.status(201).json({ ok: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al crear encargado' });
    }
  });

  return router;
};