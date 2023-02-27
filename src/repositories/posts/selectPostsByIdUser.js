const getPool = require("../../database/getPool");
require("dotenv").config();

const { DATABASE_NAME } = process.env;

const selectPostsByIdUser = async (idUser) => {
  const pool = getPool();

  const [posts] = await pool.query(
    `SELECT * FROM ${DATABASE_NAME}.posts WHERE id_usuario = ?`,
    [idUser]
  );

  for (const post of posts) {
    const [photos] = await pool.query(
      `SELECT id, nombre FROM ${DATABASE_NAME}.img_post WHERE id_post = ?`,
      [post.id]
    );
    // Posts va a tener la propiedad images con las imagenes que contenga.
    post.images = photos;
  }

  return posts;
};

module.exports = selectPostsByIdUser;
