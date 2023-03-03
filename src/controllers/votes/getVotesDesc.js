const { selectVotesDesc } = require("../../repositories/votes");
const { generateError } = require("../../utils");

const getVotesDesc = async (req, res, next) => {
  try {
    // obtenemos los posts filtrados y en orden de votos descendentes
    const posts = await selectVotesDesc(req.query, req.auth?.id);

    if (posts.length < 1) {
      generateError("No hay resultados en tu búsqueda", 404);
    }

    res.status(200).send({ status: "ok", data: posts });
  } catch (error) {
    next(error);
  }
};

module.exports = getVotesDesc;
