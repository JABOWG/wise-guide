import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_QUESTION = gql`
  mutation saveQuestion($questionData: QuestionInput!) {
    saveQuestion(questionData: $questionData) {
      _id
      username
      email
      questionCount
      savedQuestions {
        questionId
        answer
        title
      }
    }
  }
`;

export const REMOVE_QUESTION = gql`
  mutation removeQuestion($questionId: ID!) {
    removeQuestion(questionId: $questionId) {
      _id
      username
      email
      questionCount
      savedQuestions {
        questionId
        answer
        title
      }
    }
  }
`;

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
