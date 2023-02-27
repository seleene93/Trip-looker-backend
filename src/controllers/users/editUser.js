const { selectUserById, updateUser } = require("../../repositories/users");
const { editUserSchema } = require("../../schemas/users");
const bcrypt = require("bcrypt");

const editUser = async (req, res, next) => {
  try {
    // Recogemos el id del usuario logueado acceciendo a req.auth.id
    const idUsuario = req.auth.id;

    // Llamamos al respositorio para seleccionar el usuario loggeado
    const usuario = await selectUserById(idUsuario);

    // Validamos el body de la petición para ver si cumple los requisitos establecidos en el createPostSchema
    await editUserSchema.validateAsync(req.body);

    // Encriptamos la contraseña del usuario
    if (req.body.password) {
      const password = req.body.password;
      const encryptedPassword = await bcrypt.hash(password, 10);

      req.body.password = encryptedPassword;
    }

    // Construimos un objeto que tiene todos los datos del usuario, pero sobreescribimos los valores que mande el cliente en el req.body
    const updatedUser = { ...usuario, ...req.body };

    // Llamamos al repositorio y le pasamos este objeto con los datos del usuario actualizados para que los introduzca en la DB
    await updateUser(updatedUser);

    res.status(200).send({ status: "ok", data: updatedUser });
  } catch (error) {
    next(error);
  }
};

module.exports = editUser;
