const {
  insertVote,
  selectPostVotes,
  selectPositiveVoteIfExists,
  selectNegativeVoteIfExists,
  deleteVoteById,
} = require("../../repositories/votes");
const { selectPostById } = require("../../repositories/posts");
const { generateError } = require("../../utils");
const { postVoteSchema } = require("../../schemas/posts");

const postVote = async (req, res, next) => {
  try {
    // Recogemos el id del usuario logueado acceciendo a req.auth.id
    const idUsuario = req.auth.id;

    // Recogemos de los params el id del post que se quiere votar
    const { id: idPost } = req.params;

    // Voto sería "positivo/negativo"
    const { voto } = req.body;

    // Validamos voto
    await postVoteSchema.validateAsync(voto);

    // Seleccionamos el post ya filtrado de la base de datos
    const post = await selectPostById(idPost);

    if (post.length < 1) {
      generateError("El post que estás intentando votar no existe", 404);
    }

    // Comprobamos que el usuario tenga un voto guardado previamente
    const votoPositivo = await selectPositiveVoteIfExists(idUsuario, idPost);

    const votoNegativo = await selectNegativeVoteIfExists(idUsuario, idPost);

    // Mensaje que indica el tipo de accin que acabamos de realizar.
    let message;

    if (votoPositivo === 0 && votoNegativo === 0) {
      if (voto === "positivo") {
        message = "Voto positivo insertado";
      } else {
        message = "Voto negativo insertado";
      }
      // Si no tiene un voto previo simplemente añadir el voto
      await insertVote(voto, idUsuario, idPost);
    } else if (votoPositivo === 1 && voto === "positivo") {
      message = "Voto positivo eliminado";
      // Si tiene un voto previo:
      // - Si tiene un voto igual al que quiere votar borramos ese voto previo
      await deleteVoteById(idUsuario, idPost);
    } else if (votoPositivo === 1 && voto === "negativo") {
      message = "Cambio de voto";
      // - Si es contrario al que quiere votar borramos ese voto previo y añadimos el nuevo voto
      await deleteVoteById(idUsuario, idPost);
      await insertVote(voto, idUsuario, idPost);
    } else if (votoNegativo === 1 && voto === "positivo") {
      message = "Cambio de voto";
      // - Si es contrario al que quiere votar borramos ese voto previo y añadimos el nuevo voto
      await deleteVoteById(idUsuario, idPost);
      await insertVote(voto, idUsuario, idPost);
    } else {
      message = "Voto negativo eliminado";
      // - Si tiene un voto igual al que quiere votar borramos ese voto previo
      await deleteVoteById(idUsuario, idPost);
    }

    // Calculamos recuento de votos después de guardar el voto anterior
    const recuento = await selectPostVotes(idPost);

    res.send({
      status: "ok",
      message,
      data: {
        recuento,
        idUsuario,
        idPost,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = postVote;
