const getPool = require("../../database/getPool");
require("dotenv").config();

const { DATABASE_NAME } = process.env;

const selectPostsByIdUser = async (idUser) => {
  const pool = getPool();

  const [[posts]] = await pool.query(
    `SELECT * FROM ${DATABASE_NAME}.posts WHERE id_usuario = ?`,
    [idUser]
  );
  return posts;
};

module.exports = selectPostsByIdUser;
