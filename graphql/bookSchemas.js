var GraphQLSchema = require("graphql").GraphQLSchema;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLID = require("graphql").GraphQLID;
var GraphQLString = require("graphql").GraphQLString;
var GraphQLInt = require("graphql").GraphQLInt;
var GraphQLDate = require("graphql-date");
var BookModel = require("../models").Book;

var bookType = new GraphQLObjectType({
  name: "book",
  fields: function() {
    return {
      id: {
        type: GraphQLInt
      },
      isbn: {
        type: GraphQLString
      },
      title: {
        type: GraphQLString
      },
      author: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      },
      publishedYear: {
        type: GraphQLInt
      },
      publisher: {
        type: GraphQLString
      },
      createdAt: {
        type: GraphQLDate
      },
      updatedAt: {
        type: GraphQLDate
      }
    };
  }
});

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      books: {
        type: new GraphQLList(bookType),
        resolve: function () {
          const books = BookModel.findAll({
            order: [
              ['createdAt', 'DESC']
            ],
          })
          if (!books) {
            throw new Error('Error')
          }
          return books
        }
      },
      book: {
        type: bookType,
        args: {
          id: {
            name: 'id',
            type: GraphQLInt
          }
        },
        resolve: function (root, params) {
          const bookDetails = BookModel.findByPk(params.id)
          if (!bookDetails) {
            throw new Error('Error')
          }
          return bookDetails
        }
      }
    }
  }
});

var mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: function () {
    return {
      addBook: {
        type: bookType,
        args: {
          isbn: {
            type: new GraphQLNonNull(GraphQLString)
          },
          title: {
            type: new GraphQLNonNull(GraphQLString)
          },
          author: {
            type: new GraphQLNonNull(GraphQLString)
          },
          description: {
            type: new GraphQLNonNull(GraphQLString)
          },
          publishedYear: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          publisher: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: function (root, params) {
          const bookModel = new BookModel(params);
          const newBook = bookModel.save();
          if (!newBook) {
            throw new Error('Error');
          }
          return newBook
        }
      },
      updateBook: {
        type: bookType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLInt)
          },
          isbn: {
            type: new GraphQLNonNull(GraphQLString)
          },
          title: {
            type: new GraphQLNonNull(GraphQLString)
          },
          author: {
            type: new GraphQLNonNull(GraphQLString)
          },
          description: {
            type: new GraphQLNonNull(GraphQLString)
          },
          publishedYear: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          publisher: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(root, params) {
          return BookModel
          .findByPk(params.id)
          .then(book => {
            if (!book) {
              throw new Error('Not found');
            }
            return book
              .update({
                isbn: params.isbn || book.isbn,
                title: params.title || book.title,
                author: params.author || book.author,
                description: params.description || book.description,
                publishedYear: params.publishedYear || book.publishedYear,
                publisher: params.publisher || book.publisher,
              })
              .then(() => { return book; })
              .catch((error) => { throw new Error(error); });
          })
          .catch((error) => { throw new Error(error); });
        }
      },
      removeBook: {
        type: bookType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve(root, params) {
          return BookModel
          .findByPk(params.id)
          .then(book => {
            if (!book) {
              throw new Error('Not found');
            }
            return book
              .destroy()
              .then(() => { return book; })
              .catch((error) => { throw new Error(error); });
          })
          .catch((error) => { throw new Error(error); });
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({query: queryType, mutation: mutation});