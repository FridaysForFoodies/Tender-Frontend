<template>
  <div class="w-full">
    <div style="overflow: scroll;margin-bottom: 100px;">

      <RecipeComponent
          v-for="recipe in searchForRecipes"
          v-bind:key="recipe.id"
          v-bind:recipe="recipe"
      ></RecipeComponent>

    </div>
  </div>
</template>

<script>
import RecipeComponent from '../components/listing/RecipeComponent.vue'
import gql from 'graphql-tag';

const GET_RECIPES = gql`query recipes {
        searchForRecipes(take: 25, searchOptions: {ingredients: ["Nudeln"], tags: ["Vegan"]}) {
            ID,
            name,
            ingredients {ID, name},
            imagePath,
            duration,
            missingIngredients {ID, name}
        }
      }`;
export default {
  name: "Favourites",
  components: {
    RecipeComponent
  },
  data() {
    return {
      searchForRecipes: []
    }
  },
  apollo: {
    // Query with parameters
    searchForRecipes: {
      // gql query
      query: GET_RECIPES,
    },
  },
  methods: {

  },
}
</script>

<style scoped>

</style>