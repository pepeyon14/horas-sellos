// horas-sello/Administrativos/admin-adm.js
const express = require('express');
const bcrypt  = require('bcryptjs');

module.exports = (db) => {
  const router = express.Router();

  // POST  /api/administrativos/crear        ← crear cuenta
  router.post('/crear', async (req, res) => {
    const {
      rut,
      password,
      nombre,
      apellido,
      cargo,
      correo
    } = req.body || {};

    // 1) Validaciones mínimas
    if (!rut || !password || !nombre || !apellido || !cargo || !correo) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    try {
      // 2) ¿Existe el rut?
      const [dup] = await db.execute(
        'SELECT 1 FROM Administrativos WHERE RutAdministrativos = ? LIMIT 1',
        [rut]
      );
      if (dup.length) {
        return res.status(409).json({ error: 'El RUT ya está registrado' });
      }

      // 3) Hash de la contraseña
      const hash = await bcrypt.hash(password, 12);

      // 4) Inserción
      await db.execute(
        'INSERT INTO Administrativos (RutAdministrativos, Contraseña, Nombre, Apellido, Cargo, Correo) VALUES (?,?,?,?,?,?)',
        [rut, hash, nombre, apellido, cargo, correo]
      );

      res.status(201).json({ ok: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al crear administrador' });
    }
  });

  return router;
};
