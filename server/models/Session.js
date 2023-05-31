const { Schema, model } = require("mongoose");

// import message schema from Message.js
const messageSchema = require("./Message");

const sessionSchema = new Schema(
  {
    // The 'messages' array contains all the messages in a single session
    // It references the 'message' schema as there is no separate 'message' model
    messages: [messageSchema],
  },
  {
    timestamps: true,
  }
);

const Session = model("Session", sessionSchema);

module.exports = Session;
