const { selectPostsFilter } = require("../../repositories/posts");
const { generateError } = require("../../utils");

const getPostsFilter = async (req, res, next) => {
  try {
    let { lugar, categoria, direccion } = req.query;

    // Si no hay lugar establecemos un string vacio por defecto.
    lugar = lugar || "";
    categoria = categoria || "";

    // Si direccion viene vacio tendra por defecto el valor ASC.
    direccion = direccion === "ASC" ? "ASC" : "DESC";

    // obtenemos los posts filtrados
    const posts = await selectPostsFilter({
      lugar,
      categoria,
      direccion,
      idUser: req.auth?.id,
    });

    if (posts.length < 1) {
      generateError("No hay resultados en tu búsqueda", 404);
    }

    res.status(200).send({ status: "ok", data: posts });
  } catch (error) {
    next(error);
  }
};

module.exports = getPostsFilter;
