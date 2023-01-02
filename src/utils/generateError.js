const generateError = (message, code) => {
  // Crea un error con el mensaje indicado por parámetro
  const error = new Error(message);

  // Añade una propiedad "statusCode" en el objeto de error, con el código indicado por parámetro
  error.statusCode = code;

  // Tira el error, que será recogido por el catch de los endpoints en los que utilizamos esta función
  throw error;
};

module.exports = generateError;
