const insertPost = require("./insertPost");
const insertImg = require("./insertImg");
const insertComent = require("./insertComent");
const selectPostsFilter = require("./selectPostsFilter");
const deletePostById = require("./deletePostById");

module.exports = {
  selectPostsFilter,
  insertImg,
  insertPost,
  insertComent,
  deletePostById,
};
