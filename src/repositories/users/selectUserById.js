const getPool = require("../../database/getPool");
const { generateError } = require("../../utils");
require("dotenv").config();

const { DATABASE_NAME } = process.env;

const selectUserById = async (id) => {
  const pool = getPool();

  const [[usuario]] = await pool.query(
    `SELECT * FROM ${DATABASE_NAME}.usuarios WHERE id = ?`,
    [id]
  );

  if (!usuario) {
    generateError("Usuario no encontrado", 404);
  }
  return usuario;
};

module.exports = selectUserById;
