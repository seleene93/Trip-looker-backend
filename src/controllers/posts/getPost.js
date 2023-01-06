const { selectPostsFilter } = require("../../repositories/posts");
const { generateError } = require("../../utils");
const { postIdSchema } = require("../../schemas/posts");

const getPost = async (req, res, next) => {
  try {
    // Nos traemos el id que envía el cliente en los params
    const { id } = req.params;

    // Validamos el id para ver si cumple los requisitos establecidos en el postIdSchema
    await postIdSchema.validateAsync(id);

    // Nos traemos los posts ya filtrados con el id que indique el cliente
    const posts = await selectPostsFilter(req.params);

    if (posts.length < 1) {
      throw generateError("No se ha encontrado el post", 404);
    }

    res.status(200).send({ status: "ok", data: posts });
  } catch (error) {
    next(error);
  }
};

module.exports = getPost;
