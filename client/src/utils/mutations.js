import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        email
        _id
        username
      }
    }
  }
`;

export const REMOVE_USER = gql`
  mutation removeUser {
    removeUser {
      _id
      email
      username
      sessions {
        _id
      }
    }
  }
`;

export const CREATE_SESSION = gql`
  mutation createSession {
    createSession {
      _id
      messages {
        _id
        aiResponse
        userQuestion
      }
    }
  }
`;

export const REMOVE_SESSION = gql`
  mutation removeSession($sessionId: ID!) {
    removeSession(sessionId: $sessionId) {
      _id
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation createMessage($sessionId: ID!, $userQuestion: String!) {
    createMessage(sessionId: $sessionId, userQuestion: $userQuestion) {
      _id
      aiResponse
      userQuestion
    }
  }
`;
