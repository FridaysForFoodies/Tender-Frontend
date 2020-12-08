import Vue from 'vue'
import App from './App.vue'
import router from './router';
import './assets/css/app.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart, faCog, faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
 
library.add(faHeart, faCog, faPlay)
 
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
