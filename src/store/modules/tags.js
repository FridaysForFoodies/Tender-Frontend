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
        isAuthenticated: false,
        authenticationToken: null,
        tags: [],
        likedTags: [],
        dislikedTags: []
    },
    getters: {
        tags: state => {
            return state.tags;
        },
        likedTags: state => {
            return state.likedTags;
        },
        dislikedTags: state => {
            return state.dislikedTags;
        }
    },
    mutations: {
        addToLikedTags(state, tag) {
            // push liked tag to likedTags array
            state.likedTags.push(tag);
            console.log(state.likedTags);
        },
        addToDislikedTags(state, tag) {
            // push liked tag to likedTags array
            state.dislikedTags.push(tag);
            console.log(state.dislikedTags);
        },
        addTags(state, tags) {
            state.tags = tags
        }
    },
    actions: {
        async retrieveTags(context, apolloClient) {
            console.log(apolloClient);
            const response  = await apolloClient.query({ query: GET_TAGS });
            context.commit('addTags', response.data.findTags);
        },
        likeTag(context, tag) {
            context.commit('addToLikedTags', tag);
        },
        dislikeTag(context, tag) {
            context.commit('addToDislikedTags', tag);
        }
    }
}

export default tagsStorage;
