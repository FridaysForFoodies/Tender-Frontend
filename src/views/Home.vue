<template>
  <div class="h-full p-4">
    <h1 class="text-2xl font-bold mt-8">Which ingredients<br/> do you have?</h1> 
    <div class="w-full border-solid border-black border-2 rounded-md p-3 mt-4 flex justify-between items-center"
      @click="focusIngredientInput">

      <ApolloQuery
        :query="require('../graphql/IngredientSuggestions.gql')"
        :variables="{count: suggestionIngredientCount, query: searchTerm }"
        class="flex-1">
        <template slot-scope="{ result: { loading, error, data } }">
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

    <div class="mt-4">
      <div v-for="selectedIngredient in selectedIngredients" :key="selectedIngredient.ID" 
        @click="removeFromSelectedIngredients(selectedIngredient)"
        class="border-solid border-gray-500 bg-primary border-2 rounded-full px-4 inline-flex mr-2 mb-2 text-gray-500">
        {{ selectedIngredient.name }}
      </div>
    </div>

    <p class="font-bold	mt-4">Your favourite search terms</p>

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
      tag: '',
      tags: [],
      ingredients: [
        { text: "Pasta" },
        { text: "Tomatoes" },
        { text: "Basil" },
        { text: "White wine" },
        { text: "Capsicum" }
      ],
      validation: [{
        classes: 'avoid-item',
        // enthält ingredients den tag nicht? -> dann disable add
        rule: tag => !this.ingredients.find(ingredient => ingredient.text === tag.text),
        disableAdd: true
      }],
    }
  },
  methods:{
    addTagFromList(ingredient) {
      this.tags.push({ 
        text: ingredient.text,
        tiClasses:["ti-valid"]
      });
    }
  },
  computed: {
    proposedIngredients() {
      return this.ingredients.filter(i => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
      });
    },

    unselectedIngredients() {
      return this.ingredients.filter(ingredient => {
        // enthält tags den ingredient?
        return !this.tags.find(tag => tag.text === ingredient.text)
      });
    },
  }
}
</script>

<style lang="css">

.vue-tags-input .ti-input {
    border: none;
}

.vue-tags-input .ti-tag {
  background-color: transparent;
  font-size: 1em;
  color: #9CA3AF;
  border: #9CA3AF solid 2px;
  border-radius: 1em;
  padding: 0.2em 0.8em;
  margin: 0.2rem 0.3rem 0.2rem 0; 
}
  
</style>