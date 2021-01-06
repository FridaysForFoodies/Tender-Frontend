const userStorage = {
    state: () =>({
        isAuthenticated: false,
        authenticationToken: localStorage.getItem("tender-user-token") || "",
    }),
    mutations: {},
    actions: {
        async authRequest(context) {

        }
    },
    getters: {},
}

export default {
    userStorage
}