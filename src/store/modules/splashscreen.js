const splashscreenStorage = {
    namespaced: true,
    state: {
        firstApolloLoaded: false 
    },
    getters: {
        firstApolloLoaded: state => {
            return state.firstApolloLoaded;
        }
    },
    mutations: {
        setFirstApolloLoaded(state) {
            state.firstApolloLoaded = true;
        }
    },
    actions:{
        registerFirstApolloLoaded(context) {
            context.commit('setFirstApolloLoaded');
        }
    }
}

export default splashscreenStorage;
