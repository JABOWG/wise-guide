import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me {
    me {
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

export const SEARCH_QUESTIONS = gql`
  query SearchQuestions($query: String!) {
    searchQuestions(query: $query) {
      questionId
      answer
      title
    }
  }
`;
