import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store/store.js';
import './assets/css/app.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart, faCog, faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { createProvider } from './vue-apollo'
import VueApollo from "vue-apollo";
import ApolloClient from "apollo-boost";

// import { client } from '../appollo.config.js'
// const { client } = require('../appollo.config')
const client = process.env.VUE_APP_GRAPHQL_HTTP
require('dotenv').config()

library.add(faHeart, faCog, faPlay)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

const apolloClient = new ApolloClient({
  uri: client.service
});
Vue.use(VueApollo);
const apolloProvider = new VueApollo({ defaultClient: apolloClient });

new Vue({
  // apolloProvider: createProvider(),
  apolloProvider,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
