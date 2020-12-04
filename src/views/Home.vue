<template>
    <div>
      <h1> Home </h1> 
      
      <router-link :to=" { name: 'FoodTender'}" class="text-purple-600" > 
        Go To Food Tinder Screen   &rarr;
      </router-link>
  </div>
</template>

<script>
export default {
  name: "Home"
}
</script>

<style scoped>

</style>