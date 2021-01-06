import Vue from 'vue'
import Vuex from 'vuex'
import { LIKE_CATEGORY_ITEM } from './mutation-types.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      settingsVegetarian: false,
      settingsVegan: false,
      settingsGluten: false,
      settingsDairy: false,
      count: 0,
      tags: [
        {
        id: 1,
        category: 'cuisine',
        items: [
          {id: 1, title: 'Japanese', liked: false},
          {id: 2, title: 'Italian', liked: false},
          {id: 3, title: 'German', liked: false},
          {id: 4, title: 'Indian', liked: false},
        ]},
        {
        id: 2,
        category: 'flavour',
        items: [
          {id: 1, title: 'sweet', liked: false},
          {id: 2, title: 'spicy', liked: false},
          {id: 3, title: 'salty', liked: false},
        ]},
        {
        id: 3,
        category: 'carbs',
        items: [
          {id: 1, title: 'potatoe', liked: false},
          {id: 2, title: 'pasta', liked: false},
          {id: 3, title: 'bread', liked: false},
        ]},
        {
        id: 4,
        category: 'season',
        items: [
          {id: 1, title: 'summer', liked: false},
          {id: 2, title: 'winter', liked: false},
          {id: 3, title: 'spring', liked: false},
          {id: 4, title: 'autumn', liked: false},
        ]},
        {
        id: 5,
        category: 'diet',
        items: [
          {id: 1, title: 'low carb', liked: false},
          {id: 2, title: 'protein boost', liked: false},
          {id: 3, title: 'low fat', liked: false},
          {id: 4, title: 'autumn', liked: false},
        ]}
      ]
    },
    getters: {
        openCategories: state => {
            return state.tags.filter(tag => tag.items.every(item => item.liked === false));
        },
        finishedCategories: state => {
          return state.tags.length - state.tags.filter(tag => tag.items.every(item => item.liked === false)).length;
        }
    },
    mutations: {
      [LIKE_CATEGORY_ITEM](state, category, subcategory) {
        let tagIndex = state.tags.findIndex(tag => tag.category === category);
        let itemIndex = state.tags[tagIndex].items.findIndex(item => item.id === subcategory.id);
        state.tags[tagIndex].items[itemIndex].liked = true;
      },
      updateSettings(state, newValuesArray) {
        state.settingsVegetarian = newValuesArray[0]
        state.settingsVegan = newValuesArray[1]
        state.settingsGluten = newValuesArray[2]
        state.settingsDairy = newValuesArray[3]
      }
    },
    actions: {
      // Instead of mutating the state, actions commit mutations.

      // Actions can contain arbitrary >> asynchronous operations << . --> APOLLO Stuff goes in here :)

    }
  })

  export default store