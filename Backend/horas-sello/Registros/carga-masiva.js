// routes/registros.carga.js
const express = require('express');
const multer  = require('multer');
const XLSX    = require('xlsx');
const upload  = multer({ dest: 'tmp/' });

module.exports = (db) => {
  const router = express.Router();

  /* POST /api/registros/cargar-excel
   * Form-data fields:
   *   file              -> el .xlsx
   *   ID_Evento
   *   RutAdministrativos
   *   FechaInicio
   *   FechaTermino
   *   CantidadHoras
   */
  router.post('/cargar-excel', upload.single('file'), async (req, res) => {
    try {
      const {
        ID_Evento,
        RutAdministrativos,
        FechaInicio,
        FechaTermino,
        CantidadHoras
      } = req.body;

      if (!req.file)          return res.status(400).json({ error:'Sin archivo' });
      if (!ID_Evento || !RutAdministrativos || !FechaInicio || !FechaTermino || !CantidadHoras)
        return res.status(400).json({ error:'Faltan datos del formulario' });

      /* 1. Leer el Excel */
      const wb   = XLSX.readFile(req.file.path);
      const ws   = wb.Sheets[wb.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 }).flat().filter(Boolean);

      /* 2. Preparar inserciones */
      const valores = data.map(rutAlumno => [
        ID_Evento,
        rutAlumno,
        RutAdministrativos,
        FechaInicio,
        FechaTermino,
        CantidadHoras
      ]);

      /* 3. Ejecutar inserción masiva */
      await db.query(
        `INSERT INTO RegistroHoras
         (ID_Evento, RutAlumno, RutAdministrativos, FechaInicio, FechaTermino, CantidadHoras)
         VALUES ?`,
        [valores]
      );

      res.json({ ok:true, insertados: valores.length });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error:'Error al procesar archivo' });
    }
  });

  return router;
};