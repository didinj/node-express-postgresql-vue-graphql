<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn color="primary" @click="router.push('/add')">Add New Book</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6" v-for="book in books" :key="book.id">
        <v-card>
          <v-card-title class="text-h6">{{ book.title }}</v-card-title>
          <v-card-subtitle>
            {{ book.author }} — {{ book.publishedYear }}
          </v-card-subtitle>
          <v-card-actions>
            <v-btn color="info" @click="router.push(`/edit/${book.id}`)">Edit</v-btn>
            <v-btn color="error" @click="deleteBook(book.id)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { GET_BOOKS } from '@/graphql/queries';
import { DELETE_BOOK } from '@/graphql/mutations';
import { useRouter } from 'vue-router';

const router = useRouter();
const books = ref<any[]>([]);
const { result, loading, refetch } = useQuery(GET_BOOKS);

watch(result, (res) => {
  if (res?.books) books.value = res.books;
});

const { mutate: deleteBookMutation } = useMutation(DELETE_BOOK);
const deleteBook = async (id: string) => {
  await deleteBookMutation({ id });
  await refetch();
};
</script>