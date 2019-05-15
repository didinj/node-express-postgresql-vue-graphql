<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Add Book
        <b-link href="#/">(Book List)</b-link>
      </h2>
      <b-jumbotron>
        <b-form @submit="onSubmit">
          <b-form-group
            id="fieldsetHorizontal"
            horizontal
            :label-cols="4"
            breakpoint="md"
            label="Enter ISBN"
          >
            <b-form-input id="isbn" v-model.trim="book.isbn"></b-form-input>
          </b-form-group>
          <b-form-group
            id="fieldsetHorizontal"
            horizontal
            :label-cols="4"
            breakpoint="md"
            label="Enter Title"
          >
            <b-form-input id="title" v-model.trim="book.title"></b-form-input>
          </b-form-group>
          <b-form-group
            id="fieldsetHorizontal"
            horizontal
            :label-cols="4"
            breakpoint="md"
            label="Enter Author"
          >
            <b-form-input id="author" v-model.trim="book.author"></b-form-input>
          </b-form-group>
          <b-form-group
            id="fieldsetHorizontal"
            horizontal
            :label-cols="4"
            breakpoint="md"
            label="Enter Description"
          >
            <b-form-textarea
              id="description"
              v-model="book.description"
              placeholder="Enter something"
              :rows="2"
              :max-rows="6"
            >{{book.description}}</b-form-textarea>
          </b-form-group>
          <b-form-group
            id="fieldsetHorizontal"
            horizontal
            :label-cols="4"
            breakpoint="md"
            label="Enter Publisher"
          >
            <b-form-input id="publisher" v-model.trim="book.publisher"></b-form-input>
          </b-form-group>
          <b-form-group
            id="fieldsetHorizontal"
            horizontal
            :label-cols="4"
            breakpoint="md"
            label="Enter Published Year"
          >
            <b-form-input type="number" id="publishedYear" v-model.trim="book.publishedYear"></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Save</b-button>
        </b-form>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>
import gql from "graphql-tag";
import router from "../router";

const ADD_BOOK = gql`
  mutation AddBook(
    $isbn: String!
    $title: String!
    $author: String!
    $description: String!
    $publisher: String!
    $publishedYear: Int!
  ) {
    addBook(
      isbn: $isbn
      title: $title
      author: $author
      description: $description
      publisher: $publisher
      publishedYear: $publishedYear
    ) {
      id
    }
  }
`;

export default {
  name: "AddBook",
  data() {
    return {
      book: {}
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();

      this.$apollo
        .mutate({
          mutation: ADD_BOOK,
          variables: {
            isbn: this.book.isbn,
            title: this.book.title,
            author: this.book.author,
            description: this.book.description,
            publisher: this.book.publisher,
            publishedYear: parseInt(this.book.publishedYear)
          }
        })
        .then(data => {
          console.log(data);
          router.push({ name: "BookList" });
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
</style>