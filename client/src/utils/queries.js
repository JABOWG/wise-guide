import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me {
    me {
      _id
      email
      username
      sessions {
        _id
        messages {
          _id
          aiResponse
          userQuestion
        }
      }
    }
  }
`;

export const GET_ALL_SESSIONS = gql`
  query GetAllSessions {
    getAllSessions {
      _id
      messages {
        _id
        aiResponse
        userQuestion
      }
    }
  }
`;

export const GET_SESSION = gql`
  query getSession($sessionId: ID!) {
    getSession(sessionId: $sessionId) {
      _id
      messages {
        _id
        aiResponse
        userQuestion
      }
    }
  }
`;