const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  /* ---------- PUT /api/registros/editar/:id ---------- */
  router.put('/editar/:id', async (req, res) => {
    const { id } = req.params;

    const {
      ID_Evento,
      RutAlumno,
      RutAdministrativos,
      FechaInicio,
      FechaTermino,
      CantidadHoras
    } = req.body || {};

    const set  = [];
    const vals = [];

    try {
      if (ID_Evento)            { set.push('ID_Evento = ?');          vals.push(ID_Evento); }
      if (RutAlumno)            { set.push('RutAlumno = ?');          vals.push(RutAlumno); }
      if (RutAdministrativos)   { set.push('RutAdministrativos = ?'); vals.push(RutAdministrativos); }
      if (FechaInicio)          { set.push('FechaInicio = ?');        vals.push(FechaInicio); }
      if (FechaTermino)         { set.push('FechaTermino = ?');       vals.push(FechaTermino); }
      if (CantidadHoras !== undefined) { set.push('CantidadHoras = ?'); vals.push(CantidadHoras); }

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

  /* ---------- GET /api/registros/obtener/:id ---------- */
  router.get('/obtener/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const [rows] = await db.execute(
        'SELECT * FROM RegistroHoras WHERE ID_HoraSello = ?',
        [id]
      );

      if (!rows.length)
        return res.status(404).json({ error: 'Registro no encontrado' });

      res.json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener registro' });
    }
  });

  return router;
};