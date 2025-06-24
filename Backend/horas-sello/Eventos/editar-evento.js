// horas-sello/Eventos/editar-evento.js
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

  // ---------- PUT /api/eventos/editar/:id ----------
  router.put('/editar/:id', async (req, res) => {
    // if (!verifyToken(req, res)) return;

    const { id } = req.params;
    const {
      nombre,
      descripcion,
      rutEncargado,
      fecha,
      tipo,
      publico,
      cantidadHoras,
      estado
    } = req.body || {};

    const set = [];
    const vals = [];

    try {
      if (nombre)         { set.push('Nombre = ?');         vals.push(nombre); }
      if (descripcion !== undefined) { set.push('Descripcion = ?');   vals.push(descripcion); }
      if (rutEncargado)   { set.push('RutEncargado = ?');   vals.push(rutEncargado); }
      if (fecha)          { set.push('Fecha = ?');          vals.push(fecha); }
      if (tipo !== undefined)         { set.push('Tipo = ?');           vals.push(tipo); }
      if (publico !== undefined)      { set.push('Publico = ?');        vals.push(publico); }
      if (cantidadHoras !== undefined) { set.push('CantidadHoras = ?'); vals.push(cantidadHoras); }
      if (estado !== undefined)       { set.push('Estado = ?');         vals.push(estado); }

      if (!set.length)
        return res.status(400).json({ error: 'Nada que actualizar' });

      vals.push(id);

      const [result] = await db.execute(
        `UPDATE EVENTO SET ${set.join(', ')} WHERE ID_Evento = ?`,
        vals
      );

      if (result.affectedRows === 0)
        return res.status(404).json({ error: 'Evento no encontrado' });

      res.json({ ok: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al actualizar evento' });
    }
  });

  return router;
};
