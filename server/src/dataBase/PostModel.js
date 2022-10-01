const {Schema, model} = require('mongoose')

const postSchema = new Schema(
  {
    title: {
      type: String,
      require: true
    },
    content: {
      type: String,
      require: true
    },
  },
);

module.exports = model('Post', postSchema)
