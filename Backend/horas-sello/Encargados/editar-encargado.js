// horas-sello/Encargados/encargado.routes.js
const express = require('express');
const jwt = require('jsonwebtoken');

module.exports = (db) => {
  const router = express.Router();

  /* ---------- Middleware opcional: solo administradores ---------- */
  function soloAdministradores(req, res, next) {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: 'Token requerido' });

    const token = header.split(' ')[1];
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      if (payload.rol !== 'administrador')
        return res.status(403).json({ error: 'Solo administradores' });

      req.user = payload;
      next();
    } catch {
      return res.status(401).json({ error: 'Token inválido' });
    }
  }

  /* ---------- POST /api/encargados/crear ---------- */
  router.post('/crear', /* soloAdministradores, */ async (req, res) => {
    const { rut, nombre, apellido, correo, telefono } = req.body || {};

    if (!rut || !nombre || !apellido || !correo || !telefono)
      return res.status(400).json({ error: 'Faltan campos requeridos' });

    try {
      const [dup] = await db.execute(
        'SELECT 1 FROM Encargado WHERE RutEncargado = ? LIMIT 1',
        [rut]
      );
      if (dup.length)
        return res.status(409).json({ error: 'El RUT ya está registrado' });

      await db.execute(
        `INSERT INTO Encargado
         (RutEncargado, Nombre, Apellido, Correo, Telefono)
         VALUES (?, ?, ?, ?, ?)`,
        [rut, nombre, apellido, correo, telefono]
      );

      res.status(201).json({ ok: true });
    } catch (err) {
      console.error('Error al crear encargado', err);
      res.status(500).json({ error: 'Error al crear encargado' });
    }
  });

  /* ---------- PUT /api/encargados/editar/:rut ---------- */
  router.put('/editar/:rut', /* soloAdministradores, */ async (req, res) => {
    const { rut } = req.params;
    const { nombre, apellido, correo, telefono } = req.body || {};

    const set  = [];
    const vals = [];

    if (nombre)   { set.push('Nombre = ?');    vals.push(nombre);   }
    if (apellido) { set.push('Apellido = ?');  vals.push(apellido); }
    if (correo)   { set.push('Correo = ?');    vals.push(correo);   }
    if (telefono) { set.push('Telefono = ?');  vals.push(telefono); }

    if (!set.length)
      return res.status(400).json({ error: 'Nada que actualizar' });

    vals.push(rut); // WHERE RutEncargado = ?

    try {
      const [result] = await db.execute(
        `UPDATE Encargado SET ${set.join(', ')} WHERE RutEncargado = ?`,
        vals
      );

      if (result.affectedRows === 0)
        return res.status(404).json({ error: 'Encargado no encontrado' });

      res.json({ ok: true });
    } catch (err) {
      console.error('Error al actualizar encargado', err);
      res.status(500).json({ error: 'Error al actualizar encargado' });
    }
  });

  /* ---------- GET /api/encargados/listar ---------- */
  router.get('/listar', async (_req, res) => {
    try {
      const [rows] = await db.execute(
        `SELECT
           RutEncargado AS rut,
           Nombre       AS nombre,
           Apellido     AS apellido,
           Correo       AS correo,
           Telefono     AS telefono
         FROM Encargado`
      );
      res.json(rows);
    } catch (err) {
      console.error('Error al listar encargados', err);
      res.status(500).json({ error: 'Error al obtener encargados' });
    }
  });

  /* ---------- GET /api/encargados/:rut ---------- */
  router.get('/:rut', async (req, res) => {
    const { rut } = req.params;
    try {
      const [rows] = await db.execute(
        `SELECT
           RutEncargado AS rut,
           Nombre       AS nombre,
           Apellido     AS apellido,
           Correo       AS correo,
           Telefono     AS telefono
         FROM Encargado
         WHERE RutEncargado = ?`,
        [rut]
      );
      if (!rows.length)
        return res.status(404).json({ error: 'Encargado no encontrado' });

      res.json(rows[0]);
    } catch (err) {
      console.error('Error al obtener encargado', err);
      res.status(500).json({ error: 'Error al obtener encargado' });
    }
  });

  return router;
};