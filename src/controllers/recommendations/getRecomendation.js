const { selectFilter } = require("../../repositories/recommendations");
const { filterSchema } = require("../../schemas/recommendations");
const { generateError } = require("../../utils");

const getRecomendation = async (req, res, next) => {
  try {
    const { id } = req.params;

    const recommendations = await selectFilter(req.params);

    if (recommendations.length < 1) {
      throw generateError("no se ha encontrado la recomendacion", 404);
    }

    res.status(200).send({ status: "ok", data: recommendations });
  } catch (error) {
    next(error);
  }
};

module.exports = getRecomendation;
