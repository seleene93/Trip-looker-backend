const getPool = require("../../database/getPool");

const { DATABASE_NAME } = process.env;

const selectPostVotes = async (id) => {
  const pool = getPool();

  const [[votes]] = await pool.query(
    `SELECT SUM(voto_positivo) AS voto_positivo, SUM(voto_negativo) AS voto_negativo FROM ${DATABASE_NAME}.votos WHERE id_post = ?`,
    [id]
  );

  return votes;
};

module.exports = selectPostVotes;
