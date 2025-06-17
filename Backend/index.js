const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');


const conexiondb = require('./horas-sello/Conexion/conexiondb.js');
const loginAdm = require('./horas-sello/administrativos/login-adm.js');
const consultarHoras = require('./horas-sello/Alumno/consultarHoras.js');
const listarAlumnos = require('./horas-sello/Alumno/listar.js');

const app = express();

const PORT = 3000;
const db = conexiondb(app, cors, mysql, express);

loginAdm(app, db);
consultarHoras(app, db);
listarAlumnos(app, db);

app.listen(PORT, () => {
  console.log(`Servidor backend ejecutándose en http://localhost:${PORT}`);
});