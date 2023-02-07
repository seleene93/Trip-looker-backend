const insertUser = require("./insertUser");
const insertImgUser = require("./insertImgUser");
const selectUserByEmail = require("./selectUserByEmail");
const selectUserByDni = require("./selectUserByDni");
const selectUserById = require("./selectUserById");
const selectImgByUserId = require("./selectImgByUserId");
const updateUser = require("./updateUser");
const updateUserImg = require("./updateUserImg");

module.exports = {
  insertUser,
  insertImgUser,
  selectUserByEmail,
  selectUserByDni,
  selectUserById,
  selectImgByUserId,
  updateUser,
  updateUserImg,
};
