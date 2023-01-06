const insertPost = require("./insertPost");
const insertImg = require("./insertImg");
const selectPostsFilter = require("./selectPostsFilter");
const deletePostById = require("./deletePostById");

module.exports = {
  selectPostsFilter,
  insertImg,
  insertPost,
  deletePostById,
};
