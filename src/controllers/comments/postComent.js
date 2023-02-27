const { insertComent } = require("../../repositories/posts");
const { selectPostsFilter } = require("../../repositories/posts");
const { generateError } = require("../../utils");

const postComent = async (req, res, next) => {
  try {
    // Recogemos el id del usuario logueado acceciendo a req.auth.id
    const idUsuario = req.auth.id;

    // Recogemos de los params el id del post que se quiere comentar
    const { id: idPost } = req.params;

    // Recogemos el comentario del body
    const { comentario } = req.body;

    // Seleccionamos el post ya filtrado de la base de datos
    const post = await selectPostsFilter(req.params);

    if (post.length < 1) {
      generateError("El post que estás intentando comentar no existe", 404);
    }

    // buscamos si el usuario loggeado ya ha comentado
    const insertedComentId = await insertComent(comentario, idPost, idUsuario);

    res.status(201).send({
      status: "ok",
      data: {
        id: insertedComentId,
        comentario,
        idPost,
        idUsuario,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = postComent;
