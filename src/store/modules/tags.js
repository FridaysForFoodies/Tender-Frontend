import gql from 'graphql-tag';

const GET_TAGS = gql`query Tag {
                        findTags(take: 40) {
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
        addToLikedTags(state) {
            // push liked tag to likedTags array
            const item = state.tags.shift();
            state.likedTags.push(item);
        },
        addToDislikedTags(state) {
            // push liked tag to likedTags array
            const item = state.tags.shift();
            state.dislikedTags.push(item);
        },
        addTags(state, tags) {
            function shuffle(tenderTags) {
                const x = tenderTags.length - 1;
                for(let i = x; i > 0; i--){
                  const j = Math.floor(Math.random() * i)
                  const temp = tenderTags[i]
                  tenderTags[i] = tenderTags[j]
                  tenderTags[j] = temp
                }
                return tenderTags;
              }
            state.tags = shuffle(tags);
        },
        reset(state) {
            state.tags = [];
            state.dislikedTags = [];
            state.likedTags = [];
        }
    },
    actions: {
        async retrieveTags(context, apolloClient) {
            try {
                const response  = await apolloClient.query({ query: GET_TAGS });
                context.commit('addTags', response.data.findTags);
            }
            catch(error) {
                alert(error);
            }
        }
    }
}

export default tagsStorage;
