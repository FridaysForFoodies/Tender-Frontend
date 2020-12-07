<template>
    <div class="h-full p-4">
      <h1 class="text-2xl font-bold mt-24">Which ingredients<br/> do you have?</h1> 
      <div class="w-full border-solid border-black border-2 rounded-md p-4 mt-4 flex justify-between">
        
        <div flex-1></div>
        
        <router-link :to=" { name: 'FoodTender'}">  
          <font-awesome-icon icon="play" class="text-4xl"/>
        </router-link>
      </div>

      <p class="font-bold mt-4">Common search terms</p>

      <div v-for="ingredient in ingredients" :key="ingredient"
        class="border-solid border-gray-400 border-2 rounded-full px-4 inline-flex mr-2 mt-2">
        <p class="text-gray-400">{{ ingredient }}</p>
      </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      ingredients: ["Pasta", "Tomatoes", "Basil", "White wine", "Capsicum"],
    }
  },
}
</script>

<style scoped>

</style>