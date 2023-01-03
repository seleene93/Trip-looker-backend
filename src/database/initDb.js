const chalk = require("chalk");
const getPool = require("./getPool");
require("dotenv").config();

const initDb = async () => {
  try {
    const pool = getPool();

    await pool.query(`
    CREATE DATABASE IF NOT EXISTS trip_looker;
    `);

    await pool.query(`
    USE trip_looker;
    `);

    await pool.query("DROP TABLE IF EXISTS votos;");
    await pool.query("DROP TABLE IF EXISTS img_recomendacion;");
    await pool.query("DROP TABLE IF EXISTS recomendaciones;");
    await pool.query("DROP TABLE IF EXISTS direcciones_usuarios;");
    await pool.query("DROP TABLE IF EXISTS usuarios;");

    console.log(chalk.magentaBright("Creando tabla de usuarios..."));

    await pool.query(`
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
      `);

    console.log(
      chalk.magentaBright("Creando tabla de direcciones_usuarios...")
    );

    await pool.query(`
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
      `);

    console.log(chalk.magentaBright("Creando tabla de recomendaciones..."));

    await pool.query(`
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
      `);

    console.log(chalk.magentaBright("Creando tabla de img_recomendacion..."));

    await pool.query(`
      CREATE TABLE img_recomendacion (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          img VARCHAR(100) NOT NULL,
          id_recomendacion INT UNSIGNED NOT NULL,
          FOREIGN KEY (id_recomendacion) REFERENCES recomendaciones (id) 
          ON DELETE CASCADE 
          ON UPDATE CASCADE
          );
      `);

    console.log(chalk.magentaBright("Creando tabla de votos..."));

    await pool.query(`
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
      `);

    console.log(chalk.green("¡Todo correcto! ✨"));
  } catch (error) {
    console.error(chalk.red(error.message));
  } finally {
    process.exit();
  }
};

initDb();
