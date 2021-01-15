import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home'
import Favourites from './views/Favourites'
import Settings from  './views/Settings'
import FoodTender from  './views/FoodTender'
import Recipes from  './views/Recipes'
import Recipe from  './views/Recipe'


Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
    {
        path: '/',
        name: 'Home',
        component: Home

    },
    {
        path: '/favourites',
        name: 'Favourites',
        component: Favourites
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings
    },
    {
        path: '/food-tender',
        name: 'FoodTender',
        component: FoodTender
    },
    {
        path: '/recipes',
        name: 'Recipes',
        component: Recipes
    },
    {
        path: '/recipe',
        name: 'Recipe',
        component: Recipe
    }
]
})

export default router