<template>
  <div class="w-full">
      <div style="overflow: scroll;margin-bottom: 100px;">
        <RecipeComponent
            v-for="recipe in recipes"
            v-bind:key="recipe.id"
            v-bind:recipe="recipe"
        ></RecipeComponent>
      </div>
  </div>
</template>

<script>
import RecipeComponent from '../components/listing/RecipeComponent.vue'
export default {
  name: "Favourites",
  components: {
    RecipeComponent
  },
  data: function () {
    return {
      recipes: [
        { id: 1, title: 'Rezept #1', imageUrl: 'https://cdn.theforkmanager.com/static/styles/blog_article_header_image/public/wp-blog/eltenedor-foodporn-marketing-restaurantes.png?itok=frBLipGv', isFavorite: true, recipeUrl: '' },
        { id: 2, title: 'Rezept #2', imageUrl: 'https://cdn.theforkmanager.com/static/styles/blog_article_header_image/public/wp-blog/eltenedor-foodporn-marketing-restaurantes.png?itok=frBLipGv', isFavorite: false,recipeUrl: ''  },
        { id: 3, title: 'Rezept #3', imageUrl: 'https://cdn.theforkmanager.com/static/styles/blog_article_header_image/public/wp-blog/eltenedor-foodporn-marketing-restaurantes.png?itok=frBLipGv', isFavorite: false, recipeUrl: '' },
        { id: 4, title: 'Rezept #4', imageUrl: 'https://cdn.theforkmanager.com/static/styles/blog_article_header_image/public/wp-blog/eltenedor-foodporn-marketing-restaurantes.png?itok=frBLipGv', isFavorite: false, recipeUrl: '' },
      ]
    }
  }
}
</script>

<style scoped>

</style>