import { gql } from '@apollo/client';

// Here we define the mutations we will be sending to the GraphQL server
// The login mutation accepts an email and password as parameters
// The mutation returns an Auth type, which includes a token and a user object
export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// ADD_USER mutation is responsible for allowing users to create an account
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const SEARCH_QUESTIONS = gql`
  query SearchQuestion($query: String!) {
    searchQuestion(query: $query) {
      _id
      answer
      title
    }
  }
`;

// THE SAVE_QUESTION mutation is responsible for allowing logged in users to save a question to their account
export const SAVE_QUESTION = gql`
  mutation SaveQuestion($questionData: QuestionInput!) {
    saveQuestion(questionData: $questionData) {
      _id
      username
      email
      questionCount
      savedQuestions {
        _id
        answer
        title
      }
    }
  }
`;

// DELETE_QUESTION mutation is responsible for allowing logged in users to remove a Question from their account
export const REMOVE_QUESTION = gql`
  mutation RemoveQuestion($userId: ID, $questionId: ID) {
    removeQuestion(userId: $userId, questionId: $questionId) {
      _id
      username
      email
      questionCount
      savedQuestions {
        _id
        answer
        title
      }
    }
  }
`;
