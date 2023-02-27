const getPool = require("../../database/getPool");
require("dotenv").config();

const { DATABASE_NAME } = process.env;

const updateUserImg = async (avatarName, idUsuario) => {
  const pool = getPool();

  // Actualizamos en la DB los datos del post
  await pool.query(
    `UPDATE ${DATABASE_NAME}.usuarios SET avatar = ? WHERE id = ?`,
    [avatarName, idUsuario]
  );
};

module.exports = updateUserImg;
