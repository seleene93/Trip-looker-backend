const getPool = require("../../database/getPool");
require("dotenv").config();

const { DATABASE_NAME } = process.env;

const insertImgUser = async (nombre, img, idUser) => {
  const pool = getPool();

  const [{ insertId }] = await pool.query(
    `INSERT INTO ${DATABASE_NAME}.img_usuario (nombre, img, id_usuario) VALUES (?, ?, ?)`,
    [nombre, img, idUser]
  );

  return insertId;
};

module.exports = insertImgUser;
