import { createRouter, createWebHistory } from 'vue-router';
import BookList from '@/views/BookList.vue';
import BookForm from '@/views/BookForm.vue';

const routes = [
    { path: '/', component: BookList },
    { path: '/add', component: BookForm },
    { path: '/edit/:id', component: BookForm, props: true }, // ✅ new
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
