const bcrypt = require("bcrypt");
const { selectUserByEmail, insertUser } = require("../../repositories/users");
const { createUserSchema } = require("../../schemas/users");
const { generateError, saveImg } = require("../../utils");

const createUser = async (req, res, next) => {
  try {
    // Validamos el body de la petición para ver si cumple los requisitos establecidos en el createUserSchema
    await createUserSchema.validateAsync(req.body);

    // Recogemos los datos de registro del body de la petición
    const { nombre, apellidos, email, ciudad, password, fecha_nac } = req.body;

    // Encriptamos la contraseña del usuario (nunca se guarda en la DB sin encriptar)
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Llamamos al respositorio para que mire si hay algún usuario con ese email en la DB
    const userWithSameEmail = await selectUserByEmail(email);

    // Si ya existe un usuario con ese email, lanzamos un error
    if (userWithSameEmail) {
      generateError("Ya existe un usuario con ese email", 400);
    }

    // Las imágenes que envía el cliente en la petición las vamos a recoger en req.files.images. Si el cliente no envía ninguna imagen,
    // req.files va a ser undefined. Creamos una variable "images" donde guardamos req.files.images, o en caso de que no haya ninguna imagen, un objeto vacío
    let avatarName;

    if (req.files && req.files?.avatar) {
      avatarName = await saveImg(req.files.avatar, 100);
    }

    // Llamamos al respositorio para que introduzca en la DB todos los datos del usuario
    const insertedUserId = await insertUser({
      nombre,
      apellidos,
      email,
      ciudad,
      encryptedPassword,
      fecha_nac,
      avatarName,
    });

    res.status(201).send({
      status: "ok",
      data: { id: insertedUserId, nombre, email },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createUser;
