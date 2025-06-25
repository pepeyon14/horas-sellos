const express = require('express');
const jwt     = require('jsonwebtoken');

module.exports = (db) => {
  const router = express.Router();
  /* ---------- DELETE /api/alumnos/eliminar/:rut ---------- */
  router.delete('/eliminar/:rut', async (req, res) => {
    const { rut } = req.params;

    try {
      const [result] = await db.execute(
        'DELETE FROM Alumno WHERE RutAlumno = ?',
        [rut]
      );

      if (result.affectedRows === 0)
        return res.status(404).json({ error: 'Alumno no encontrado' });

      res.json({ ok: true });
    } catch (err) {
      console.error('Error al eliminar alumno', err);
      res.status(500).json({ error: 'Error al eliminar alumno' });
    }
  });

  return router;
};