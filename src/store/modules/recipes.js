import gql from 'graphql-tag';

const GET_TAGS = gql`query Tag {
                        findTags(take: 25) {
                            id,
                            name, 
                            imagePath
                        }
                    }`;

const tagsStorage = {
    namespaced: true,
    state: {
        isAuthenticated: false,
        authenticationToken: null,
        recipes: []
    },
    getters: {
        tags: state => {
            return state.recipes;
        }
    },
    mutations: {
        addToLikedTags(state, tag) {
            // push liked tag to likedTags array
        }
    },
    actions: {
        async retrieveRecipes(context, apolloClient) {
            const response  = await apolloClient.query({ query: GET_TAGS });
            context.commit('addTags', response.data.findTags);
        }
    }
}

export default tagsStorage;
