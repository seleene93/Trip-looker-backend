const getPool = require("../../database/getPool");
require("dotenv").config();

const { DATABASE_NAME } = process.env;

const updateUser = async (usuario) => {
  // Recogemos el nombre, apellidos email, ciudad, password del objeto con los datos del usuario actualizados
  const { id, nombre, apellidos, email, ciudad, password, fecha_nac } = usuario;

  const pool = getPool();

  // ACtualizamos en la DB los datos del post
  await pool.query(
    `UPDATE ${DATABASE_NAME}.usuarios SET nombre = ?, apellidos = ?, email = ?, ciudad = ?, password = ?, fecha_nac = ? WHERE id = ?`,
    [nombre, apellidos, email, ciudad, password, fecha_nac, id]
  );
};

module.exports = updateUser;
