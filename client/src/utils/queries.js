import { gql } from '@apollo/client';

// Here we define the queries we will be sending to the GraphQL server
export const GET_ME = gql`
  query me {
    me {
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

export const SEARCH_QUESTIONS = gql`
  query SearchQuestion($query: String!) {
    searchQuestion(query: $query) {
      _id
      answer
      title
    }
  }
`;
