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

  /* ---------- POST /api/alumnos/crear ---------- */
  router.post('/crear', async (req, res) => {
    // if (!verifyToken(req, res)) return;   // ← Descomenta si sólo los admins pueden crear

    const {
      rut,
      nombre,
      apellido,
      facultad,
      carrera,
      generacion
    } = req.body || {};

    // 1) Validaciones mínimas
    if (!rut || !nombre || !apellido || !facultad || !carrera || !generacion) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    try {
      // 2) ¿Existe el rut?
      const [dup] = await db.execute(
        'SELECT 1 FROM Alumno WHERE RutAlumno = ? LIMIT 1',
        [rut]
      );
      if (dup.length) {
        return res.status(409).json({ error: 'El RUT ya está registrado' });
      }

      // 3) Inserción
      await db.execute(
        `INSERT INTO Alumno
         (RutAlumno, Nombre, Apellido, Facultad, Carrera, Generacion)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [rut, nombre, apellido, facultad, carrera, generacion]
      );

      res.status(201).json({ ok: true });
    } catch (err) {
      console.error('Error al crear alumno', err);
      res.status(500).json({ error: 'Error al crear alumno' });
    }
  });

  return router;
};