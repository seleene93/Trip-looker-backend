
CREATE DATABASE IF NOT EXISTS trip_looker;

USE trip_looker;

CREATE TABLE usuarios (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          nombre VARCHAR(50) NOT NULL,
          apellidos VARCHAR(100) NOT NULL,
          email VARCHAR(100) NOT NULL UNIQUE,
          ciudad VARCHAR(50) NOT NULL,
          avatar VARCHAR(50),
          password VARCHAR(100) NOT NULL,
          fecha_nac DATE NOT NULL
          );
	    

CREATE TABLE posts (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          titulo VARCHAR(50) NOT NULL,
          categoria ENUM('ocio', 'cultural', 'expedicion', 'romantico', 'otro') DEFAULT 'otro',
          lugar VARCHAR(80) NOT NULL,
          entradilla VARCHAR(500),
          texto VARCHAR(5000),
          id_usuario INT UNSIGNED NOT NULL,
          FOREIGN KEY (id_usuario) REFERENCES usuarios (id) 
          ON DELETE CASCADE
          ON UPDATE CASCADE
          );
    
       
CREATE TABLE img_post (
		  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          nombre VARCHAR(100) NOT NULL,
          id_post INT UNSIGNED NOT NULL,
          FOREIGN KEY (id_post) REFERENCES posts (id) 
          ON DELETE CASCADE 
          ON UPDATE CASCADE
          );
    
        
CREATE TABLE votos (
		  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          voto_positivo INT UNSIGNED,
          voto_negativo INT UNSIGNED,
          id_usuario INT UNSIGNED NOT NULL,
          id_post INT UNSIGNED NOT NULL,
          FOREIGN KEY (id_usuario) REFERENCES usuarios (id)
          ON DELETE CASCADE
          ON UPDATE CASCADE,
          FOREIGN KEY (id_post) REFERENCES posts (id)
          ON DELETE CASCADE
          ON UPDATE CASCADE
          );


CREATE TABLE comentarios (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          comentario VARCHAR(500),
          id_post INT UNSIGNED NOT NULL,
          id_usuario INT UNSIGNED NOT NULL,
          FOREIGN KEY (id_post) REFERENCES posts (id) 
          ON DELETE CASCADE 
          ON UPDATE CASCADE,
          FOREIGN KEY (id_usuario) REFERENCES usuarios (id) 
          ON DELETE CASCADE 
          ON UPDATE CASCADE
          );

  
