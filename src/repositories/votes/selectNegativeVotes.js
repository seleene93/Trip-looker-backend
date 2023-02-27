const getPool = require("../../database/getPool");
require("dotenv").config();

const { DATABASE_NAME } = process.env;

const selectNegativeVoteIfExists = async (idUsuario, idPost) => {
  const pool = getPool();

  let [[vote]] = await pool.query(
    `SELECT voto_negativo FROM ${DATABASE_NAME}.votos WHERE id_usuario = ? AND id_post = ?`,
    [idUsuario, idPost]
  );

  if (!vote) {
    vote = 0;
    return vote;
  } else {
    return vote.voto_negativo;
  }
};

module.exports = selectNegativeVoteIfExists;
