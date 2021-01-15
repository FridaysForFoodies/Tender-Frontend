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

const GET_RECIPES = gql`query searchForRecipes ($ingredients: [String!]!, $tags: [String!]!) {
        searchForRecipes(take: 5, searchOptions: {ingredients: $ingredients, tags: $tags}) {
            ID,
            name,
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
      variables() {
        return {
          ingredients: this.selectedIngredients,
          tags: this.likedTags
        }
      }

    },
  },
  computed: {
    likedTags() {
      return this.$store.getters['tagsStorage/likedTags'].length == 0
          ? ["Vegan"]
          : this.$store.getters['tagsStorage/likedTags'];
    },
    selectedIngredients() {
      return this.$store.getters['ingredientsStorage/selectedIngredients'].length == 0
          ? ["Nudeln"]
          : this.$store.getters['tagsStorage/likedTags'];
    }
  }
}
</script>

<style scoped>

</style>