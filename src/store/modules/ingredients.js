import gql from 'graphql-tag';

const GET_POPULAR_INGREDIENTS = gql`query PopupularIngredients {
                                    popularIngredients(count: 5){
                                        ID,
                                        name
                                    }
                                }`;       

const GET_SUGGESTED_INGREDIENTS = gql`query IngredientSuggestions ($query: String!) {
    ingredientSuggestions(count: 5, query: $query) {
      ID
      name
    }
  }`;

const ingredientsStorage = {
    namespaced: true,
    state: {
        popularIngredients: [],
        suggestedIngredients: [],
        selectedIngredients: []
    },
    getters: {
        popularIngredients: state => {
            return state.popularIngredients;
        },
        suggestedIngredients: state  => {
            return state.suggestedIngredients;
        },
        selectedIngredients: state  => {
            return state.selectedIngredients;
        }
    },
    mutations: {
        addPopularIngredients(state, ingredients) {
            state.popularIngredients = ingredients;
        },
        addSuggestedIngredients(state, ingredients){
            state.suggestedIngredients = ingredients;
        },
        addToSelectedIngredients(state, ingredient) {
            state.selectedIngredients.push(ingredient);
        },
        removeFromSelectedIngredients(state, ingredient) {
            state.selectedIngredients.pop(ingredient);
        },
    },
    actions: {
        async retrievePopularIngredients(context, apolloClient) {
            const response  = await apolloClient.query({ query: GET_POPULAR_INGREDIENTS });
            context.commit('addPopularIngredients', response.data.popularIngredients);
        },
        async retrieveSuggestedIngredients(context, { apolloClient, searchTerm}) {
            const response  = await apolloClient.query({ 
                query: GET_SUGGESTED_INGREDIENTS,
                variables: { query: searchTerm }
             });
            context.commit('addSuggestedIngredients', response.data.ingredientSuggestions);
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
