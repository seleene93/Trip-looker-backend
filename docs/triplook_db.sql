
CREATE DATABASE IF NOT EXISTS trip_looker;

USE trip_looker;

CREATE TABLE usuarios (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(50) NOT NULL,
        apellidos VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        tel INT UNSIGNED,
        dni CHAR(9) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        fecha_nac DATE NOT NULL
	    );
  
CREATE TABLE direcciones_usuarios (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        direccion VARCHAR(100),
        ciudad VARCHAR(100),
        cp MEDIUMINT,
        pais VARCHAR(50),
        id_usuario INT UNSIGNED NOT NULL,
        FOREIGN KEY (id_usuario) REFERENCES usuarios (id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
        );
        
CREATE TABLE recomendaciones (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        titulo VARCHAR(50) NOT NULL,
        categoria ENUM('ocio', 'cultural', 'expedición', 'romantico', 'otro') DEFAULT 'otro',
        lugar VARCHAR(80) NOT NULL,
        entradilla VARCHAR(500),
        texto VARCHAR(5000),
        id_usuario INT UNSIGNED NOT NULL,
		FOREIGN KEY (id_usuario) REFERENCES usuarios (id) 
		ON DELETE CASCADE
		ON UPDATE CASCADE
       );
       
CREATE TABLE img_recomendacion (
		id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        img VARCHAR(100) NOT NULL,
        id_recomendacion INT UNSIGNED NOT NULL,
        FOREIGN KEY (id_recomendacion) REFERENCES recomendaciones (id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
        );   
        
CREATE TABLE votos (
		id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        voto_positivo INT UNSIGNED,
        voto_negativo INT UNSIGNED,
        puntuacion_total INT,
        id_usuario INT UNSIGNED NOT NULL,
        id_recomendacion INT UNSIGNED NOT NULL,
        FOREIGN KEY (id_usuario) REFERENCES usuarios (id)
        ON DELETE CASCADE
		ON UPDATE CASCADE,
        FOREIGN KEY (id_recomendacion) REFERENCES recomendaciones (id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);