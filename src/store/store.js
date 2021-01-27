import Vue from 'vue'
import Vuex from 'vuex'

import userStorage from './modules/user.js'
import tagsStorage from './modules/tags.js'
import settingsStorage from "./modules/settings.js";
import ingredientsStorage from './modules/ingredients.js'
import splashscreenStorage from './modules/splashscreen.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        userStorage: userStorage,
        tagsStorage: tagsStorage,
        settingsStorage: settingsStorage,
        ingredientsStorage: ingredientsStorage,
        splashscreenStorage: splashscreenStorage
    }
})

export default store