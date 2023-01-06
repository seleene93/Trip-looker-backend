const getPool = require("../../database/getPool");
require("dotenv").config();

const { DATABASE_NAME } = process.env;

const deletePostById = async (id) => {
  const pool = getPool();

  await pool.query(`DELETE FROM ${DATABASE_NAME}.posts WHERE id = ?`, [id]);
};

module.exports = deletePostById;
