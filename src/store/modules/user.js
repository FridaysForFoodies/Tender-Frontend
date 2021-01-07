import gql from "graphql-tag";

const GET_ALL_USERS_QUERY = gql`query User {
                                generateUser {
                                    uuid
                                }
                            }`;

const userStorage = {
    namespaced: true,
    state: {
        isAuthenticated: localStorage.getItem("tender-user-token") ? true : false,
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
                const data  = await apolloClient.query({ query: GET_ALL_USERS_QUERY})

                if(!localStorage.getItem("tender-user-token")) {
                    localStorage.setItem("tender-user-token", data.data.generateUser.uuid)
                    context.commit('storeUserToken', localStorage.getItem("tender-user-token"));
                    context.commit('authenticateUser', localStorage.getItem("tender-user-token") ? true : false);
                } else {
                    context.commit('authenticateUser', localStorage.getItem("tender-user-token") ? true : false);
                }
            } catch (e) {
                console.log(e)
            }
        }
    },
}

export default userStorage;