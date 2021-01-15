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
                console.log('settingsStore.received error')
            }
            // context.commit('addTags', response.data.findTags);
        },
    }
}

export default settingsStorage;
