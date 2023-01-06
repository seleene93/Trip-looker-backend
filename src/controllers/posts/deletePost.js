const {
  selectPostsFilter,
  deletePostById,
} = require("../../repositories/posts");
const { postIdSchema } = require("../../schemas/posts");
const { generateError } = require("../../utils");

const deletePost = async (req, res, next) => {
  try {
    // Recogemos de los path params el "id" del post que el usuario quiere eliminar
    const { id } = req.params;

    // Validamos el id de los params para ver si cumple los requisitos establecidos en el postIdSchema
    await postIdSchema.validateAsync(id);

    // Nos traemos los posts ya filtrados con el id que indique el cliente
    const posts = await selectPostsFilter(req.params);

    // Si no existe el post, lanzamos un error
    if (posts.length < 1) {
      throw generateError("No se ha encontrado el post", 404);
    }

    // Nos traemos el ID del usuario logueado de req.auth (esta propiedad se crea en el middleware validateAuth)
    const idUsuario = req.auth.id;

    // Si el id del dueño del post no es el mismo que el del usuario logueado, tiramos un error
    if (posts[0].id_usuario !== idUsuario) {
      generateError("No tienes permisos para borrar este post", 401);
    }

    // Si el post existe, llamamos al repositorio para que lo elimine de la DB
    await deletePostById(id);

    // Enviamos una respuesta con status 200 e indicando que el post se ha borrado correctamente
    res
      .status(200)
      .send({ status: "ok", message: "Post borrado satisfactoriamente" });
  } catch (error) {
    next(error);
  }
};

module.exports = deletePost;
