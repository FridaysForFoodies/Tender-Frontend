// import gql from "graphql-tag";
import recipePreferencesForUser from "../../graphql/GetPreferences.gql"
import setRecipePreferencesForUser from "../../graphql/PostPreferences.gql"
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
        getSettingsVegetarian: state => {
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
                    query: recipePreferencesForUser
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
            //     vegetarian: this.state.settingsVegetarian,
            //     vegan: this.settingsVegan,
            //     glutenfree: this.settingsGlutenfree,
            //     dairyfree: this.settingsDairyfree,
            //     cookingTime: this.cookingTime
            // }
            const temp = {
                vegetarian: true,
                vegan: false,
                glutenfree: false,
                lactosefree: false,
                cookingTime: 8
            }
            console.log("temp created: ", temp)
            console.log("test state: ", this.settingsVegan)

            // const temp1 = this.settingsVegetarian
            // const temp2 = this.settingsVegan
            // const temp3 = this.settingsGlutenfree
            // const temp4 = this.settingsDairyfree
            // const temp5 = this.cookingTime

            try {
                apolloClient.mutate({
                    mutation: setRecipePreferencesForUser,
                    variables: {
                        preferencesInput: temp
                        //     {
                        //     vegetarian: this.settingsVegetarian,
                        //     vegan: this.settingsVegan,
                        //     glutenfree: this.settingsGlutenfree,
                        //     lactosefree: this.settingsDairyfree,
                        //     cookingTime: this.cookingTime
                        // }
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
