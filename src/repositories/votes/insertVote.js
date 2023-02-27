const getPool = require("../../database/getPool");
require("dotenv").config();

const { DATABASE_NAME } = process.env;

const insertVote = async (voto, idUsuario, idPost) => {
  const pool = getPool();
  let votoPositivo = 0;
  let votoNegativo = 1;

  if (voto === "positivo") {
    votoPositivo = 1;
    votoNegativo = 0;
  }

  const [{ insertId }] = await pool.query(
    `INSERT INTO ${DATABASE_NAME}.votos (voto_positivo, voto_negativo, id_usuario, id_post) VALUES (?, ?, ?, ?)`,
    [votoPositivo, votoNegativo, idUsuario, idPost]
  );

  return insertId;
};

module.exports = insertVote;
