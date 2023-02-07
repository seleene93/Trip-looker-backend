const { selectPostsByIdUser } = require("../../repositories/posts");

const getPosts = async (req, res, next) => {
  try {
    // Recogemos el id del usuario logueado acceciendo a req.auth.id
    const idUsuario = req.auth.id;

    // Nos traemos los posts ya filtrados con el id que indique el cliente
    const posts = await selectPostsByIdUser(idUsuario);

    if (posts.length < 1) {
      throw generateError("No se ha encontrado el post", 404);
    }

    res.status(200).send({ status: "ok", data: posts });
  } catch (error) {
    next(error);
  }
};

module.exports = getPosts;
