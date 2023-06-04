const { AuthenticationError } = require("apollo-server");
const { Types } = require("mongoose");
const { User, Session } = require("../models");
const { signToken } = require("../utils/auth");
const { askGPT } = require("../utils/chatGpt"); // Import the askGPT function

// create resolvers
// Resolvers are the actual implementation of the GraphQL schema
const resolvers = {
  Query: {
    // Resolver for fetching the currently logged-in user
    me: async (parent, args, context) => {
      // Check if the user is authenticated
      if (!context.user)
        throw new AuthenticationError("You need to be logged in!");

      // Fetch the current user and populate their sessions and messages
      const currentUser = await User.findOne({
        _id: context.user._id,
      }).populate({
        path: "sessions",
        populate: { path: "messages" },
      });

      return currentUser;
    },

    // Resolver for fetching all users
    getAllUsers: async () => {
      try {
        // Fetch all users and populate their sessions and messages
        const users = await User.find().populate({
          path: "sessions",
          populate: { path: "messages" },
        });
        return users;
      } catch (error) {
        throw new Error("Failed to fetch users");
      }
    },

    // Resolver for fetching a user by ID
    getUser: async (parent, { userId }) => {
      try {
        // Fetch the user by ID and populate their sessions and messages
        const user = await User.findById(userId).populate({
          path: "sessions",
          populate: { path: "messages" },
        });
        return user;
      } catch (error) {
        throw new Error("Failed to fetch user");
      }
    },

    // Resolver for fetching a user's recent sessions
    recentSessions: async (parent, { limit }, context) => {
      try {
        // Check if the user is authenticated
        if (!context.user) {
          throw new AuthenticationError("You need to be logged in!");
        }

        // Fetch the authenticated user and populate their sessions with only the first message
        const user = await User.findById(context.user._id).populate({
          path: "sessions",
          options: { sort: { updatedAt: -1 }, limit }, // Sort by updatedAt field in descending order and apply the limit
          populate: {
            path: "messages",
            perDocumentLimit: 1, // Limit to only the first message
          },
        });

        return user.sessions;
      } catch (error) {
        throw new Error("Failed to fetch sessions");
      }
    },

    // Resolver for fetching all of a user's sessions
    allSessions: async (parent, args, context) => {
      try {
        // Check if the user is authenticated
        if (!context.user) {
          throw new AuthenticationError("You need to be logged in!");
        }

        // Fetch the authenticated user and populate their sessions with only the first message
        const user = await User.findById(context.user._id).populate({
          path: "sessions",
          options: { sort: { updatedAt: -1 } }, // Sort by updatedAt field in descending order
          populate: {
            path: "messages",
            perDocumentLimit: 1, // Limit to only the first message
          },
        });

        return user.sessions;
      } catch (error) {
        throw new Error("Failed to fetch sessions");
      }
    },

    // Resolver for fetching a user's session by the sessions ID
    session: async (parent, { sessionId }, context) => {
      try {
        // Check if the user is authenticated
        if (!context.user) {
          throw new AuthenticationError("You need to be logged in!");
        }

        // Find the user with the specified ID and ensure they have the session
        const user = await User.findOne({
          _id: context.user._id,
          sessions: { $in: [sessionId] },
        });
        if (!user) {
          throw new Error("User with Session not found");
        }

        // Fetch the session by ID and populate its messages
        const session = await Session.findById(sessionId).populate({
          path: "messages",
        });
        if (!session) {
          throw new Error("Session not found");
        }

        return session;
      } catch (error) {
        throw new Error("Failed to fetch session");
      }
    },
  },

  Mutation: {
    // Resolver for user login
    login: async (parent, { email, password }) => {
      // Find the user by email and populate their sessions and messages
      const user = await User.findOne({ email }).populate({
        path: "sessions",
        populate: { path: "messages" },
      });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      // Check if the password is correct
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      // Generate a token for authentication
      const token = signToken(user);
      return { token, user };
    },

    // Resolver for creating a new user
    addUser: async (parent, { username, email, password }) => {
      try {
        // Create a new user and generate a token for authentication
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.log(error);
        throw new Error("Failed to create user");
      }
    },

    // Resolver for removing a user
    removeUser: async (parent, args, context) => {
      try {
        // Check if the user is authenticated
        if (!context.user) {
          throw new AuthenticationError("You need to be logged in!");
        }

        // Find the authenticated user
        const user = await User.findOne({ _id: context.user._id });
        if (!user) {
          throw new Error("User not found");
        }

        // Remove all sessions associated with the authenticated user
        await Session.deleteMany({ _id: { $in: user.sessions } });

        // Pull the deleted sessions from the user's sessions array
        user.sessions.pull(...user.sessions);

        // Save the updated user object
        await user.save();

        // Remove the user
        const deletedUser = await User.findOneAndDelete({
          _id: context.user._id,
        });
        return deletedUser;
      } catch (error) {
        throw new Error("Failed to remove user");
      }
    },

    // Resolver for creating a new session
    createSession: async (parent, args, context) => {
      try {
        // Check if the user is authenticated
        if (!context.user) {
          throw new AuthenticationError("You need to be logged in!");
        }

        // Find the user by ID
        const user = await User.findOne({
          _id: context.user._id,
        });
        if (!user) {
          throw new Error("User not found");
        }

        // Create a new session and associate it with the user
        const session = new Session({ messages: [] });
        user.sessions.push(session);

        await user.save();
        await session.save();
        return session;
      } catch (error) {
        throw new Error("Failed to create session");
      }
    },

    // Resolver for removing a session
    removeSession: async (parent, { sessionId }, context) => {
      try {
        // Check if the user is authenticated
        if (!context.user) {
          throw new AuthenticationError("You need to be logged in!");
        }

        // Find the user with the specified ID and ensure they have the session we are trying to remove
        const user = await User.findOne({
          _id: context.user._id,
          sessions: { $in: [sessionId] },
        });
        if (!user) {
          throw new Error("User with Session not found");
        }

        // Remove the session from the User's sessions array
        user.sessions.pull(sessionId);
        await user.save();

        // Remove the session from the Session collection
        const session = await Session.findByIdAndRemove(sessionId);
        if (!session) {
          throw new Error("Session not found");
        }

        return session;
      } catch (error) {
        throw new Error("Failed to remove session");
      }
    },

    // Resolver for creating a new message in a session
    createMessage: async (parent, { sessionId, userQuestion }, context) => {
      try {
        // Check if the user is authenticated
        if (!context.user) {
          throw new AuthenticationError("You need to be logged in!");
        }

        // Find the user with the specified ID and ensure they have the session we are trying to add messages to
        const user = await User.findOne({
          _id: context.user._id,
          sessions: { $in: [sessionId] },
        });
        if (!user) {
          throw new Error("User with Session not found");
        }

        // Find the session by ID
        const session = await Session.findById(sessionId);
        if (!session) {
          throw new Error("Session not found");
        }

        // Ask GPT for an AI response
        const { answer } = await askGPT(userQuestion);
        console.log("\nGPT Response:", answer);

        // Create a new message object with the users question and the ai's response
        const message = {
          _id: new Types.ObjectId(),
          userQuestion,
          aiResponse: answer,
        };

        // Initialize session.messages array if it doesn't exist
        if (!session.messages) {
          session.messages = [];
        }

        // Push the new message to the session's messages array
        session.messages.push(message);
        await session.save();

        return message;
      } catch (error) {
        console.error(error); // Log the error for debugging
        throw new Error("Failed to create message");
      }
    },
  },
};

module.exports = resolvers;
