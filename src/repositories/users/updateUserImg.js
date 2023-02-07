const getPool = require("../../database/getPool");
require("dotenv").config();

const { DATABASE_NAME } = process.env;

const updateUserImg = async (image, idUsuario) => {
  // Recogemos el nombre, dato e id usuario del objeto con los datos del usuario actualizados
  const { name, data } = image;

  const pool = getPool();

  // ACtualizamos en la DB los datos del post
  await pool.query(
    `UPDATE ${DATABASE_NAME}.img_usuario SET nombre = ?, img = ? WHERE id_usuario = ?`,
    [name, data, idUsuario]
  );
};

module.exports = updateUserImg;
