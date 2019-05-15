<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Book List
        <b-link href="#/add-Book">(Add Book)</b-link>
      </h2>
      <b-table striped hover :items="books" :fields="fields">
        <template slot="actions" scope="row">
          <b-btn size="sm" @click.stop="details(row.item)">Details</b-btn>
        </template>
      </b-table>
    </b-col>
  </b-row>
</template>

<script>
import gql from "graphql-tag";
import router from "../router";

const GET_BOOKS = gql`
  {
    books {
      id
      title
      author
    }
  }
`;

export default {
  name: "BookList",
  apollo: {
    books: {
      query: GET_BOOKS,
      pollInterval: 300
    }
  },
  data() {
    return {
      fields: {
        title: { label: "Title", sortable: true, class: "text-left" },
        author: { label: "Author", sortable: true, class: "text-left" },
        actions: { label: "Action", class: "text-center" }
      },
      books: []
    };
  },
  methods: {
    details(book) {
      router.push({ name: "ShowBook", params: { id: book.id } });
    }
  }
};
</script>

<style>
.table {
  width: 96%;
  margin: 0 auto;
}
</style>