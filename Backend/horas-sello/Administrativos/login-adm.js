const express = require('express');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');

module.exports = (db) => {
  const router = express.Router();

  // POST /api/administrativos/login
  router.post('/login', async (req, res) => {
    const { rut, password } = req.body;
    if (!rut || !password)
      return res.status(400).json({ error: 'Faltan credenciales' });

    try {
      const [rows] = await db.execute(
        'SELECT Contraseña FROM Administrativos WHERE RutAdministrativos = ? LIMIT 1',
        [rut]
      );
      if (rows.length === 0) return res.status(401).json({ error: 'Credenciales inválidas' });

      const hash = rows[0].Contraseña;
      const ok   = await bcrypt.compare(password, hash);
      if (!ok) return res.status(401).json({ error: 'Credenciales inválidas' });

      const token = jwt.sign({ rut }, process.env.JWT_SECRET, { expiresIn: '2h' });
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error interno' });
    }
  });

  return router;
};

// Debe de recibir la informacion en este formato en el body de la peticion POST:
// {
//   "rut": "123456789",
//   "password": "miClave"
// }