const { insertPost, insertImg } = require("../../repositories/posts");
const { createPostSchema } = require("../../schemas/posts");
const { saveImg } = require("../../utils");

const createPost = async (req, res, next) => {
  try {
    // Nos traemos el ID del usuario logueado de req.auth (esta propiedad se crea en el middleware validateAuth)
    const idUsuario = req.auth.id;

    // Validamos el body de la petición para ver si cumple los requisitos establecidos en el createPostSchema
    await createPostSchema.validateAsync(req.body);

    // Nos traemos el título, categoria, lugar, entradilla y texto del body
    const { titulo, categoria, lugar, entradilla, texto } = req.body;

    // Llamamos al repositorio para que inserte el post en la DB
    const insertedPostId = await insertPost({
      titulo,
      categoria,
      lugar,
      entradilla,
      texto,
      idUsuario,
    });

    // array que almacenará las img del post (si las hay)
    let images = [];

    // si existe req.files guardamos las fotos en la carpeta de subida de archivos
    if (req.files) {
      // obtenemos un array con las fotos y por si las moscas nos quedamos exclusivamente nos quedamos con las 5 primeras posiciones del array
      const listOfPhotos = Object.values(req.files).slice(0, 5);

      // recorremos las imagenes
      for (const img of listOfPhotos) {
        const photoName = await saveImg(img, 500);

        const insertedPhotoId = await insertImg(photoName, insertedPostId);

        images.push({
          id: insertedPhotoId,
          name: photoName,
        });
      }
    }

    // Enviamos una respuesta con status 201 y los datos del post creado (incluidas las imágenes que se han subido)
    res.status(201).send({
      status: "ok",
      data: {
        id: insertedPostId,
        titulo,
        categoria,
        lugar,
        entradilla,
        texto,
        idUsuario,
        images,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createPost;
