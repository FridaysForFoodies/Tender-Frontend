<template>
  <div class="recipe-container shadow-lg mx-3 my-5 rounded-xl">
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
            es fehlt dies das und das
          </small>
        </div>

        <font-awesome-icon icon="heart" v-on:click="toggle" :class="localRecipe.isFavourite ? 'text-yellow-400' : ''" class="recipe-favorite text-4xl item-center align-center"/>


      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "recipeComponent",
  props: ['recipe'],
  methods: {
    toggle() {
      this.localRecipe.isFavourite = !this.localRecipe.isFavourite;
    }
  },
  computed: {
    localRecipe: function () {
      // `this` points to the vm instance
      return this.recipe;
    }
  }
}
</script>

<style scoped>
  .recipe-info {
    height: 90px;
  }
</style>