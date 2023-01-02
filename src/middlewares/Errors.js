const Errors = (error, req, res, next) => {
  console.error(error);

  // Cuando el error que salta tiene el nombre "ValidationError" (error tirado por Joi), le ponemos un statusCode 400
  if (error.name === "ValidationError") {
    error.statusCode = 400;
  }

  // Se envía una respuesta con el statusCode que venga en el error, o si este no existe, mandamos el status 500
  res
    .status(error.statusCode || 500)
    .send({ status: "error", message: error.message });
};

module.exports = Errors;
