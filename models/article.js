var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  
  excerpt: {
    type: String
  },

  img:{
    type: String
  },

  link: {
    type: String,
    required: true
  },
  
  saved: {
    type: Boolean,
    default: false
  },

  comment: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article