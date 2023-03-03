const { selectVotesAsc } = require("../../repositories/votes");
const { generateError } = require("../../utils");

const getVotesAsc = async (req, res, next) => {
  try {
    // obtenemos los posts filtrados y en orden de votos ascendentes
    const posts = await selectVotesAsc(req.query, req.auth?.id);

    if (posts.length < 1) {
      generateError("No hay resultados en tu búsqueda", 404);
    }

    res.status(200).send({ status: "ok", data: posts });
  } catch (error) {
    next(error);
  }
};

module.exports = getVotesAsc;
