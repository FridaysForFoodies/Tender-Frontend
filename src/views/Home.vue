<template>
  <div class="h-full">
    <div class="h-full p-4">
      <h1 class="text-2xl font-bold mt-8">Which ingredients<br/> do you have?</h1> 
      <div class="w-full border-solid border-black border-2 rounded-md p-3 mt-4 flex justify-between items-center"
        @click="focusIngredientInput">

        <div class="flex-1">
            <input ref="ingredientInput" placeholder="Search here" v-model="searchTerm" class="w-full focus:outline-none">
              <div v-if="searchTerm!=''">
                <div class="p-4 border-2 rounded-md bg-white absolute">
                  <div ref="suggestedIngredient" v-for="suggestedIngredient in suggestedIngredients" :key="suggestedIngredient.ID"  
                    @click="handleSearchSuccess(suggestedIngredient)" v-show="isNotSelected(suggestedIngredient)"
                    class="border-solid border-gray-400 border-2 rounded-full px-4 inline-flex mr-2 mt-2 text-gray-400">
                    {{ suggestedIngredient.name }}
                  </div>
                </div>
            </div>
        </div>
        
        <router-link :to=" { name: 'FoodTender'}">  
          <font-awesome-icon icon="play" class="text-4xl ml-4"/>
        </router-link>
      </div>

      <div class="mt-4">
        <div ref="selectedIngredient" v-for="selectedIngredient in selectedIngredients" :key="selectedIngredient.ID" 
          @click="removeFromSelectedIngredients(selectedIngredient)"
          class="border-solid border-gray-500 bg-primary border-2 rounded-full px-4 inline-flex mr-2 mb-2 text-gray-500">
          {{ selectedIngredient.name }}
        </div>
      </div>

      <p class="font-bold	mt-4">Your most used search terms</p>
      <div class="flex-1">
        <div v-for="personalIngredient in personalIngredients" :key="personalIngredient.ID" 
          @click="addToSelectedIngredients(personalIngredient)" v-show="isNotSelected(personalIngredient)"
          class="border-solid border-gray-400 border-2 rounded-full px-4 inline-flex mr-2 mt-2 text-gray-400">
          {{ personalIngredient.name }}
        </div>
      </div>

      <p class="font-bold	mt-4">Common search terms</p>
      <div class="flex-1">
        <div ref="popularIngredient" v-for="popularIngredient in popularIngredients" :key="popularIngredient.ID" 
          @click="addToSelectedIngredients(popularIngredient)" v-show="isNotSelected(popularIngredient)"
          class="border-solid border-gray-400 border-2 rounded-full px-4 inline-flex mr-2 mt-2 text-gray-400">
          {{ popularIngredient.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Home",
  data() {
    return {
      searchTerm: ''    }
  },
  created: function() { 
    this.fetchData();
  },
  computed:{
    selectedIngredients(){
      return this.$store.getters['selectedIngredients'];
    },
    suggestedIngredients(){
      return this.$store.getters['suggestedIngredients'];
    },
    popularIngredients(){
      return this.$store.getters['popularIngredients'];
    },
    personalIngredients(){
      return[];
      //return this.$store.getters['personalIngredients'];
    }
  },
  methods:{
    fetchData() {
      this.$store.dispatch('retrievePopularIngredients', this.$apolloProvider.defaultClient);
      //this.$store.dispatch('retrievePersonalIngredients', this.$apolloProvider.defaultClient);
    },
    handleSearchSuccess(ingredient){
      this.addToSelectedIngredients(ingredient);
      this.searchTerm = '';
    },
    addToSelectedIngredients(ingredient){
      this.$store.dispatch('selectIngredients', ingredient );
    },
    removeFromSelectedIngredients(ingredient){
      this.$store.dispatch('deselectIngredients', ingredient );
    },
    isNotSelected(ingredient){
      return !(this.selectedIngredients.some(selectedIngredient => selectedIngredient.ID == ingredient.ID))
    },
    focusIngredientInput(){
      if(this.$refs.ingredientInput != undefined)
        this.$refs.ingredientInput.focus();
    },
  },
  watch: {
    searchTerm (term) {
      this.$store.dispatch('retrieveSuggestedIngredients', { 
        apolloClient: this.$apolloProvider.defaultClient, 
        searchTerm: term } 
      );
    },
    popularIngredients(ingredients) {
      if (ingredients.length > 0)
        this.$store.dispatch('splashscreenStorage/registerFirstApolloLoaded');
    }
  }
}
</script>