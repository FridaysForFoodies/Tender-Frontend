import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store/store.js';
import './assets/css/app.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart, faCog, faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createProvider } from './vue-apollo'
require('dotenv').config()

library.add(faHeart, faCog, faPlay)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
// Vue.prototype.$apolloProvider = createProvider() --> evtl. globaler provider

new Vue({
  apolloProvider: createProvider(),
  router,
  store,
  render: h => h(App)
}).$mount('#app')
