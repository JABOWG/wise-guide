const { gql } = require('apollo-server-express');

// create type definitions
// typeDefs is a template literal tag, so it will be parsed into an abstract syntax tree
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    questionCount: Int
    savedQuestions: [Question]
  }

  type Question {
    _id: ID
    answer: String
    title: String
  }

  type SavedQuestion {
    _id: ID
    answer: [String]
    title: String
  }

  input QuestionInput {
    answer: String
    title: String
  }

  type Auth {
    token: String!
    user: User
  }

  type Query {
    me: User
    user(username: String, id: ID): User
    searchQuestion(query: String!): Question
    searchSavedQuestion(query: String!): [SavedQuestion]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveQuestion(questionData: QuestionInput!): User
    removeQuestion(userId: ID, questionId: ID): User
  }
`;

module.exports = typeDefs;
