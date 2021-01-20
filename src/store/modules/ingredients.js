import gql from 'graphql-tag';

const GET_POPULAR_INGREDIENTS = gql`query PopularIngredients {
                                    popularIngredients(count: 5){
                                        ID,
                                        name
                                    }
                                }`; 

const GET_PERSONAL_INGREDIENTS = gql`query PersonalIngredients {
    personalCommonIngredients(count: 5){
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
    state: {
        popularIngredients: [],        
        personalIngredients: [],
        suggestedIngredients: [],
        selectedIngredients: []
    },
    getters: {
        popularIngredients: state => {
            return state.popularIngredients;
        },
        personalIngredients: state => {
            return state.personalIngredients;
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
        addPersonalIngredients(state, ingredients) {
            state.personalIngredients = ingredients;
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
        async retrievePersonalIngredients(context, apolloClient) {
            const response  = await apolloClient.query({ query: GET_PERSONAL_INGREDIENTS });
            context.commit('addPersonalIngredients', response.data.personalIngredients);
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
