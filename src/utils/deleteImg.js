const fs = require("fs/promises");
const path = require("path");

const deleteImg = async (imgName) => {
  const imgPath = path.join(
    __dirname,
    "..",
    "..",
    process.env.UPLOADS_DIR,
    imgName
  );

  try {
    // si el metodo access lanza un error, quiere decir que la imagen no existe
    await fs.access(imgPath);
  } catch {
    // si no existe, finalizamos la funcion
    return;
  }

  await fs.unlink(imgPath);
};

module.exports = deleteImg;
