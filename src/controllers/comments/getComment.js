const { selectCommentsByIdPost } = require("../../repositories/comments");
const { generateError } = require("../../utils");
const { postIdSchema } = require("../../schemas/posts");

const getComment = async (req, res, next) => {
  try {
    // Nos traemos el id que envía el cliente en los params
    const { id } = req.params;

    // Validamos el id para ver si cumple los requisitos establecidos en el postIdSchema
    await postIdSchema.validateAsync(id);

    // Nos traemos los comentarios con el idPost que indique el cliente
    const comentarios = await selectCommentsByIdPost(id);

    if (comentarios.length < 1) {
      throw generateError("No hay resultados", 404);
    }

    res.status(200).send({ status: "ok", data: comentarios });
  } catch (error) {
    next(error);
  }
};

module.exports = getComment;
