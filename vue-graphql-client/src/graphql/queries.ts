import gql from 'graphql-tag';

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author
      publishedYear
    }
  }
`;

export const GET_BOOK = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      id
      title
      author
      publishedYear
    }
  }
`;
