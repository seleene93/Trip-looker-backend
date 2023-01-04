const getPool = require("../../database/getPool");

const insertUser = async (user) => {
  const { nombre, apellidos, email, dni, encryptedPassword, fecha_nac } = user;

  const pool = getPool();

  const [{ insertId }] = await pool.query(
    "INSERT INTO usuarios (nombre, apellidos, email, dni, password, fecha_nac) VALUES (?, ?, ?, ?, ?, ?)",
    [nombre, apellidos, email, dni, encryptedPassword, fecha_nac]
  );

  return insertId;
};

module.exports = insertUser;
