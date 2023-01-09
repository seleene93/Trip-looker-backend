const getPool = require("../../database/getPool");
require("dotenv").config();

const { DATABASE_NAME } = process.env;

const selectUserById = async (id) => {
  const pool = getPool();

  const [[usuario]] = await pool.query(
    `SELECT * FROM ${DATABASE_NAME}.usuarios WHERE id = ?`,
    [id]
  );

  return usuario;
};

module.exports = selectUserById;
