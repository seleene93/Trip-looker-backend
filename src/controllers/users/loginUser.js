const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { selectUserByEmail } = require("../../repositories/users");
const { loginUserSchema } = require("../../schemas/users");
const { generateError } = require("../../utils");

const loginUser = async (req, res, next) => {
  try {
    // Validamos el body de la petición para ver si cumple los requisitos establecidos en el loginUserSchema
    await loginUserSchema.validateAsync(req.body);

    // Nos traemos el email y la password del body de la petición
    const { email, password } = req.body;

    // Seleccionamos de la base de datos el usuario con dicho email
    const user = await selectUserByEmail(email);

    // Si no existe el usuario con ese email, lanzamos un error
    if (!user) {
      generateError("Email o contraseña incorrecta", 400);
    }

    // Comprobamos si la contraseña está bien. La password que viene en el body está sin encriptar,
    // pero la de la base de datos (user.password) está encriptada,
    // así que para compararlas hay que usar el método bcrypt.compare().
    // Si la pass está bien, nos devuelve true, si no, false
    const isPasswordOk = await bcrypt.compare(password, user.password);

    // Si la password no está bien, lanzamos un error
    if (!isPasswordOk) {
      generateError("Email o contraseña incorrecta", 400);
    }

    // Creamos el payload (los datos que vamos a guardar en el token)
    const tokenPayload = { id: user.id };

    // Generamos un token. Para generarlo, le indicamos el payload (los datos que va a llevar guardados),
    // el secreto (la clave con la que se genera el token) y un objeto opcional con diferentes opciones que podemos encontrar en documentación (como cuando expira el token)
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // Enviamos el token generado al cliente
    res.status(200).send({ status: "ok", data: { token } });
  } catch (error) {
    next(error);
  }
};

module.exports = loginUser;
