const { selectVotesDesc } = require("../../repositories/votes");
const { postFilterSchema } = require("../../schemas/posts");
const { generateError } = require("../../utils");

const getVotesDesc = async (req, res, next) => {
  try {
    // Validamos lo que envia el cliente por query params
    // (filtros por categoría y lugar)
    // para ver si cumple con los requisitos establecidos en postFilterSchema
    await postFilterSchema.validateAsync(req.query);

    // obtenemos los posts filtrados y en orden de votos descendentes
    const posts = await selectVotesDesc(req.query);

    if (posts.length < 1) {
      generateError("No hay resultados en tu búsqueda", 404);
    }

    res.status(200).send({ status: "ok", data: posts });
  } catch (error) {
    next(error);
  }
};

module.exports = getVotesDesc;
