const { AuthenticationError } = require('apollo-server');
const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { askGPT } = require('../utils/chatGpt');
const fetch = require('node-fetch');
require('dotenv').config();

const OPENAI_API_KEY = process.env.CHATKEY;

const resolvers = {
  Query: {
    user: async (parent, args, context, info) => {
      if (!context.user) throw new AuthenticationError('You need to be logged in!');
      return await User.findOne({ $or: [{ _id: args.id }, { username: args.username }] });
    },

    searchQuestion: async (_, { query }) => {
      try {
        console.log('Search query:', query);

        const response = await askGPT(query);
        console.log('askGPT response:', response);

        if (response) {
          const answer = response.answer;
          console.log('Answer:', answer);
          return { answer };
        } else {
          throw new Error('Failed to fetch answer data from the external API.');
        }
      } catch (err) {
        console.error('Error in searchQuestion resolver: ', err);
        throw new Error('Failed to fetch data from the external API.');
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
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
   
      try {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedQuestions: { _id: questionId } } },
          { new: true }
        );
   
        if (!user) {
          throw new Error("Couldn't find user with this id!");
        }
   
        return user;
      } catch (err) {
        console.error('Error in removeQuestion resolver: ', err);
        throw new Error('Failed to remove the question.');
      }
    },
  }, // <-- Add closing brace here
};

module.exports = resolvers;