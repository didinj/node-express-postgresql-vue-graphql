const { Book } = require('../models');

module.exports = {
  Query: {
    books: () => Book.findAll(),
    book: (_, { id }) => Book.findByPk(id),
  },
  Mutation: {
    createBook: (_, args) => Book.create(args),
    updateBook: async (_, { id, ...rest }) => {
      await Book.update(rest, { where: { id } });
      return Book.findByPk(id);
    },
    deleteBook: async (_, { id }) => {
      const deleted = await Book.destroy({ where: { id } });
      return deleted > 0;
    },
  },
};
