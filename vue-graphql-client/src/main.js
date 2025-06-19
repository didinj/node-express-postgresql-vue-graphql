import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import ApolloPlugin from "./plugins/apollo";

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.use(ApolloPlugin);
app.mount("#app");
