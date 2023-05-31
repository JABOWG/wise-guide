const { Schema, model, Types } = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      validate: {
        // ensures that the username is not empty
        validator: (value) => value.trim().length > 0,
        message: "Username cannot be empty",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        // ensures the inputted email is valid
        validator: validator.isEmail,
        message: "Must use a valid email address",
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          // ensures the passord is more than 8 characters and contains a special character
          return value.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/.test(value);
        },
        message:
          "Password must be at least 8 characters long and contain a special character",
      },
    },
    // set the users saved sessions to be an array of data that adheres to the sessionSchema
    sessions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Session",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// ---------- MIDDLEWARE ----------

// encrypts/hashes the user's inputted password using the bcrypt library
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// ---------- SCHEMA METHODS ----------

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
