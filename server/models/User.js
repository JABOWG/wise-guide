<<<<<<< HEAD
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from Book.js
const questionSchema = require('./Question');
=======
const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

// import session schema from Session.js
const sessionSchema = require("./Session");
>>>>>>> 5fedffd610bd081f0c32cb6a246e92c20e1afd54

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
<<<<<<< HEAD
=======
      validate: {
        // ensures that the username is not empty
        validator: (value) => value.trim().length > 0,
        message: "Username cannot be empty",
      },
>>>>>>> 5fedffd610bd081f0c32cb6a246e92c20e1afd54
    },
    email: {
      type: String,
      required: true,
      unique: true,
<<<<<<< HEAD
      match: [/.+@.+\..+/, 'Must use a valid email address'],
=======
      validate: {
        // ensures the inputted email is valid
        validator: validator.isEmail,
        message: "Must use a valid email address",
      },
>>>>>>> 5fedffd610bd081f0c32cb6a246e92c20e1afd54
    },
    password: {
      type: String,
      required: true,
<<<<<<< HEAD
    },
    // set savedBooks to be an array of data that adheres to the bookSchema
    savedQuestion: [questionSchema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
=======
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
    sessions: [sessionSchema],
  },
  {
    timestamps: true,
  }
);

// ---------- MIDDLEWARE ----------

// encrypts/hashes the user's inputted password using the bcrypt library
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
>>>>>>> 5fedffd610bd081f0c32cb6a246e92c20e1afd54
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

<<<<<<< HEAD
=======
// ---------- SCHEMA METHODS ----------

>>>>>>> 5fedffd610bd081f0c32cb6a246e92c20e1afd54
// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

<<<<<<< HEAD
// when we query a user, we'll also get another field called `bookCount` with the number of saved books we have
userSchema.virtual('questionCount').get(function () {
  return this.savedQuestion.length;
});

const User = model('User', userSchema);
=======
const User = model("User", userSchema);
>>>>>>> 5fedffd610bd081f0c32cb6a246e92c20e1afd54

module.exports = User;
