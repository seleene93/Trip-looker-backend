const { insertPositiveVote } = require("../../repositories/votes");
const { selectPostsFilter } = require("../../repositories/posts");
const { generateError } = require("../../utils");

const postPositiveVote = async (req, res, next) => {
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

    // Recogemos el id del voto insertado
    const insertedVoteId = await insertPositiveVote(idUsuario, idPost);

    res.status(201).send({
      status: "ok",
      data: {
        id: insertedVoteId,
        voto_positivo: 1,
        idUsuario,
        idPost,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = postPositiveVote;
