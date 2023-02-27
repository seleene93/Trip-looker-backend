const getPool = require("../../database/getPool");
require("dotenv").config();

const { DATABASE_NAME } = process.env;

const deleteVoteById = async (idUsuario, idPost) => {
  const pool = getPool();

  await pool.query(
    `DELETE FROM ${DATABASE_NAME}.votos WHERE id_usuario = ? AND id_post = ?`,
    [idUsuario, idPost]
  );
};

module.exports = deleteVoteById;
