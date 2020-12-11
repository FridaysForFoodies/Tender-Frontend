<template>
  <div class="absolute flex flex-col left-0 right-0 top-0 h-full mx-6 transform rounded-lg bg-gray-100">

    <div class="flex-1">
      Tag 1
    </div>

    <!-- Buttons -->
    <div class="flex flex-row justify-around w-full h-16 text-center mb-6">
      <button class="w-16 h-auto">
        <img class="transform rotate-180" alt="Dislike" src="../../assets/images/dislike.png">
      </button>

      <button class="w-16 h-auto">
        <img alt="Like" src="../../assets/images/like.png">
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardComponent"
}
</script>

<style scoped>

</style>