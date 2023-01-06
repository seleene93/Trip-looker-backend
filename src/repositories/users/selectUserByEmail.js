const getPool = require("../../database/getPool");
require("dotenv").config();

const { DATABASE_NAME } = process.env;

const selectUserByEmail = async (email) => {
  const pool = getPool();

  const [[usuario]] = await pool.query(
    `SELECT * FROM ${DATABASE_NAME}.usuarios WHERE email = ?`,
    [email]
  );

  return usuario;
};

module.exports = selectUserByEmail;
