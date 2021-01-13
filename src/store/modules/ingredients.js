import gql from 'graphql-tag';

const GET_POPULAR_INGREDIENTS = gql`query Ingredient {
                                    popularIngredients(count: $count){
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
        addIngredients(state, ingredients) {
            state.ingredients = ingredients;
        }
    },
    actions: {
        async retrieveIngredients(context, apolloClient) {
            console.log(apolloClient);
            const response  = await apolloClient.query({ query: GET_POPULAR_INGREDIENTS });
            context.commit('addIngredients', response.data.popularIngredients);
        },
        selectIngredients(context, ingredient) {
            context.commit('addToSelectedIngredients', ingredient);
        }
    }
}

export default ingredientsStorage;
