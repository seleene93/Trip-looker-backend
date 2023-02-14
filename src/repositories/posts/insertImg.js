const getPool = require("../../database/getPool");
require("dotenv").config();

const { DATABASE_NAME } = process.env;

const insertImg = async (nombre, idPost) => {
  const pool = getPool();

  const [{ insertId }] = await pool.query(
    `INSERT INTO ${DATABASE_NAME}.img_post (nombre, id_post) VALUES (?, ?)`,
    [nombre, idPost]
  );

  return insertId;
};

module.exports = insertImg;
