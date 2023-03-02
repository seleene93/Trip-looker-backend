const insertPost = require("./insertPost");
const insertImg = require("./insertImg");
const insertComent = require("./insertComent");
const selectPostsFilter = require("./selectPostsFilter");
const selectPostById = require("./selectPostById");
const selectPostsByIdUser = require("./selectPostsByIdUser");
const deletePostById = require("./deletePostById");

module.exports = {
  selectPostsFilter,
  selectPostById,
  selectPostsByIdUser,
  insertImg,
  insertPost,
  insertComent,
  deletePostById,
};
