const {
  selectImgByUserId,
  updateUserImg,
} = require("../../repositories/users");

const editUserImg = async (req, res, next) => {
  try {
    // Recogemos el id del usuario logueado acceciendo a req.auth.id
    const idUsuario = req.auth.id;

    let img = req.files?.img || {};

    // Llamamos al repositorio y le pasamos este objeto con los datos del usuario actualizados para que los introduzca en la DB
    await updateUserImg(img, idUsuario);

    res.status(200).send({ status: "ok", data: img });
  } catch (error) {
    next(error);
  }
};

module.exports = editUserImg;
