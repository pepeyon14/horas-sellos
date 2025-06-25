const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  // ---------- DELETE /api/eventos/eliminar/:id ----------
  router.delete('/eliminar/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const [result] = await db.execute(
        'DELETE FROM EVENTO WHERE ID_Evento = ?',
        [id]
      );

      if (result.affectedRows === 0)
        return res.status(404).json({ error: 'Evento no encontrado' });

      res.json({ ok: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al eliminar evento' });
    }
  });

  return router;
};