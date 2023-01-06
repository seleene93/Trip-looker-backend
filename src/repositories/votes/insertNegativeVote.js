const getPool = require("../../database/getPool");
require("dotenv").config();

const { DATABASE_NAME } = process.env;

const insertNegativeVote = async (idUsuario, idPost) => {
  const pool = getPool();

  const [{ insertId }] = await pool.query(
    `INSERT INTO ${DATABASE_NAME}.votos (voto_positivo, voto_negativo, id_usuario, id_post) VALUES (0, 1, ?, ?)`,
    [idUsuario, idPost]
  );

  return insertId;
};

module.exports = insertNegativeVote;
