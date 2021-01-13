import gql from 'graphql-tag';

const GET_POPULAR_INGREDIENTS = gql`query Ingredient {
                                    popularIngredients(count: 5){
                                        ID,
                                        name
                                    }
                                }`;

const ingredientsStorage = {
    namespaced: true,
    state: {
        popularIngredients: [],
        selectedIngredients: []
    },
    getters: {
        popularIngredients: state => {
            return state.popularIngredients;
        },
        selectedIngredients: state  => {
            return state.selectedIngredients;
        }
    },
    mutations: {
        addToSelectedIngredients(state, ingredient) {
            state.selectedIngredients.push(ingredient);
            console.log(state.selectedIngredients);
        },
        removeFromSelectedIngredients(state, ingredient) {
            state.selectedIngredients.pop(ingredient);
            console.log(state.selectedIngredients);
        },
        addPopularIngredients(state, ingredients) {
            state.popularIngredients = ingredients;
            console.log(state.popularIngredients);
        }
    },
    actions: {
        async retrievePopularIngredients(context, apolloClient) {
            console.log(apolloClient);
            const response  = await apolloClient.query({ query: GET_POPULAR_INGREDIENTS });
            context.commit('addPopularIngredients', response.data.popularIngredients);
        },
        selectIngredients(context, ingredient) {
            context.commit('addToSelectedIngredients', ingredient);
        },
        deselectIngredients(context, ingredient) {
            context.commit('removeFromSelectedIngredients', ingredient);
        }
    }
}

export default ingredientsStorage;
