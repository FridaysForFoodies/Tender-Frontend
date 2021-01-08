<template>
  <div class="h-full p-4">
    <h1 class="text-2xl font-bold mt-24">Which ingredients<br/> do you have?</h1> 
    <div class="w-full border-solid border-black border-2 rounded-md p-3 mt-4 flex justify-between items-center"
      @click="focusIngredientInput">

      <ApolloQuery
        :query="require('../graphql/IngredientSuggestions.gql')"
        :variables="{count: suggestionIngredientCount, query: searchTerm }"
        class="flex-1">
        <template slot-scope="{ result: { loading, error, data } }">
          <div v-for="selectedIngredient in selectedIngredients" :key="selectedIngredient.ID" 
            @click="removeFromSelectedIngredients(selectedIngredient)"
            class="border-solid border-gray-400 border-2 rounded-full px-4 inline-flex mr-2 mb-2 text-gray-400">
            {{ selectedIngredient.name }}
          </div>
          <input ref="ingredientInput" v-model="searchTerm" class="w-full focus:outline-none">
          <div v-if="loading" class="loading apollo">Loading...</div>
          <div v-else-if="error" class="error apollo">An error occured</div>
          <div v-else-if="data">
            <div v-if="searchTerm!=''">
              <div class="p-4 border-2 rounded-md bg-white absolute">
                <div v-for="ingredientSuggestion in data.ingredientSuggestions" :key="ingredientSuggestion.ID"  
                  @click="handleSearchSuccess(ingredientSuggestion)" v-show="isNotSelected(ingredientSuggestion)"
                  class="result apollo border-solid border-gray-400 border-2 rounded-full px-4 inline-flex mr-2 mt-2 text-gray-400">
                  {{ ingredientSuggestion.name }}
                </div>
              </div>
            </div>
          </div>
          <div v-else class="no-result apollo">No result</div>
        </template>
      </ApolloQuery>
      
      <router-link :to=" { name: 'FoodTender'}">  
        <font-awesome-icon icon="play" class="text-4xl ml-4"/>
      </router-link>
    </div>

    <p class="font-bold	mt-4">Common search terms</p>

    <ApolloQuery
      :query="require('../graphql/PopularIngredients.gql')"
      :variables="{count: popularIngredientCount }"
      class="flex-1">
      <template slot-scope="{ result: { loading, error, data } }">
        <div v-if="loading" class="loading apollo">Loading...</div>
        <div v-else-if="error" class="error apollo">An error occured</div>
        <div v-else-if="data" v-for="popularIngredient in data.popularIngredients" :key="popularIngredient.ID" 
          @click="addToSelectedIngredients(popularIngredient)" v-show="isNotSelected(popularIngredient)"
          class="result apollo border-solid border-gray-400 border-2 rounded-full px-4 inline-flex mr-2 mt-2 text-gray-400">
          {{ popularIngredient.name }}
        </div>
        <div v-else class="no-result apollo">No result</div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      suggestionIngredientCount: 5,      
      popularIngredientCount: 8,
      searchTerm: '',
      selectedIngredients: [],
    }
  },
  methods:{
    handleSearchSuccess(ingredient){
      this.addToSelectedIngredients(ingredient);
      this.searchTerm = '';
    },
    addToSelectedIngredients(ingredient){
      this.selectedIngredients.push(ingredient);
    },
    removeFromSelectedIngredients(ingredient){
      this.selectedIngredients.pop(ingredient)
    },
    isNotSelected(ingredient){
      return !(this.selectedIngredients.some(selectedIngredient => selectedIngredient.ID == ingredient.ID))
    },
    focusIngredientInput(){
      this.$refs.ingredientInput.focus();
    }
  },
}
</script>