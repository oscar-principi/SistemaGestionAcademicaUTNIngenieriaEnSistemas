/* ============================================================
   BASE DE DATOS
============================================================ */
USE master;
GO

IF EXISTS (SELECT * FROM sys.databases WHERE name = 'SeguimientoAcademicoUTN')
    DROP DATABASE SeguimientoAcademicoUTN;
GO

CREATE DATABASE SeguimientoAcademicoUTN;
GO

USE SeguimientoAcademicoUTN;
GO

/* ============================================================
   TABLAS PRINCIPALES
============================================================ */

CREATE TABLE Carreras (
    Id INT IDENTITY PRIMARY KEY,
    Nombre NVARCHAR(150) NOT NULL
);

CREATE TABLE PlanesEstudio (
    Id INT IDENTITY PRIMARY KEY,
    AnioPlan INT NOT NULL,
    CarreraId INT NOT NULL,
    CONSTRAINT FK_Plan_Carrera FOREIGN KEY (CarreraId) REFERENCES Carreras(Id)
);

CREATE TABLE Usuarios (
    Id INT IDENTITY PRIMARY KEY,
    Nombre NVARCHAR(150) NOT NULL,
    Email NVARCHAR(150) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(500) NOT NULL,
    FechaRegistro DATETIME2 NOT NULL DEFAULT SYSDATETIME()
);

CREATE TABLE Materias (
    Id INT IDENTITY PRIMARY KEY,
    Codigo INT NOT NULL,
    Nombre NVARCHAR(200) NOT NULL,
    Anio INT NOT NULL CHECK (Anio BETWEEN 1 AND 5),
    Cuatrimestre NVARCHAR(20) NOT NULL,
    PlanId INT NOT NULL,
    CONSTRAINT FK_Materia_Plan FOREIGN KEY (PlanId) REFERENCES PlanesEstudio(Id)
);

CREATE UNIQUE INDEX IX_Materia_Codigo_Plan ON Materias (Codigo, PlanId);

CREATE TABLE Correlatividades (
    Id INT IDENTITY PRIMARY KEY,
    MateriaDestinoId INT NOT NULL,
    MateriaRequeridaId INT NOT NULL,
    Tipo NVARCHAR(20) NOT NULL CHECK (Tipo IN ('ParaCursar','ParaFinal')),
    Condicion NVARCHAR(20) NOT NULL CHECK (Condicion IN ('Regular','Aprobada')),
    CONSTRAINT FK_Correlativa_Destino FOREIGN KEY (MateriaDestinoId) REFERENCES Materias(Id),
    CONSTRAINT FK_Correlativa_Requerida FOREIGN KEY (MateriaRequeridaId) REFERENCES Materias(Id),
    CONSTRAINT UQ_Correlatividad UNIQUE (MateriaDestinoId, MateriaRequeridaId, Tipo)
);

CREATE TABLE EstadosMateria (
    Id INT IDENTITY PRIMARY KEY,
    UsuarioId INT NOT NULL,
    MateriaId INT NOT NULL,
    Estado NVARCHAR(20) NOT NULL CHECK (Estado IN ('NoCursada','Regular','Aprobada')),
    NotaFinal DECIMAL(4,2) NULL,
    FechaCambio DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    CONSTRAINT FK_Estado_Usuario FOREIGN KEY (UsuarioId) REFERENCES Usuarios(Id),
    CONSTRAINT FK_Estado_Materia FOREIGN KEY (MateriaId) REFERENCES Materias(Id),
    CONSTRAINT UQ_Estado UNIQUE (UsuarioId, MateriaId),
    CONSTRAINT CK_Nota_Aprobada CHECK (
        (Estado = 'Aprobada' AND NotaFinal IS NOT NULL) OR (Estado <> 'Aprobada')
    )
);

/* ============================================================
   CARGA INICIAL - PLAN 2023
============================================================ */

INSERT INTO Carreras (Nombre) VALUES ('Ingeniería en Sistemas');
INSERT INTO PlanesEstudio (AnioPlan, CarreraId) VALUES (2023, 1);

/* ============================================================
   MATERIAS (Plan 2023)
============================================================ */

INSERT INTO Materias (Codigo, Nombre, Anio, Cuatrimestre, PlanId) VALUES
(1,'Análisis Matemático I',1,'Anual',1),
(2,'Álgebra y Geometría Analítica',1,'Anual',1),
(3,'Física I',1,'Anual',1),
(4,'Inglés I',1,'Anual',1),
(5,'Lógica y Estructuras Discretas',1,'Anual',1),
(6,'Algoritmos y Estructuras de Datos',1,'Anual',1),
(7,'Arquitectura de Computadoras',1,'Anual',1),
(8,'Sistemas y Procesos de Negocio',1,'Anual',1),
(9,'Análisis Matemático II',2,'Anual',1),
(10,'Física II',2,'Anual',1),
(11,'Ingeniería y Sociedad',2,'Anual',1),
(12,'Inglés II',2,'Anual',1),
(13,'Sintaxis y Semántica de los Lenguajes',2,'Anual',1),
(14,'Paradigmas de Programación',2,'Anual',1),
(15,'Sistemas Operativos',2,'Anual',1),
(16,'Análisis de Sistemas de Información',2,'Anual',1),
(17,'Probabilidad y Estadística',3,'Anual',1),
(18,'Economía',3,'Anual',1),
(19,'Bases de Datos',3,'Anual',1),
(20,'Desarrollo de Software',3,'Anual',1),
(21,'Comunicación de Datos',3,'Anual',1),
(22,'Análisis Numérico',3,'Anual',1),
(23,'Diseño de Sistemas de Información',3,'Anual',1),
(24,'Legislación',4,'Anual',1),
(25,'Ingeniería y Calidad de Software',4,'Anual',1),
(26,'Redes de Datos',4,'Anual',1),
(27,'Investigación Operativa',4,'Anual',1),
(28,'Simulación',4,'Anual',1),
(29,'Tecnologías para la Automatización',4,'Anual',1),
(30,'Administración de Sistemas de Información',4,'Anual',1),
(31,'Inteligencia Artificial',5,'Anual',1),
(32,'Ciencia de Datos',5,'Anual',1),
(33,'Sistemas de Gestión',5,'Anual',1),
(34,'Gestión Gerencial',5,'Anual',1),
(35,'Seguridad en los Sistemas de Información',5,'Anual',1),
(36,'Proyecto Final',5,'Anual',1);

/* ============================================================
   CORRELATIVIDADES (Normalizadas)
============================================================ */

-- 2do año
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaCursar','Regular' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 9 AND mReq.Codigo IN (1,2);
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaCursar','Regular' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 10 AND mReq.Codigo IN (1,3);
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaCursar','Regular' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 12 AND mReq.Codigo = 4;
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaCursar','Regular' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 13 AND mReq.Codigo IN (5,6);
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaCursar','Regular' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 14 AND mReq.Codigo IN (5,6);
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaCursar','Regular' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 15 AND mReq.Codigo = 7;
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaCursar','Regular' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 16 AND mReq.Codigo IN (6,8);

-- 3er año
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaCursar','Regular' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 17 AND mReq.Codigo IN (1,2);
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaFinal','Aprobada' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 18 AND mReq.Codigo IN (1,2);
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaCursar','Regular' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 19 AND mReq.Codigo IN (13,16);
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaFinal','Aprobada' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 19 AND mReq.Codigo IN (5,6);
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaCursar','Regular' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 20 AND mReq.Codigo IN (14,16);
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaFinal','Aprobada' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 20 AND mReq.Codigo IN (5,6);
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaCursar','Regular' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 21 AND mReq.Codigo IN (3,7);
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaCursar','Regular' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 22 AND mReq.Codigo = 9;
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaFinal','Aprobada' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 22 AND mReq.Codigo IN (1,2);
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaCursar','Regular' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 23 AND mReq.Codigo IN (14,16);
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaFinal','Aprobada' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 23 AND mReq.Codigo IN (4,6,8);

-- 4to año
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaCursar','Regular' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 24 AND mReq.Codigo = 11;
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaCursar','Regular' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 25 AND mReq.Codigo IN (19,20,23);
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaFinal','Aprobada' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 25 AND mReq.Codigo IN (13,14);
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaCursar','Regular' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 26 AND mReq.Codigo IN (15,21);
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaCursar','Regular' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 27 AND mReq.Codigo IN (17,22);
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaCursar','Regular' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 28 AND mReq.Codigo = 17;
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaFinal','Aprobada' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 28 AND mReq.Codigo = 9;
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaCursar','Regular' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 29 AND mReq.Codigo IN (10,22);
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaFinal','Aprobada' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 29 AND mReq.Codigo = 9;
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaCursar','Regular' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 30 AND mReq.Codigo IN (18,23);
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaFinal','Aprobada' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 30 AND mReq.Codigo = 16;

-- 5to año
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaCursar','Regular' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 31 AND mReq.Codigo = 28;
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaFinal','Aprobada' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 31 AND mReq.Codigo IN (17,22);
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaCursar','Regular' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 32 AND mReq.Codigo = 28;
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaFinal','Aprobada' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 32 AND mReq.Codigo IN (17,19);
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaCursar','Regular' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 33 AND mReq.Codigo IN (18,27);
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaFinal','Aprobada' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 33 AND mReq.Codigo = 23;
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaCursar','Regular' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 34 AND mReq.Codigo IN (24,30);
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaFinal','Aprobada' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 34 AND mReq.Codigo = 18;
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaCursar','Regular' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 35 AND mReq.Codigo IN (26,30);
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaFinal','Aprobada' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 35 AND mReq.Codigo IN (20,21);

-- Proyecto Final
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaCursar','Regular' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 36 AND mReq.Codigo IN (25,26,30);
INSERT INTO Correlatividades SELECT mDest.Id, mReq.Id, 'ParaFinal','Aprobada' FROM Materias mDest, Materias mReq WHERE mDest.Codigo = 36 AND mReq.Codigo IN (12,20,23);