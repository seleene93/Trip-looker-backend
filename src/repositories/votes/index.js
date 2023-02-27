const selectVotesDesc = require("./selectVotesDesc");
const selectVotesAsc = require("./selectVotesAsc");
const insertVote = require("./insertVote");
const selectPostVotes = require("./selectPostVotes");
const selectPositiveVoteIfExists = require("./selectPositiveVotes");
const selectNegativeVoteIfExists = require("./selectNegativeVotes");
const deleteVoteById = require("./deleteVoteById");

module.exports = {
  selectPositiveVoteIfExists,
  selectNegativeVoteIfExists,
  selectVotesDesc,
  selectVotesAsc,
  selectPostVotes,
  insertVote,
  deleteVoteById,
};
