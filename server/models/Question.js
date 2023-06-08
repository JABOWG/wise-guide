const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedQuestions` array in User.js
const questionSchema = new Schema({
  answer: {
    type: String,
    required: true,
  },
  questionId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = questionSchema;
