const { selectUserById } = require("../../repositories/users");

const getUserLogged = async (req, res, next) => {
  try {
    const idUsuario = req.auth.id;

    const usuario = await selectUserById(idUsuario);

    res.send({
      status: "ok",
      data: usuario,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getUserLogged;
