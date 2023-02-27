const getPool = require("../../database/getPool");
require("dotenv").config();

const { DATABASE_NAME } = process.env;

const insertUser = async (user) => {
  const {
    nombre,
    apellidos,
    email,
    ciudad,
    encryptedPassword,
    fecha_nac,
    avatarName,
  } = user;

  const pool = getPool();

  const [{ insertId }] = await pool.query(
    `INSERT INTO ${DATABASE_NAME}.usuarios (nombre, apellidos, email, ciudad, password, fecha_nac, avatar) VALUES ( ?, ?, ?, ?, ?, ?, ?)`,
    [nombre, apellidos, email, ciudad, encryptedPassword, fecha_nac, avatarName]
  );

  return insertId;
};

module.exports = insertUser;
