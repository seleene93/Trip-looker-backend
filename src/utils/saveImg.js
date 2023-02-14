const fs = require("fs/promises");
const path = require("path");
const sharp = require("sharp");
const { v4: uuid } = require("uuid");

const saveImg = async (img, width) => {
  const uploadsPath = path.join(__dirname, "..", "..", process.env.UPLOADS_DIR);

  try {
    // si el metodo access lanza un error, quiere decir que el directorio no existe
    await fs.access(uploadsPath);
  } catch {
    // creamos directorio
    await fs.mkdir(uploadsPath);
  }

  const sharpImg = sharp(img.data);

  sharpImg.resize(width);

  const imgName = `${uuid()}.jpg`;

  const imgPath = path.join(uploadsPath, imgName);

  await sharpImg.toFile(imgPath);

  return imgName;
};

module.exports = saveImg;
