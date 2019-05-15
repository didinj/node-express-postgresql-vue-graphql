import VueRouter from "vue-router";
import BookList from "@/components/BookList";
import ShowBook from "@/components/ShowBook";
import AddBook from "@/components/AddBook";
import EditBook from "@/components/EditBook";

export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "BookList",
      component: BookList
    },
    {
      path: "/show-book/:id",
      name: "ShowBook",
      component: ShowBook
    },
    {
      path: "/add-book",
      name: "AddBook",
      component: AddBook
    },
    {
      path: "/edit-book/:id",
      name: "EditBook",
      component: EditBook
    }
  ]
});
