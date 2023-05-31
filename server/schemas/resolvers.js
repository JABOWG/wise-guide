const { AuthenticationError } = require('apollo-server');
const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { askGPT } = require('../utils/chatGpt'); // Import the askGPT function
const { typeDefs } = require('./typeDefs');
const fetch = require('node-fetch'); // Import the fetch library

// create resolvers
// Resolvers are the actual implementation of the GraphQL schema
const resolvers = {
  Query: {
    user: async (parent, args, context, info) => {
      if (!context.user) throw new AuthenticationError('You need to be logged in!');
      return await User.findOne({ $or: [{ _id: args.id }, { username: args.username }] });
    },

    searchQuestion: async (_, { query }) => {
      try {
        const answer = await askGPT(query); // Use the imported function
        return answer; // Return the answer
      } catch (err) {
        console.error("Error in askGPT function: ", err);
        throw new Error('Failed to fetch answer data from the external API.');
        
      }
    },

    me: async (parent, args, context, info) => {
      if (!context.user) throw new AuthenticationError('You need to be logged in!');
      const currentUser = await User.findOne({ _id: context.user._id });
      return currentUser;
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },

    saveQuestion: async (parent, { questionData }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedQuestions: questionData } },
          { new: true, runValidators: true }
        );

        if (!updatedUser) {
          throw new Error("Couldn't update the user");
        }

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    removeQuestion: async (parent, { questionId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedQuestions: { questionId } } },
          { new: true }
        );

        if (!updatedUser) {
          throw new AuthenticationError("Couldn't find user with this id!");
        }

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
