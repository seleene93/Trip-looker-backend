const getPool = require("../../database/getPool");
require("dotenv").config();

const { DATABASE_NAME } = process.env;

const insertComent = async (comentario, idPost, idUsuario) => {
  const pool = getPool();

  const [{ insertId }] = await pool.query(
    `INSERT INTO ${DATABASE_NAME}.comentarios (comentario, id_post, id_usuario) VALUES (?, ?, ?)`,
    [comentario, idPost, idUsuario]
  );

  return insertId;
};

module.exports = insertComent;
