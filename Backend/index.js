const express = require('express');
const cors    = require('cors');

const db = require('./horas-sello/Conexion/conexiondb')();
// Importar las rutas de los administrativos
const loginAdm = require('./horas-sello/Administrativos/login-adm')(db);
const crearAdm = require('./horas-sello/Administrativos/Crear-adm')(db);
const listarAdm = require('./horas-sello/Administrativos/listar-adm')(db);
const editarAdm = require('./horas-sello/Administrativos/editar-adm')(db);
const eliminarAdm = require('./horas-sello/Administrativos/eliminar-adm')(db);

// Importar las rutas de los encargados 
const crearencargado = require('./horas-sello/Encargados/crear-encargado')(db);
const listarencargado = require('./horas-sello/Encargados/listar-encargado')(db);
const editarencargado = require('./horas-sello/Encargados/editar-encargado')(db);
const eliminarencargado = require('./horas-sello/Encargados/eliminar-encargado')(db);

// Importar las rutas de los eventos
const crearEvento = require('./horas-sello/Eventos/crear-evento')(db);
const listarEvento = require('./horas-sello/Eventos/listar-evento')(db);
const editarEvento = require('./horas-sello/Eventos/editar-evento')(db);
const eliminarEvento = require('./horas-sello/Eventos/eliminar-evento')(db);

// Importar las rutas de los registros de horas
const crearRegistro = require('./horas-sello/Registros/crear-horas')(db);
const listarRegistro = require('./horas-sello/Registros/listar-horas')(db);
const editarRegistro = require('./horas-sello/Registros/editar-horas')(db);
const eliminarRegistro = require('./horas-sello/Registros/eliminar-horas')(db);

// Importar las rutas de los alumnos
const consultarHoras = require('./horas-sello/Alumnos/consultarHoras')(db);
const crearAlumnos = require('./horas-sello/Alumnos/crear-alumnos')(db);
const listarAlumnos = require('./horas-sello/Alumnos/listar-alumnos')(db);
const editarAlumnos = require('./horas-sello/Alumnos/editar-alumnos')(db);
const eliminarAlumnos = require('./horas-sello/Alumnos/eliminar-alumnos')(db);

const app = express();
app.use(cors());
app.use(express.json());

// Usar las rutas de los administrativos
app.use('/api/administrativos', loginAdm); // POST  /api/administrativos/login
app.use('/api/administrativos', crearAdm); // POST  /api/administrativos/crear
app.use('/api/administrativos', listarAdm); // GET   /api/administrativos/listar
app.use('/api/administrativos', editarAdm); // PUT   /api/administrativos/editar
app.use('/api/administrativos', eliminarAdm); // DELETE /api/administrativos/eliminar

// Usar las rutas de los encargados
app.use('/api/encargados', crearencargado); // POST  /api/encargados/crear
app.use('/api/encargados', listarencargado); // GET   /api/encargados/listar
app.use('/api/encargados', editarencargado); // PUT   /api/encargados/editar
app.use('/api/encargados', eliminarencargado); // DELETE /api/encargados/eliminar

// Usar las rutas de los eventos
app.use('/api/eventos', crearEvento); // POST  /api/eventos/crear
app.use('/api/eventos', listarEvento); // GET   /api/eventos/listar
app.use('/api/eventos', editarEvento); // PUT   /api/eventos/editar
app.use('/api/eventos', eliminarEvento); // DELETE /api/eventos/eliminar

// Usar las rutas de los registros de horas
app.use('/api/registros', crearRegistro); // POST  /api/registros/crear
app.use('/api/registros', listarRegistro); // GET   /api/registros/listar
app.use('/api/registros', editarRegistro); // PUT   /api/registros/editar
app.use('/api/registros', eliminarRegistro); // DELETE /api/registros/eliminar

// Usar las rutas de los alumnos
app.use('/api/consultar-horas', consultarHoras); // GET /api/consultar-horas/
app.use('/api/alumnos', crearAlumnos); // POST  /api/alumnos/crear
app.use('/api/alumnos', listarAlumnos); // GET   /api/alumnos/list
app.use('/api/alumnos', editarAlumnos); // PUT   /api/alumnos/editar
app.use('/api/alumnos', eliminarAlumnos); // DELETE /api/alumnos/eliminar

app.listen(3000, () => console.log('Servidor en :3000'));