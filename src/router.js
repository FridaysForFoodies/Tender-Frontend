import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home'
import Favourites from './views/Favourites'
import Settings from  './views/Settings'
import FoodTender from  './views/FoodTender'


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
    }
]
})

export default router