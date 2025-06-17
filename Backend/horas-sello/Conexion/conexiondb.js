function conexiondb(app, cors, mysql, express) {
  app.use(cors());
  app.use(express.json());

  const db = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '123456789',
    database: 'horas_sello'
  });

  db.connect((err) => {
    if (err) {
      console.error('Error de conexión a la base de datos:', err);
      return;
    }
    console.log('Conectado a la base de datos MySQL');
  });
  return db;
}

module.exports = conexiondb;