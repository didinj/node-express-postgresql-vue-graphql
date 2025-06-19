import gql from 'graphql-tag';

export const CREATE_BOOK = gql`
  mutation CreateBook($title: String!, $author: String!, $publishedYear: Int) {
    createBook(title: $title, author: $author, publishedYear: $publishedYear) {
      id
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $title: String, $author: String, $publishedYear: Int) {
    updateBook(id: $id, title: $title, author: $author, publishedYear: $publishedYear) {
      id
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id)
  }
`;
