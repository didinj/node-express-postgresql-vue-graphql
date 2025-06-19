const typeDefs = `
  type Book {
    id: ID!
    title: String!
    author: String!
    publishedYear: Int
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
  }

  type Mutation {
    createBook(title: String!, author: String!, publishedYear: Int): Book
    updateBook(id: ID!, title: String, author: String, publishedYear: Int): Book
    deleteBook(id: ID!): Boolean
  }
`;

module.exports = typeDefs;
