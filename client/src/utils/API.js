import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem('token') || "",
  },
});

export const getMe = async () => {
  const { data } = await client.query({
    query: gql`
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
    `,
  });
  return data.me;
};

export const createUser = async (userData) => {
  const { data } = await client.mutate({
    mutation: gql`
      mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
          token
          user {
            _id
          }
        }
      }
    `,
    variables: userData,
  });
  return data.addUser;
};

export const loginUser = async (userData) => {
  const { data } = await client.mutate({
    mutation: gql`
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
          user {
            _id
            username
          }
        }
      }
    `,
    variables: userData,
  });
  return data.login;
};

export const saveQuestion = async (questionData) => {
  const { data } = await client.mutate({
    mutation: gql`
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
    `,
    variables: { questionData },
  });
  return data.saveQuestion;
};

export const deleteQuestion = async (userId, questionId) => {
  const { data } = await client.mutate({
    mutation: gql`
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
    `,
    variables: { userId, questionId },
  });
  return data.removeQuestion;
};

export const searchQuestions = async (query) => {
};
