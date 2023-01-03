const { selectPuntuation } = require("../../repositories/votes");

const getPuntuation = async (req, res, next) => {
  try {
    const { id } = req.params;

    const puntuacion = await selectPuntuation(id);

    res.status(200).send({ status: "ok", data: puntuacion });
  } catch (error) {
    next(error);
  }
};

module.exports = getPuntuation;
