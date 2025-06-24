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

  // ---------- PUT /api/registro-horas/editar/:id ----------
  router.put('/editar/:id', async (req, res) => {
    // if (!verifyToken(req, res)) return;

    const { id } = req.params;
    const {
      idEvento,
      rutAlumno,
      rutAdmin,
      fechaInicio,
      fechaTermino,
      cantidadHoras
    } = req.body || {};

    const set = [];
    const vals = [];

    try {
      if (idEvento)      { set.push('ID_Evento = ?');         vals.push(idEvento); }
      if (rutAlumno)     { set.push('RutAlumno = ?');         vals.push(rutAlumno); }
      if (rutAdmin)      { set.push('RutAdministrativos = ?');vals.push(rutAdmin); }
      if (fechaInicio)   { set.push('FechaInicio = ?');       vals.push(fechaInicio); }
      if (fechaTermino)  { set.push('FechaTermino = ?');      vals.push(fechaTermino); }
      if (cantidadHoras !== undefined) { set.push('CantidadHoras = ?'); vals.push(cantidadHoras); }

      if (!set.length)
        return res.status(400).json({ error: 'Nada que actualizar' });

      vals.push(id); // para el WHERE

      const [result] = await db.execute(
        `UPDATE RegistroHoras SET ${set.join(', ')} WHERE ID_HoraSello = ?`,
        vals
      );

      if (result.affectedRows === 0)
        return res.status(404).json({ error: 'Registro no encontrado' });

      res.json({ ok: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al actualizar registro' });
    }
  });

  return router;
};