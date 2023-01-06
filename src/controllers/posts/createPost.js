const { insertPost, insertImg } = require("../../repositories/posts");
const { createPostSchema } = require("../../schemas/posts");

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

    // Las imágenes que envía el cliente en la petición las vamos a recoger en req.files.images. Si el cliente no envía ninguna imagen,
    // req.files va a ser undefined. Creamos una variable "images" donde guardamos req.files.images, o en caso de que no haya ninguna imagen, un array vacío
    let images = req.files?.images || [];

    // Si el cliente solo envía una imagen, req.files.images va a ser un objeto en vez de un array. Si images no es un array (es decir, si es un objeto),
    // convertimos images a un array que tiene el objeto dentro. Esto lo hacemos para que el bucle que hacemos mas abajo no rompa (ya que no puedes recorrer un objeto con un for of)
    if (!Array.isArray(images)) {
      images = [images];
    }

    // Creamos un array "uploadedImages" donde guardaremos la información de las fotos que sube el cliente. Este array luego se lo mandaremos en la respuesta,
    // para que pueda ver los datos de las fotos que se han subido
    const uploadedImages = [];

    // Recorremos cada imagen del array de images
    for (const image of images) {
      // Insertamos la información de la imagen en la DB. El repositorio nos retorna el id de la imagen insertada
      const insertedImageId = await insertImg(
        image.name,
        image.data,
        insertedPostId
      );

      // Metemos en el array de "uploadedImages" un objeto con la información de la imagen guardada e insertada en la DB
      uploadedImages.push({
        id: insertedImageId,
        imageName: image.name,
        imageData: image.data,
      });
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
        images: uploadedImages,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createPost;
