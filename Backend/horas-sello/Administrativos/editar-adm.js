const express = require('express');
const jwt     = require('jsonwebtoken');
const bcrypt  = require('bcryptjs');

module.exports = (db) => {
  const router = express.Router();

  /* ---------- verificador interno de token ---------- */
  function verifyToken(req, res) {
    const header = req.headers.authorization;
    if (!header) { res.status(401).json({ error: 'Sin token' }); return false; }
    const token = header.split(' ')[1];
    try { req.user = jwt.verify(token, process.env.JWT_SECRET); return true; }
    catch { res.status(401).json({ error: 'Token inválido' }); return false; }
  }

  /* ---------- PUT /api/administrativos/:rut ---------- */
  router.put('/editar/:rut', async (req, res) => {
    // if (!verifyToken(req, res)) return;               // prote­gido

    const { rut } = req.params;
    const { password, nombre, apellido, cargo, correo } = req.body || {};

    // construir SET dinámico según campos presentes
    const set = [];
    const vals = [];

    try {
      if (password) {
        const hash = await bcrypt.hash(password, 12);
        set.push('`Contraseña` = ?');
        vals.push(hash);
      }
      if (nombre)   { set.push('Nombre = ?');   vals.push(nombre); }
      if (apellido) { set.push('Apellido = ?'); vals.push(apellido); }
      if (cargo)    { set.push('Cargo = ?');    vals.push(cargo); }
      if (correo)   { set.push('Correo = ?');   vals.push(correo); }

      if (!set.length)
        return res.status(400).json({ error: 'Nada que actualizar' });

      vals.push(rut);   // para el WHERE

      const [result] = await db.execute(
        `UPDATE Administrativos SET ${set.join(', ')} WHERE RutAdministrativos = ?`,
        vals
      );

      if (result.affectedRows === 0)
        return res.status(404).json({ error: 'Administrador no encontrado' });

      res.json({ ok: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al actualizar administrador' });
    }
  });

  return router;
};
