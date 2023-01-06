const getPool = require("../../database/getPool");
require("dotenv").config();

const { DATABASE_NAME } = process.env;

const selectUserByDni = async (dni) => {
  const pool = getPool();

  const [[usuario]] = await pool.query(
    `SELECT * FROM ${DATABASE_NAME}.usuarios WHERE dni = ?`,
    [dni]
  );

  return usuario;
};

module.exports = selectUserByDni;
