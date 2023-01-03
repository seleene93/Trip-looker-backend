require("dotenv").config();
const bcrypt = require("bcrypt");
const getPool = require("./getPool");
const chalk = require("chalk");

// Función que inserta datos de prueba en la DB

const populateDb = async () => {
  try {
    const pool = getPool();

    console.log(chalk.magentaBright("Insertando usuarios..."));

    await pool.query(`
        USE trip_looker
    `);

    await pool.query(`
        INSERT INTO usuarios (nombre, apellidos, email, tel, dni, password, fecha_nac) VALUES 
        ("Paco", "Martínez Soria", "paco@email.com", "661234567", "7000000-A", "${await bcrypt.hash(
          "123456",
          10
        )}", "1997-07-16"),
        ("María", "De la O", "maria@email.com", "661234567", "7000000-B", "${await bcrypt.hash(
          "123456",
          10
        )}", "1996-05-26"),
        ("Mauricio", "Colmenero", "mauricio@email.com", "661234567", "7000000-C", "${await bcrypt.hash(
          "123456",
          10
        )}", "1961-05-12")
    `);

    console.log(chalk.magentaBright("Insertando direcciones usuarios..."));

    await pool.query(`
        INSERT INTO direcciones_usuarios (direccion, ciudad, cp, pais, id_usuario) VALUES 
        ("P.Sherman Calle Wallabe", "Sydney", "45300", "Australia", 1),
        ("Evergreen Terrace", "Springfield", "45500", "EEUU", 2);
    `);

    console.log(chalk.magentaBright("Insertando recomendaciones..."));

    await pool.query(`
        INSERT INTO recomendaciones (titulo, categoria, lugar, entradilla, id_usuario) VALUES 
        ("Mi viaje a Ibiza", "ocio", "Ibiza", "Genial para salir de fiesta", 1),
        ("Visita por Madrid", "cultural", "Madrid", "Me gustó bastante, pero se nota demasiado estrés", 2);
    `);

    console.log(chalk.magentaBright("Insertando votos..."));

    await pool.query(`
        INSERT INTO votos (voto_positivo, voto_negativo, puntuacion_total, id_usuario, id_recomendacion) VALUES 
        (1, 0, 1, 1, 1),
        (0, 1, -1, 2, 2),
        (0, 1, -2, 1, 2),
        (1, 0, 2, 2, 1),
        (1, 0, -1, 3, 2);
    `);

    console.log(chalk.green("¡Todo correcto! ✨"));
  } catch (error) {
    console.error(error.message);
  } finally {
    process.exit();
  }
};

populateDb();
