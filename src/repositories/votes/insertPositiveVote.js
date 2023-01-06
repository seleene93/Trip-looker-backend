const getPool = require("../../database/getPool");
require("dotenv").config();

const { DATABASE_NAME } = process.env;

const insertPositiveVote = async (idUsuario, idPost) => {
  const pool = getPool();

  const [{ insertId }] = await pool.query(
    `INSERT INTO ${DATABASE_NAME}.votos (voto_positivo, voto_negativo, id_usuario, id_post) VALUES (1, 0, ?, ?)`,
    [idUsuario, idPost]
  );

  return insertId;
};

module.exports = insertPositiveVote;
