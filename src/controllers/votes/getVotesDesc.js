const { selectVotesDesc } = require("../../repositories/votes");
const { filterSchema } = require("../../schemas/recommendations");
const { generateError } = require("../../utils");

const getVotesDesc = async (req, res, next) => {
  try {
    await filterSchema.validateAsync(req.query);

    const recommendations = await selectVotesDesc(req.query);

    if (recommendations.length < 1) {
      generateError("No hay resultados en tu búsqueda", 404);
    }

    res.status(200).send({ status: "ok", data: recommendations });
  } catch (error) {
    next(error);
  }
};

module.exports = getVotesDesc;
