const { gql } = require("apollo-server-express");

// create type definitions
// typeDefs is a template literal tag, so it will be parsed into an abstract syntax tree
const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    sessions: [Session!]!
  }

  type Session {
    _id: ID!
    messages: [Message!]!
    updatedAt: String!
  }

  type Message {
    _id: ID!
    userQuestion: String!
    aiResponse: String!
  }

  type Auth {
    token: String!
    user: User
  }

  type Query {
    me: User
    getAllUsers: [User!]!
    getUser(userId: ID!): User
    recentSessions(limit: Int!): [Session!]!
    allSessions: [Session!]!
    session(sessionId: ID!): Session
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    removeUser: User
    createSession: Session
    removeSession(sessionId: ID!): Session
    createMessage(sessionId: ID!, userQuestion: String!): Message
  }
`;

module.exports = typeDefs;
