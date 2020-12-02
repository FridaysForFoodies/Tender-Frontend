<template>
    <div>
      <h1 >Food Tender</h1> 

    <button @click="goBack" class="text-purple-600" >
      &larr; Back to Home Search 
    </button> 
  </div>

</template>

<script>
export default {
  name: "FoodTender",
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>