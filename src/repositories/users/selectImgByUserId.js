const getPool = require("../../database/getPool");
require("dotenv").config();

const { DATABASE_NAME } = process.env;

const selectImgByUserId = async (id) => {
  const pool = getPool();

  const [[img]] = await pool.query(
    `SELECT * FROM ${DATABASE_NAME}.img_usuario WHERE id_usuario = ?`,
    [id]
  );

  return img;
};

module.exports = selectImgByUserId;
