<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Book List
        <b-link href="#/">(Book List)</b-link>
      </h2>
      <b-jumbotron>
        <template slot="header">{{book.title}}</template>
        <template slot="lead">
          ISBN: {{book.isbn}}
          <br>
          Author: {{book.author}}
          <br>
          Description: {{book.description}}
          <br>
          Published Year: {{book.publishedYear}}
          <br>
          Publisher: {{book.publisher}}
          <br>
          Update At: {{book.updatedAt}}
          <br>
        </template>
        <hr class="my-4">
        <b-btn class="edit-btn" variant="success" @click.stop="editBook(book.id)">Edit</b-btn>
        <b-btn variant="danger" @click.stop="deleteBook(book.id)">Delete</b-btn>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>
import gql from "graphql-tag";
import router from "../router";

const GET_BOOK = gql`
  query book($bookId: Int) {
    book(id: $bookId) {
      id
      isbn
      title
      author
      description
      publishedYear
      publisher
      updatedAt
    }
  }
`;

const DELETE_BOOK = gql`
  mutation removeBook($id: Int!) {
    removeBook(id: $id) {
      id
    }
  }
`;

export default {
  name: "ShowBook",
  data() {
    return {
      book: '',
      bookId: parseInt(this.$route.params.id)
    };
  },
  apollo: {
    book: {
      query: GET_BOOK,
      pollInterval: 300,
      variables() {
        return {
          bookId: this.bookId
        };
      }
    }
  },
  methods: {
    editBook(id) {
      router.push({
        name: "EditBook",
        params: { id: id }
      });
    },
    deleteBook(id) {
      this.$apollo
        .mutate({
          mutation: DELETE_BOOK,
          variables: {
            id: id
          }
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style>
.jumbotron {
  padding: 2rem;
}
.edit-btn {
  margin-right: 20px;
  width: 70px;
}
</style>