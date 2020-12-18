import Vue from 'vue'
import Vuex from 'vuex'
import { LIKE_CATEGORY_ITEM } from './mutation-types.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
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
            // returns all elements in tags array, where all items in items array have not been liked yet
            return state.tags.filter(tag => tag.items.every(item => item.liked === false));
        },
        finishedCategories: state => {
          const allCategories = state.tags.length;

          return allCategories - state.tags.filter(tag => tag.items.every(item => item.liked === false)).length; 
        }
    },
    mutations: {
      // !!! Mutations Must Be Synchronous

      [LIKE_CATEGORY_ITEM](state, category, subcategory) {
        let tagIndex = state.tags.findIndex(tag => tag.category === category);
        let itemIndex = state.tags[tagIndex].items.findIndex(item => item.id === subcategory.id);
        state.tags[tagIndex].items[itemIndex].liked = true;
      }
    }, 
    actions: {
      // Instead of mutating the state, actions commit mutations.
      // Actions can contain arbitrary >> asynchronous operations << . --> AXIOS Stuff goes in here :)   
    }
  })

  export default store