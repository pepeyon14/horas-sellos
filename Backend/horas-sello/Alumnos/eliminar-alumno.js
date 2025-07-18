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

  /* ---------- DELETE /api/alumnos/eliminar/:rut ---------- */
  router.delete('/eliminar/:rut', async (req, res) => {
    // if (!verifyToken(req, res)) return;

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