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

  /* ---------- PUT /api/alumnos/editar/:rut ---------- */
  router.put('/editar/:rut', async (req, res) => {
    // if (!verifyToken(req, res)) return;

    const { rut } = req.params;
    const { nombre, apellido, facultad, carrera, generacion } = req.body || {};

    const set = [];
    const vals = [];

    if (nombre)      { set.push('Nombre = ?');     vals.push(nombre); }
    if (apellido)    { set.push('Apellido = ?');   vals.push(apellido); }
    if (facultad)    { set.push('Facultad = ?');   vals.push(facultad); }
    if (carrera)     { set.push('Carrera = ?');    vals.push(carrera); }
    if (generacion !== undefined) {
      set.push('Generacion = ?');
      vals.push(generacion);
    }

    if (!set.length)
      return res.status(400).json({ error: 'Nada que actualizar' });

    vals.push(rut); // para el WHERE

    try {
      const [result] = await db.execute(
        `UPDATE Alumno SET ${set.join(', ')} WHERE RutAlumno = ?`,
        vals
      );

      if (result.affectedRows === 0)
        return res.status(404).json({ error: 'Alumno no encontrado' });

      res.json({ ok: true });
    } catch (err) {
      console.error('Error al actualizar alumno', err);
      res.status(500).json({ error: 'Error al actualizar alumno' });
    }
  });

  return router;
};