const getPool = require("../../database/getPool");

const selectUserByDni = async (dni) => {
  const pool = getPool();

  const [[usuario]] = await pool.query("SELECT * FROM usuarios WHERE dni = ?", [
    dni,
  ]);

  return usuario;
};

module.exports = selectUserByDni;
