// horas-sello/Encargados/admin-encargado.js
const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  // POST /api/encargados/crear
  router.post('/crear', async (req, res) => {
    const {
      rut: rut,
      Nombre: nombre,
      Apellido: apellido,
      Correo: correo,
      Telefono: telefono
    } = req.body || {};

    if (!rut?.trim() || !nombre?.trim() || !apellido?.trim()
        || !correo?.trim() || !telefono?.trim()) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    try {
      const sql = `
        INSERT INTO Encargado (RutEncargado, Nombre, Apellido, Correo, Telefono)
        VALUES (?, ?, ?, ?, ?)
      `;

      const [result] = await db.execute(sql, [
        rut.trim().toUpperCase(),
        nombre.trim(),
        apellido.trim(),
        correo.trim().toLowerCase(),
        telefono.trim()
      ]);

      res.status(201).json({ id: result.insertId });
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'El RUT ya está registrado' });
      }
      console.error(err);
      res.status(500).json({ error: 'Error al crear encargado' });
    }
  });

  return router;
};
