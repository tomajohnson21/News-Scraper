var mongoose = require("mongoose");

var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var CommentSchema = new Schema({
  // `body` is of type String
  body: {
    type: String,
    required: true
  },

  author: {
      type: String,
      default: "Anonymous"
  }
});

// This creates our model from the above schema, using mongoose's model method
var Comment = mongoose.model("Comment", CommentSchema);

// Export the Note model
module.exports = Comment;