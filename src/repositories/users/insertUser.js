const getPool = require("../../database/getPool");
require("dotenv").config();

const { DATABASE_NAME } = process.env;

const insertUser = async (user) => {
  const {
    nombre,
    apellidos,
    email,
    ciudad,
    dni,
    encryptedPassword,
    fecha_nac,
  } = user;

  const pool = getPool();

  const [{ insertId }] = await pool.query(
    `INSERT INTO ${DATABASE_NAME}.usuarios (nombre, apellidos, email, ciudad, dni, password, fecha_nac) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [nombre, apellidos, email, ciudad, dni, encryptedPassword, fecha_nac]
  );

  return insertId;
};

module.exports = insertUser;
