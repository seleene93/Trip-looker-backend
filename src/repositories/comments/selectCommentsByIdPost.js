const getPool = require("../../database/getPool");
require("dotenv").config();

const { DATABASE_NAME } = process.env;

const selectCommentsByIdPost = async (id) => {
  const pool = getPool();

  const [comentarios] = await pool.query(
    `SELECT * FROM ${DATABASE_NAME}.comentarios WHERE id_post = ?`,
    [id]
  );

  return comentarios;
};

module.exports = selectCommentsByIdPost;
