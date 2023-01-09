const notFound = (req, res) => {
  res.status(404).send({ status: "error", message: "No se ha encontrado" });
};

module.exports = notFound;
