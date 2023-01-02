const jwt = require("jsonwebtoken");
const { generateError } = require("../utils");

const validateAuth = (req, res, next) => {
  try {
    // Hacemos destructuring y nos traemos el header authorization
    const { authorization } = req.headers;

    if (!authorization) {
      generateError("Missing authorization header", 400);
    }

    // Separamos la authorization en dos partes, la primera es el tipo de token y la segunda el token (los tokens siempre tienen un formato así: "type token". Por ejemplo: "Bearer xxxxx")
    const [type, token] = authorization.split(" ");

    // Si el tipo del token no es Bearer o el token no existe, lanzamos un error
    if (type !== "Bearer" || !token) {
      generateError("El token tiene un formato inválido", 400);
    }

    // Verificamos si el token es válido. Si no lo es, va a saltar un error. Si lo es, vamos a recibir el payload del token, que son los datos que tiene guardados (en el controller de login, podéis ver que cuando generamos el token con jwt.sign(), guardamos en él un objeto llamado tokenPayload que contiene el id del usuario)
    const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);

    // Creamos una propiedad auth en el objeto req y guardamos en ella todos los datos del usuario que había guardados en el token. Esto lo hacemos para luego poder acceder a esta información en los controllers, ya que una petición que pase por este middleware y finalmente llegue a un controller, va a tener en req.auth el objeto tokenPayload que contiene el id del usuario logueado
    req.auth = tokenPayload;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateAuth;
