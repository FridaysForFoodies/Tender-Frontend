const settingsStorage = {
    namespaced: true,
    state: {
        settingsVegetarian: false,
        settingsVegan: false,
        settingsGluten: false,
        settingsDairy: false
    },
    getters: {},
    mutations: {
        updateSettings(state, newValuesArray) {
            state.settingsVegetarian = newValuesArray[0]
            state.settingsVegan = newValuesArray[1]
            state.settingsGluten = newValuesArray[2]
            state.settingsDairy = newValuesArray[3]
        }
    },
    actions: {}
}

export default settingsStorage;
