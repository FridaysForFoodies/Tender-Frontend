import gql from "graphql-tag";

const GET_USER_UUID = gql`query User {
                                generateUser {
                                    uuid
                                }
                            }`;

const userStorage = {
    namespaced: true,
    state: {
        isAuthenticated: false,
        authenticationToken: localStorage.getItem("tender-user-token") || "",
    },
    mutations: {
        storeUserToken (state, uuid) {
            state.authenticationToken = uuid;
        },

        authenticateUser (state, status) {
            state.isAuthenticated = status;
        }
    },
    actions: {
        async authRequest(context, apolloClient) {
            try {
                console.log(apolloClient);
                
                if(localStorage.getItem("tender-user-token") == undefined) {

                    const data  = await apolloClient.query({ query: GET_USER_UUID});
                    const uuid = data.data.generateUser.uuid;

                    localStorage.setItem("tender-user-token", uuid)
                    context.commit('storeUserToken', localStorage.getItem("tender-user-token"));
                    context.commit('authenticateUser', true);
                }
            } catch (e) {
                console.log(e)
            }
        }
    },
    getters: {
        authenticationStatus: state => {
            return state.isAuthenticated;
        }
    }
}

export default userStorage;