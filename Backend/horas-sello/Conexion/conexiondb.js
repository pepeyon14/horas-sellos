require('dotenv').config(); // Cargar variables de entorno desde .env
const mysql = require('mysql2');

// Definir la función de conexión
const conexiondb = () =>
  mysql
    .createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
    })
    .promise();

module.exports = conexiondb;