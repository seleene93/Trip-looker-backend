const bcrypt = require("bcrypt");
const uuid = require("uuid");
const {
  selectUserByEmail,
  insertUser,
  selectUserByDni,
} = require("../../repositories/users");
const { createUserSchema } = require("../../schemas/users");
const { generateError } = require("../../utils");

const createUser = async (req, res, next) => {
  try {
    await createUserSchema.validateAsync(req.body);

    const { nombre, apellidos, email, dni, password, fecha_nac } = req.body;

    const userWithSameEmail = await selectUserByEmail(email);

    if (userWithSameEmail) {
      generateError("Ya existe un usuario con ese email", 400);
    }

    const userWithSameDni = await selectUserByDni(dni);

    if (userWithSameDni) {
      generateError("Ya existe un usuario con ese dni", 400);
    }

    const registrationCode = uuid.v4();

    const encryptedPassword = await bcrypt.hash(password, 10);

    const insertId = await insertUser({
      nombre,
      apellidos,
      email,
      dni,
      encryptedPassword,
      fecha_nac,
      registrationCode,
    });

    //   await sendMail(
    //     "¡Welcome to Travels APP!",
    //     `<p>Thanks for joining travelers! :D</p>
    //      <a href="http://localhost:8080/activate/${registrationCode}">Activate your account</a>`,
    //     email
    //   );

    res
      .status(201)
      .send({ status: "ok", data: { id: insertId, nombre, email } });
  } catch (error) {
    next(error);
  }
};

module.exports = createUser;
