#------------------- Tablas -------------------------

CREATE TABLE Alumno(
	RutAlumno CHAR(9) PRIMARY KEY,
    Nombre VARCHAR(30) NOT NULL,
    Apellido VARCHAR(30) NOT NULL, 
    Facultad VARCHAR(50) NOT NULL, 
    Carrera VARCHAR(50) NOT NULL,
    Generacion YEAR NOT NULL
);

CREATE TABLE Administrativos(
	RutAdministrativos CHAR(9) PRIMARY KEY,
    Contraseña VARCHAR(100),
    Nombre VARCHAR(30) NOT NULL,
    Apellido VARCHAR(30) NOT NULL,
    Cargo VARCHAR(20) NOT NULL,
    Correo VARCHAR(50) NOT NULL
);

CREATE TABLE Encargado(
	RutEncargado CHAR(9) PRIMARY KEY,
	Nombre VARCHAR(30) NOT NULL,
    Apellido VARCHAR(30) NOT NULL,
    Correo VARCHAR(50) NOT NULL,
    Telefono VARCHAR(15) NOT NULL #15 caracteres en caso de que el numero sea internacional
);

CREATE TABLE EVENTO (
	ID_Evento INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(20) NOT NULL,
    Descripcion VARCHAR(100),
    RutEncargado CHAR(9) NOT NULL,
    Fecha DATETIME NOT NULL,
    Tipo BOOLEAN NOT NULL,  #TRUE = Abierto // FALSE = Cerrado
    Publico BOOLEAN NOT NULL, #TRUE = Abierto a toda la universidad // FALSE = Cerrado a solo la carrera
	CantidadHoras INT NOT NULL, #Cantidad de horas que otorga el evento
    Estado BOOLEAN NOT NULL, #TRUE = Aprobado // FALSE = Rechazado
    FOREIGN KEY (RutEncargado) REFERENCES Encargado(RutEncargado)
);

CREATE TABLE RegistroHoras(
	ID_HoraSello INT AUTO_INCREMENT PRIMARY KEY,
    ID_Evento INT NOT NULL,
    RutAlumno CHAR(9) NOT NULL,
    RutAdministrativos CHAR(9) NOT NULL,
    FechaInicio DATETIME,
    FechaTermino DATETIME,
    CantidadHoras INT, # Cantidad de horas que fueron otorgadas al alumno por asistir al evento
    FOREIGN KEY (ID_Evento) REFERENCES Evento(ID_Evento),
    FOREIGN KEY (RutAlumno) REFERENCES Alumno(RutAlumno),
    FOREIGN KEY (RutAdministrativos) REFERENCES Administrativos(RutAdministrativos)
);

#------------------------ Vistas ----------------------

CREATE VIEW ConsultaHoras AS 
SELECT 
	rh.FechaInicio,
    rh.FechaTermino,
    rh.CantidadHoras AS HorasRegistradas,
    e.Nombre AS NombreEvento,
    e.CantidadHoras AS HorasEvento,
    adm.Nombre AS NombreAdm,
    adm.Apellido AS ApellidoAdm
FROM RegistroHoras rh
JOIN Evento e ON rh.ID_Evento
JOIN Administrativos adm ON rh.RutAdministrativos;


#----------------------- Datos de prueba -------------------------

INSERT INTO Alumno (RutAlumno, Nombre, Apellido, Facultad, Carrera, Generacion) VALUES
('111111111', 'Carlos', 'Ramírez', 'Ingeniería', 'Informática', 2022),
('222222222', 'María', 'Pérez', 'Ciencias Sociales', 'Psicología', 2021),
('333333333', 'Ana', 'González', 'Salud', 'Enfermería', 2023);

INSERT INTO Administrativos (RutAdministrativos, Contraseña, Nombre, Apellido, Cargo, Correo) VALUES
('444444444', 'hashedpwd1', 'Luis', 'Soto', 'Jefe Unidad', 'luis.soto@unach.cl'),
('555555555', 'hashedpwd2', 'Paula', 'Reyes', 'Asistente', 'paula.reyes@unach.cl'),
('666666666', 'hashedpwd3', 'Jorge', 'Mendoza', 'Coordinador', 'jorge.mendoza@unach.cl');

INSERT INTO Encargado (RutEncargado, Nombre, Apellido, Correo, Telefono) VALUES
('777777777', 'Claudia', 'Morales', 'claudia.morales@unach.cl', '+56911111111'),
('888888888', 'Ricardo', 'Navarro', 'ricardo.navarro@unach.cl', '+56922222222'),
('999999999', 'Fernanda', 'Silva', 'fernanda.silva@unach.cl', '+56933333333');

INSERT INTO Evento (Nombre, Descripcion, RutEncargado, Fecha, Tipo, Publico, CantidadHoras, Estado) VALUES
('Limpieza Río', 'Actividad de limpieza en río local.', '777777777', '2025-06-01 10:00:00', TRUE, TRUE, 4, TRUE),
('Charla Ambiental', 'Charla sobre cambio climático.', '888888888', '2025-06-02 15:00:00', FALSE, TRUE, 2, TRUE),
('Taller Reciclaje', 'Taller práctico de reciclaje.', '999999999', '2025-06-03 09:30:00', TRUE, FALSE, 3, FALSE);

INSERT INTO RegistroHoras (ID_Evento, RutAlumno, RutAdministrativos, FechaInicio, FechaTermino, CantidadHoras) VALUES
(1, '111111111', '444444444', '2025-06-01 10:00:00', '2025-06-01 14:00:00', 4),
(2, '222222222', '555555555', '2025-06-02 15:00:00', '2025-06-02 17:00:00', 2),
(3, '333333333', '666666666', '2025-06-03 09:30:00', '2025-06-03 12:30:00', 3);