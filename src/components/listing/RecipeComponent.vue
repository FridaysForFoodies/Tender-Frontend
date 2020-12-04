<template>
  <div class="recipe-container shadow-lg mx-3 my-5 rounded-xl">
    <div class="recipe-image rounded-t-xl" style="height:360px; background-size: cover" :style="{ backgroundImage: 'url(' + recipe.imageUrl + ')' }"></div>

    <div class="recipe-info text-left p-5 flex flex-column items-center">
      <div class="recipe-info-container w-full flex flex-row">

        <div class="recipe-title h-auto flex-1">
          <h2 class="text-2xl font-bold leading-6">
            {{ recipe.title }}
          </h2>

          <small>
            es fehlt dies das und das
          </small>
        </div>

        <div class="recipe-favorite w-1/8 flex item-center align-center h-full">
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