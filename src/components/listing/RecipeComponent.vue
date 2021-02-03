<template>
  <div class="recipe-container shadow-lg mx-3 my-6 rounded-xl">
    <div class="recipe-image rounded-t-xl" style="height:360px; background-size: cover" :style="{ backgroundImage: 'url(http://s3-eu-west-1.amazonaws.com/hf-recipes' + localRecipe.imagePath + ')' }"></div>

    <div class="recipe-info text-left p-5 flex flex-column">
      <div class="recipe-info-container w-full flex flex-row items-center">

        <div class="recipe-title h-auto flex-1">
          <h2 class="text-2xl font-bold leading-6">
            <router-link :to=" { name: 'Recipe', params: { recipeId: localRecipe.ID }}" active-class="text-yellow-400">
              {{ recipe.name }}
            </router-link>
          </h2>

          <small>
            {{missingIngredients}} ...
          </small>
        </div>

        <font-awesome-icon icon="heart" v-on:click="toggleFavourite" :class="isFavourite ? 'text-yellow-400' : ''" class="recipe-favorite text-4xl item-center align-center"/>


      </div>

    </div>
  </div>
</template>

<script>

import gql from "graphql-tag";

const ADD_FAVOURITE_MUTATION = gql`mutation addRecipeToFavourites($recipeId: String!){
                                      addRecipeToFavourites(recipeId: $recipeId) {
                                        ID
                                      }
                                    }`;
export default {
  name: "recipeComponent",
  props: ['recipe'],
  data() {
    return {
      isFavourite: false,
    }
  },
  methods: {
    toggleFavourite() {
      //this.localRecipe.isFavourite = !this.localRecipe.isFavourite;
      if (!this.localRecipe.isFavourite) {
        try {
          this.$apollo.mutate({
            mutation: ADD_FAVOURITE_MUTATION,
            context: { headers: { 'Authorization': localStorage.getItem("tender-user-token") } },
            variables: { recipeId: this.localRecipe.ID }
          });
          this.isFavourite = true
          this.localRecipe.isFavourite = true
        } catch(e) {
          console.log(e)
        }

      } else {
        this.isFavourite = false;
        this.localRecipe.isFavourite = false;
      }
      //else: remove recipe from favourites
    }
  },
  computed: {
    localRecipe() {
      // `this` points to the vm instance
      return this.recipe;
    },

    missingIngredients(){
      let missingIngredientsNames = [];
      this.recipe.missingIngredients.slice(0, 2).forEach(missingIngredient => {
        missingIngredientsNames.push(missingIngredient.name);
      });
      return missingIngredientsNames.join(", ");
    }
  }
}
</script>

<style scoped>
  .recipe-info {
    height: 90px;
  }
</style>