<template>
  <div class="recipe-container shadow-lg mx-3 my-5 rounded-md">
    <div class="recipe-image rounded-t-md" style="height:380px; background-size: cover" :style="{ backgroundImage: 'url(' + recipe.imageUrl + ')' }"></div>

    <div class="recipe-info text-left p-5 flex flex-column items-center">
      <div class="recipe-info-container w-full flex flex-column">

        <div class="recipe-title h-auto">
          <h2 class="text-2xl font-bold leading-6">
            {{ recipe.title }}
          </h2>

          <small>
            es fehlt dies das und das
          </small>
        </div>

        <div class="recipe-favorite w-1/8">
          <img alt="Settings" src="../../assets/images/heart.png">
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "recipeComponent",
  props: ['recipe'],
}
</script>

<style scoped>
  .recipe-info {
    height: 90px;
  }
</style>