import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me {
    me {
      _id
      email
      username
      sessions {
        _id
      }
    }
  }
`;

export const GET_RECENT_SESSIONS = gql`
  query getRecentSession($limit: Int!) {
    recentSessions(limit: $limit) {
      _id
      messages {
        _id
        aiResponse
        userQuestion
      }
    }
  }
`;

export const GET_ALL_SESSIONS = gql`
  query getAllSessions {
    allSessions {
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
  query getSingleSession($sessionId: ID!) {
    session(sessionId: $sessionId) {
      _id
      messages {
        _id
        aiResponse
        userQuestion
      }
    }
  }
`;
