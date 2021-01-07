import Vue from 'vue'
import Vuex from 'vuex'

import userStorage from './modules/user.js'
import tagsStorage from './modules/tags.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
      userStorage: userStorage,
      tagsStorage: tagsStorage
    }
  })

export default store