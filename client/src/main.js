import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(VueRouter)

const apolloClient = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

Vue.use(VueApollo);

new Vue({
  apolloProvider,
  router,
  render: h => h(App)
}).$mount('#app')
