// import gql from "graphql-tag";
import recipePreferencesForUser from "../../graphql/GetPreferences.gql"
import setRecipePreferencesForUser from "../../graphql/PostPreferences.gql"

const settingsStorage = {
    namespaced: true,
    state: {
        settingsVegetarian: false,
        settingsVegan: false,
        settingsGlutenfree: false,
        settingsLactoseFree: false,
        cookingTime: 30
    },
    getters: {
        getSettingsVegetarian: state => {
            return state.settingsVegetarian
        },
        getSettingsVegan: state => {
            return state.settingsVegan
        },
        getSettingsGluten: state => {
            return state.settingsGlutenfree
        },
        getSettingsLactose: state => {
            return state.settingsLactoseFree
        },
        getSettingsTime: state => {
            return state.cookingTime
        },
    },
    mutations: {
        updateSettings(state, newValuesObj) {
            console.log('updateSettings.obj: ', newValuesObj)
            state.settingsVegetarian = newValuesObj.vegetarian
            state.settingsVegan = newValuesObj.vegan
            state.settingsGlutenfree = newValuesObj.glutenfree
            state.settingsLactoseFree = newValuesObj.dairyfree
            console.log("time before update: ", state.cookingTime)
            if(newValuesObj.cookingTime < 15)
                state.cookingTime = 15
            else if(newValuesObj.cookingTime > 60)
                state.cookingTime = 60
            else
                state.cookingTime = newValuesObj.cookingTime
            console.log("time after update: ", state.cookingTime)
        }
    },
    actions: {
        async retrieveSettingsFromDB(context, apolloClient) {
            console.log("settingsStore.start")

            let response
            let settingsObj
            try {
                response = await apolloClient.query({
                    query: recipePreferencesForUser
                });

                settingsObj = response.data.recipePreferencesForUser
                console.log('settingsStore.received: ', settingsObj)
            } catch (error) {
                console.log('settingsStore.received error: ', error)
            }

            if (typeof settingsObj == "undefined") {
                settingsObj = {
                    vegetarian: context.getters.getSettingsVegetarian,
                    vegan: context.getters.getSettingsVegan,
                    glutenfree: context.getters.getSettingsGluten,
                    lactosefree: context.getters.getSettingsLactose,
                    cookingTime: context.getters.getSettingsTime
                }
            }

            console.log('settingsStore.end')
            context.commit('updateSettings', settingsObj)
        },

        async updateSettingsInDB({state}, apolloClient) {
            console.log("updateSettingsInDb.start")
            console.log("{ \"authorization\": \"" + localStorage.getItem("tender-user-token") + "\" }")

            const temp = {
                vegetarian: state.settingsVegetarian,
                vegan: state.settingsVegan,
                glutenfree: state.settingsGlutenfree,
                lactosefree: state.settingsLactoseFree,
                cookingTime: state.cookingTime
            }
            console.log("temp created: ", temp)

            try {
                await apolloClient.mutate({
                    mutation: setRecipePreferencesForUser,
                    variables: {
                        preferencesInput: temp
                    }
                });

                console.log('updateSettingsInDb.mutated')
            } catch (error) {
                console.log('updateSettingsInDb.mutation error: ', error)
            }
        },
    }
}

export default settingsStorage;
