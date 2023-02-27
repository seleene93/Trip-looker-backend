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

    await pool.query("DROP TABLE IF EXISTS comentarios");
    await pool.query("DROP TABLE IF EXISTS votos;");
    await pool.query("DROP TABLE IF EXISTS img_post;");
    await pool.query("DROP TABLE IF EXISTS posts;");
    await pool.query("DROP TABLE IF EXISTS img_usuario");
    await pool.query("DROP TABLE IF EXISTS usuarios;");

    console.log(chalk.magentaBright("Creando tabla de usuarios..."));

    await pool.query(`
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
      `);

    console.log(chalk.magentaBright("Creando tabla de posts..."));

    await pool.query(`
      CREATE TABLE posts (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          titulo VARCHAR(25) NOT NULL,
          categoria ENUM('ocio', 'cultural', 'expedicion', 'romantico', 'otro') DEFAULT 'otro',
          lugar VARCHAR(20) NOT NULL,
          entradilla VARCHAR(35),
          texto VARCHAR(1700),
          id_usuario INT UNSIGNED NOT NULL,
          FOREIGN KEY (id_usuario) REFERENCES usuarios (id) 
          ON DELETE CASCADE
          ON UPDATE CASCADE
          );
      `);

    console.log(chalk.magentaBright("Creando tabla de img_post..."));

    await pool.query(`
      CREATE TABLE img_post (
          id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          nombre VARCHAR(100) NOT NULL,
          id_post INT UNSIGNED NOT NULL,
          FOREIGN KEY (id_post) REFERENCES posts (id) 
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
          id_usuario INT UNSIGNED NOT NULL,
          id_post INT UNSIGNED NOT NULL,
          FOREIGN KEY (id_usuario) REFERENCES usuarios (id)
          ON DELETE CASCADE
          ON UPDATE CASCADE,
          FOREIGN KEY (id_post) REFERENCES posts (id)
          ON DELETE CASCADE
          ON UPDATE CASCADE
          );
      `);

    console.log(chalk.magentaBright("Creando tabla de comentarios..."));

    await pool.query(`
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
      `);

    console.log(chalk.green("¡Todo correcto! ✨"));
  } catch (error) {
    console.error(chalk.red(error.message));
  } finally {
    process.exit();
  }
};

initDb();
