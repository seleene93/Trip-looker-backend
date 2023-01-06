const { insertNegativeVote } = require("../../repositories/votes");
const { selectPostsFilter } = require("../../repositories/posts");
const { generateError } = require("../../utils");

const postNegativeVote = async (req, res, next) => {
  try {
    // Recogemos el id del usuario logueado acceciendo a req.auth.id
    const idUsuario = req.auth.id;

    // Recogemos de los params el id del post que se quiere votar
    const { id: idPost } = req.params;

    // Seleccionamos el post ya filtrado de la base de datos
    const post = await selectPostsFilter(req.params);

    if (post.length < 1) {
      generateError("El post que estás intentando votar no existe", 404);
    }

    // buscamos si el usuario loggeado ya ha votado
    const insertedVoteId = await insertNegativeVote(idUsuario, idPost);

    res.status(201).send({
      status: "ok",
      data: {
        id: insertedVoteId,
        voto_negativo: 1,
        idUsuario,
        idPost,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = postNegativeVote;
