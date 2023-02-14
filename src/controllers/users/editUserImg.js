const { selectUserById, updateUserImg } = require("../../repositories/users");
const { generateError, deleteImg, saveImg } = require("../../utils");

const editUserImg = async (req, res, next) => {
  try {
    // Recogemos el id del usuario logueado acceciendo a req.auth.id
    const idUsuario = req.auth.id;

    if (!req.files?.avatar) {
      generateError("Faltan campos", 400);
    }

    const user = selectUserById(idUsuario);

    if (user.avatar) {
      await deleteImg(user.avatar);
    }

    const avatarName = await saveImg(req.files.avatar, 100);

    // Llamamos al repositorio y le pasamos este objeto con los datos del usuario actualizados para que los introduzca en la DB
    await updateUserImg(avatarName, idUsuario);

    res.status(200).send({ status: "ok", message: "Avatar actualizado" });
  } catch (error) {
    next(error);
  }
};

module.exports = editUserImg;
