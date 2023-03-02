const jwt = require("jsonwebtoken");
const { generateError } = require("../utils");

const validateAuthOptional = (req, res, next) => {
  try {
    // Hacemos destructuring y nos traemos el header authorization
    const { authorization } = req.headers;

    if (authorization && authorization !== "Bearer") {
      // Separamos la authorization en dos partes, la primera es el tipo de token y la segunda el token (los tokens siempre tienen un formato así: "type token". Por ejemplo: "Bearer xxxxx")
      const [type, token] = authorization.split(" ");

      // Si el tipo del token no es Bearer o el token no existe, lanzamos un error
      if (type !== "Bearer" || !token) {
        generateError("El token tiene un formato inválido", 400);
      }

      // Verificamos si el token es válido. Si no lo es, va a saltar un error. Si lo es, vamos a recibir el payload del token, que son los datos que tiene guardados
      const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);

      // Creamos una propiedad auth en el objeto req y guardamos en ella todos los datos del usuario que había guardados en el token.
      req.auth = tokenPayload;
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateAuthOptional;
