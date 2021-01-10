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

    }
}

export default settingsStorage;
