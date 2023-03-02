const getPool = require("../../database/getPool");
require("dotenv").config();

const { DATABASE_NAME } = process.env;

const selectPostById = async (idPost) => {
  const pool = getPool();

  const [[post]] = await pool.query(
    `SELECT * FROM ${DATABASE_NAME}.posts WHERE id = ?`,
    [idPost]
  );
  const [photos] = await pool.query(
    `SELECT id, nombre FROM ${DATABASE_NAME}.img_post WHERE id_post = ?`,
    [post.id]
  );

  post.images = photos;
  return post;
};

module.exports = selectPostById;
