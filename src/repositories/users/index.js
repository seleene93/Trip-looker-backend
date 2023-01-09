const insertUser = require("./insertUser");
const selectUserByEmail = require("./selectUserByEmail");
const selectUserByDni = require("./selectUserByDni");
const selectUserById = require("./selectUserById");
const updateUser = require("./updateUser");

module.exports = {
  insertUser,
  selectUserByEmail,
  selectUserByDni,
  selectUserById,
  updateUser,
};
