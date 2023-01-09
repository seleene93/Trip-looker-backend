const bcrypt = require("bcrypt");
// const uuid = require("uuid");
const {
  selectUserByEmail,
  insertUser,
  selectUserByDni,
} = require("../../repositories/users");
const { createUserSchema } = require("../../schemas/users");
const { generateError } = require("../../utils");

const createUser = async (req, res, next) => {
  try {
    // Validamos el body de la petición para ver si cumple los requisitos establecidos en el createUserSchema
    await createUserSchema.validateAsync(req.body);

    // Recogemos los datos de registro del body de la petición
    const { nombre, apellidos, email, dni, password, fecha_nac } = req.body;

    // Llamamos al respositorio para que mire si hay algún usuario con ese email en la DB
    const userWithSameEmail = await selectUserByEmail(email);

    // Si ya existe un usuario con ese email, lanzamos un error
    if (userWithSameEmail) {
      generateError("Ya existe un usuario con ese email", 400);
    }

    // Llamamos al respositorio para que mire si hay algún usuario con ese dni en la DB
    const userWithSameDni = await selectUserByDni(dni);

    // Si ya existe un usuario con ese dni, lanzamos un error
    if (userWithSameDni) {
      generateError("Ya existe un usuario con ese dni", 400);
    }

    // Encriptamos la contraseña del usuario (nunca se guarda en la DB sin encriptar)
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Llamamos al respositorio para que introduzca en la DB todos los datos del usuario
    const insertId = await insertUser({
      nombre,
      apellidos,
      email,
      dni,
      encryptedPassword,
      fecha_nac,
      // registrationCode,
    });

    res
      .status(201)
      .send({ status: "ok", data: { id: insertId, nombre, email } });
  } catch (error) {
    next(error);
  }
};

module.exports = createUser;
