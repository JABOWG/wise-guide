const { Schema } = require("mongoose");

const messageSchema = new Schema(
  {
    // This will contains the message asked by the user
    userQuestion: {
      type: String,
      required: true,
    },
    // This will contains the response to the userQuestioon from the ai API call
    aiResponse: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = messageSchema;
