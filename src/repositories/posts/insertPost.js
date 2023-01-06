const getPool = require("../../database/getPool");
require("dotenv").config();

const { DATABASE_NAME } = process.env;

const insertPost = async (post) => {
  const { titulo, categoria, lugar, entradilla, texto, idUsuario } = post;

  const pool = getPool();

  const [{ insertId }] = await pool.query(
    `INSERT INTO ${DATABASE_NAME}.posts (titulo, categoria, lugar, entradilla, texto, id_usuario) VALUES (?, ?, ?, ?, ?, ?)`,
    [titulo, categoria, lugar, entradilla, texto, idUsuario]
  );

  return insertId;
};

module.exports = insertPost;
