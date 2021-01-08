import {LIKE_CATEGORY_ITEM} from "@/store/mutation-types";
import gql from 'graphql-tag';

const GET_TAGS = gql`query Tag {
                        findTags(take: 20) {
                            id,
                            name, 
                            imagePath
                        }
                    }`;

const tagsStorage = {
    namespaced: true,
    state: {
        count: 0,
        isAuthenticated: false,
        authenticationToken: null,
        likedTags: [],
        completedCategories: [],
        tenderTags: [],
        finishedTags: [],
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
            return state.tags;
        },
        finishedCategories: state => {
            return state.completedCategories;
        },
        tags: state => {
            return state.tags;
        },
        tenderTags: state => {
            return state.tenderTags;
        },
        likedTags: state => {
            return state.likedTags;
        }
    },
    mutations: {
        [LIKE_CATEGORY_ITEM](state, category, subcategory) {
            let tagIndex = state.tags.findIndex(tag => tag.category === category);
            let itemIndex = state.tags[tagIndex].items.findIndex(item => item.id === subcategory.id);
            state.tags[tagIndex].items[itemIndex].liked = true;
        },

        addTagToLikedTags(state, tag) {
            // push liked tag to likedTags array
            state.likedTags.push(tag);
        },

        removeCategoryFromTags(state, category) {
            state.tags.splice(state.tags.indexOf(category), 1);
        },

        addCategoryToCompletedCategories(state, category) {
            // push liked tag to likedTags array
            state.completedCategories.push(category);
        },
        addTags(state, tags) {
            state.tenderTags = tags
            // [{ id: 0, category: 'one', items: tags }];
            console.log("these are the tags");
            console.log(state.tenderTags);
        }
    },
    actions: {
        // Instead of mutating the state, actions commit mutations.
        // Actions can contain arbitrary >> asynchronous operations << . --> APOLLO Stuff goes in here :)
        async findTags(context, apolloClient) {
            console.log(apolloClient);
            const response  = await apolloClient.query({ query: GET_TAGS });
            context.commit('addTags', response.data.findTags);
        },
        likeTenderTag(context, tag) {
            context.commit('addTagToLikedTags', tag);
        }


    }
}

export default tagsStorage;
