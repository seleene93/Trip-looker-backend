const { selectFilter } = require("../../repositories/recommendations");
const { filterSchema } = require("../../schemas/recommendations");
const { generateError } = require("../../utils");

const getFilter = async (req, res, next) => {
  try {
    await filterSchema.validateAsync(req.query);

    const recommendations = await selectFilter(req.query);

    if (recommendations.length < 1) {
      generateError("No hay resultados en tu búsqueda", 404);
    }

    res.status(200).send({ status: "ok", data: recommendations });
  } catch (error) {
    next(error);
  }
};

module.exports = getFilter;
