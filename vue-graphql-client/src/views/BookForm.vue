<template>
  <v-container>
    <v-form @submit.prevent="submit" ref="formRef">
      <v-text-field
        v-model="title"
        label="Title"
        required
      />
      <v-text-field
        v-model="author"
        label="Author"
        required
      />
      <v-text-field
        v-model.number="publishedYear"
        label="Published Year"
        type="number"
      />
      <v-btn type="submit" color="primary">
        {{ isEdit ? 'Update' : 'Add' }} Book
      </v-btn>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { GET_BOOK } from '@/graphql/queries';
import { CREATE_BOOK, UPDATE_BOOK } from '@/graphql/mutations';

const title = ref('');
const author = ref('');
const publishedYear = ref<number | null>(null);
const formRef = ref();

const route = useRoute();
const router = useRouter();
const id = route.params.id as string | undefined;
const isEdit = computed(() => !!id);

if (isEdit.value) {
  const { result } = useQuery(GET_BOOK, { id });
  watch(result, (res) => {
    if (res?.book) {
      title.value = res.book.title;
      author.value = res.book.author;
      publishedYear.value = res.book.publishedYear;
    }
  });
}

const { mutate: createBook } = useMutation(CREATE_BOOK);
const { mutate: updateBook } = useMutation(UPDATE_BOOK);

const submit = async () => {
  if (isEdit.value) {
    await updateBook({ id, title: title.value, author: author.value, publishedYear: publishedYear.value });
  } else {
    await createBook({ title: title.value, author: author.value, publishedYear: publishedYear.value });
  }

  router.push('/');
};
</script>
