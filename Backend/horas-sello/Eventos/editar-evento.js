// horas-sello/Eventos/editar-evento.js
const express = require('express');
const jwt = require('jsonwebtoken');

module.exports = (db) => {
  const router = express.Router();

  // ---------- GET /api/eventos/:id ----------
  router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const [rows] = await db.execute(
        'SELECT * FROM EVENTO WHERE ID_Evento = ?',
        [id]
      );

      if (!rows.length)
        return res.status(404).json({ error: 'Evento no encontrado' });

      res.json(rows[0]); // ← enviamos el registro
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener evento' });
    }
  });

  // ---------- PUT /api/eventos/editar/:id ----------
  router.put('/editar/:id', async (req, res) => {
    // if (!verifyToken(req, res)) return;

    const { id } = req.params;
    const {
      Nombre,
      Descripcion,
      RutEncargado,
      Fecha,
      Tipo,
      Publico,
      CantidadHoras,
      Estado
    } = req.body || {};

    const set  = [];
    const vals = [];

    try {
      if (Nombre)                    { set.push('Nombre = ?');         vals.push(Nombre); }
      if (Descripcion !== undefined) { set.push('Descripcion = ?');    vals.push(Descripcion); }
      if (RutEncargado)              { set.push('RutEncargado = ?');   vals.push(RutEncargado); }
      if (Fecha)                     { set.push('Fecha = ?');          vals.push(Fecha); }
      if (Tipo !== undefined)        { set.push('Tipo = ?');           vals.push(Tipo); }
      if (Publico !== undefined)     { set.push('Publico = ?');        vals.push(Publico); }
      if (CantidadHoras !== undefined){ set.push('CantidadHoras = ?'); vals.push(CantidadHoras); }
      if (Estado !== undefined)      { set.push('Estado = ?');         vals.push(Estado); }

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
