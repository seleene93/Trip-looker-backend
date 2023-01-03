const getPool = require("../../database/getPool");

const selectUserByEmail = async (email) => {
  const pool = getPool();

  const [[usuario]] = await pool.query(
    "SELECT * FROM usuarios WHERE email = ?",
    [email]
  );

  return usuario;
};

module.exports = selectUserByEmail;
