// import gql from "graphql-tag";
import GET_PREFERENCES from "../../graphql/GetPreferences.gql"
import POST_PREFERENCES from "../../graphql/PostPreferences.gql"
import GET_USER_ID from "../../graphql/User.gql"

const settingsStorage = {
    namespaced: true,
    state: {
        settingsVegetarian: false,
        settingsVegan: false,
        settingsGlutenfree: false,
        settingsDairyfree: false,
        cookingTime: 30
    },
    getters: {
        settingsVegetarian: state => {
            return state.settingsVegetarian
        }
    },
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

            let response
            try {
                response = await apolloClient.query({
                    query: GET_PREFERENCES
                });

                console.log('settingsStore.received: ', response)
            } catch (error) {
                console.log('settingsStore.received error: ', error)
            }

            console.log('settingsStore.end')
            context.commit('updateSettings', response.data.recipePreferencesForUser);
        },

        async updateSettingsInDb(context, apolloClient) {
            console.log("updateSettingsInDb.start")
            console.log("{ \"authorization\": \"" + localStorage.getItem("tender-user-token") + "\" }")

            // const temp = {
            //     vegetarian: this.settingsVegetarian,
            //     vegan: this.vegan,
            //     glutenfree: this.glutenfree,
            //     dairyfree: this.dairyfree,
            //     cookingTime: this.cookingTime
            // }

            // const temp1 = this.settingsVegetarian
            // const temp2 = this.settingsVegan
            // const temp3 = this.settingsGlutenfree
            // const temp4 = this.settingsDairyfree
            // const temp5 = this.cookingTime

            try {
                apolloClient.mutate({
                    mutation: POST_PREFERENCES,
                    variables: {
                        preferencesInput: {
                            vegetarian: this.settingsVegetarian,
                            vegan: this.vegan,
                            glutenfree: this.glutenfree,
                            dairyfree: this.dairyfree,
                            cookingTime: this.cookingTime
                        }
                    }
                });

                console.log('updateSettingsInDb.mutated')
            } catch (error) {
                console.log('updateSettingsInDb.mutation error: ', error)
            }
        },

        // just for testing
        async retrieveUser(context, apolloClient) {
            console.log("settingsStore.retrieveUser")

            try {
                const response = await apolloClient.query({
                    query: GET_USER_ID
                });

                console.log("settingsStore.retrieveUser.received: ", response.data.generateUser.uuid)
            } catch (error) {
                console.log('settingsStore.retrieveUser error: ', error)
            }
        },
    }
}

export default settingsStorage;
