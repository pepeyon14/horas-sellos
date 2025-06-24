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

  // ---------- PUT /api/encargados/editar/:rut ----------
  router.put('/editar/:rut', async (req, res) => {
    // if (!verifyToken(req, res)) return;

    const { rut } = req.params;
    const { nombre, apellido, correo, telefono } = req.body || {};

    const set = [];
    const vals = [];

    try {
      if (nombre)   { set.push('Nombre = ?');    vals.push(nombre); }
      if (apellido) { set.push('Apellido = ?');  vals.push(apellido); }
      if (correo)   { set.push('Correo = ?');    vals.push(correo); }
      if (telefono) { set.push('Telefono = ?');  vals.push(telefono); }

      if (!set.length)
        return res.status(400).json({ error: 'Nada que actualizar' });

      vals.push(rut); // para el WHERE

      const [result] = await db.execute(
        `UPDATE Encargado SET ${set.join(', ')} WHERE RutEncargado = ?`,
        vals
      );

      if (result.affectedRows === 0)
        return res.status(404).json({ error: 'Encargado no encontrado' });

      res.json({ ok: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al actualizar encargado' });
    }
  });

  return router;
};