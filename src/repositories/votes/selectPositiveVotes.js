const getPool = require("../../database/getPool");
require("dotenv").config();

const { DATABASE_NAME } = process.env;

const selectPositiveVoteIfExists = async (idUsuario, idPost) => {
  const pool = getPool();

  let [[vote]] = await pool.query(
    `SELECT voto_positivo FROM ${DATABASE_NAME}.votos WHERE id_usuario = ? AND id_post = ?`,
    [idUsuario, idPost]
  );

  if (!vote) {
    vote = 0;
    return vote;
  } else {
    return vote.voto_positivo;
  }
};

module.exports = selectPositiveVoteIfExists;
