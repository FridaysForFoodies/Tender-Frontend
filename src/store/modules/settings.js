import gql from "graphql-tag";

const settingsStorage = {
    namespaced: true,
    state: {
        settingsVegetarian: false,
        settingsVegan: false,
        settingsGlutenfree: false,
        settingsDairyfree: false,
        cookingTime: 30
    },
    getters: {},
    mutations: {
        updateSettings(state, newValuesObj) {
            this.settingsVegetarian = newValuesObj.vegetarian
            this.settingsVegan = newValuesObj.vegan
            this.settingsGlutenfree = newValuesObj.glutenfree
            this.settingsDairyfree = newValuesObj.dairyfree
            this.cookingTime = newValuesObj.cookingTime
        }
    },
    actions: {
        async retrieveSettings(context, apolloClient) {
            console.log("settingsStore.start")
            console.log("settingsStore.auth? ", apolloClient.state)

            try {
                const response = await apolloClient.query({
                    query: gql`
                    query {
                      recipePreferencesForUser {
                        vegan
                        vegetarian
                        gluten
                        dairy
                        cookingTime
                      }
                    }
                  `
                });

                console.log('settingsStore.received: ', response)
            } catch (error) {
                console.log('settingsStore.received error: ', error)
            }
            console.log('settingsStore.end')
            // context.commit('addTags', response.data.findTags);
        },
        async retrieveUser(context, apolloClient) {
            console.log("settingsStore.retrieveUser")

            try {
                const response = await apolloClient.query({
                    query: gql`
                    query {
                        generateUser {
                            uuid
                          }
                    }
                  `
                });

                console.log("settingsStore.retrieveUser.received: ", response.data.generateUser.uuid)
            } catch (error) {
                console.log('settingsStore.retrieveUser error: ', error)
            }
            console.log('settingsStore.retrieveUser.end')
            // context.commit('addTags', response.data.findTags);
        },
    }
}

export default settingsStorage;
